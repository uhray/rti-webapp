<script>
  import { onMount } from 'svelte';
  import Table from '../../components/table/Table.svelte';
  import OverlayDelete from '../../components/OverlayDelete/OverlayDelete.svelte';
  import { deleteOrder } from '../../tools/crudApi.ts';
  import _ from 'lodash';

  import Header from './Header.svelte';

  import { notificationsStore, ordersStore, postsStore } from '../../store';
  import { clearNotifications } from '../../tools/crudApi';

  let orders;
  let posts;
  let ordersMapped;
  let ordersToDelete = [];
  let postOrderIdsToDelete = [];
  let displayOverlayDelete = false;
  let isMultiple = false;

  let headerHeight = 0;

  $: {
    orders = $ordersStore.orders;
    ordersMapped = _.sortBy(
      _.map(orders, o => {
        return {
          id: o._id,
          type: 'orders',
          orderId: o.orderId,
          createdAt: o.createdAt,
          status: o.status,
          assignedTruckId: o.assignedTruckId,
          startPoint: `${o.stops[0].address.city}, ${o.stops[0].address.state} ${o.stops[0].address.zipcode}`,
          endPoint: `${o.stops[o.stops.length - 1].address.city}, ${
            o.stops[o.stops.length - 1].address.state
          } ${o.stops[o.stops.length - 1].address.zipcode}`,
        };
      }),
      'createdAt'
    ).reverse();

    posts = $postsStore.posts;
  }

  export const headers = [
    { header: 'order', text: 'Order' },
    { header: 'status', text: 'Status' },
    { header: 'assignedTruckId', text: 'Vehicle' },
    { header: 'startPoint', text: 'Start Point' },
    { header: 'endPoint', text: 'End Point' },
    { header: 'view', text: 'View' },
    { header: 'actions', text: 'Actions', size: 'auto' },
  ];

  onMount(async () => {
    if (document) {
      headerHeight = document.getElementById('Header').offsetHeight;
      headerHeight = headerHeight + 75;
    }

    if ($notificationsStore.counts.orders !== 0) {
      const counts = clearNotifications('order');
      notificationsStore.setCounts(counts);
    }
  });

  function handleSort(v) {
    if (v === 'new') {
      ordersMapped = _.sortBy(ordersMapped, 'createdAt').reverse();
    } else if (v === 'old') {
      ordersMapped = _.sortBy(ordersMapped, 'createdAt');
    }
  }

  async function handleDelete(id, orderId) {
    ordersToDelete.push(id);
    postOrderIdsToDelete.push(orderId);
    displayOverlayDelete = true;
    isMultiple = false;
  }

  function handleDeleteSelected() {
    displayOverlayDelete = true;
    isMultiple = true;
  }

  function handleCheck(id, orderId) {
    if (ordersToDelete.includes(id)) {
      ordersToDelete = ordersToDelete.filter(o => o !== id);
      postOrderIdsToDelete = postOrderIdsToDelete.filter(p => p !== orderId);
    } else {
      ordersToDelete.push(id);
      postOrderIdsToDelete.push(orderId);
    }
    postOrderIdsToDelete = postOrderIdsToDelete;
    ordersToDelete = ordersToDelete;
  }

  function clearOverlayData() {
    ordersToDelete = [];
    displayOverlayDelete = false;
    let checkboxes = document.getElementsByClassName('uk-checkbox');
    Array.from(checkboxes).forEach(c => (c.checked = false));
  }

  function deleteOrders() {
    ordersToDelete.forEach(async o => {
      await deleteOrder(o);
    });

    const ordersAfterDelete = orders.filter(
      o => !ordersToDelete.includes(o._id)
    );
    const postsAfterDelete = posts.filter(
      p => !postOrderIdsToDelete.includes(p.orderId)
    );

    ordersStore.setOrders(ordersAfterDelete);
    postsStore.setPosts(postsAfterDelete);

    clearOverlayData();
  }
</script>

<svelte:head>
  <title>Orders</title>
</svelte:head>
<Header {handleSort} />

<div class="Orders">
  <Table
    {headers}
    data={ordersMapped}
    {handleDelete}
    {handleDeleteSelected}
    {handleCheck}
    selected={ordersToDelete}
    height={'100vh'}
    {headerHeight}
  />
</div>

{#if displayOverlayDelete}
  <OverlayDelete
    {clearOverlayData}
    send={deleteOrders}
    type={'order'}
    {isMultiple}
  />
{/if}

<style lang="scss">
  .Orders {
    padding: 2em;
  }
</style>
