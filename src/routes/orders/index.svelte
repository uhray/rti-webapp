<script>
  import Table from '../../components/table/Table.svelte';
  import Button from '../../components/button/Button.svelte';
  import SearchBar from '../../components/searchbar/SearchBar.svelte';
  import OverlayDelete from '../../components/OverlayDelete/OverlayDelete.svelte';
  import { deleteOrder } from '../../tools/crudApi.ts';
  import _ from 'lodash';

  import Header from './Header.svelte';

  import { ordersStore } from '../../store';

  let orders;
  let ordersMapped;
  let ordersToDelete = [];
  let displayOverlayDelete = false;
  let isMultiple = false;

  $: {
    orders = $ordersStore.orders;
    ordersMapped = _.sortBy(
      orders.map(o => {
        return {
          id: o._id,
          type: 'orders',
          orderId: o.orderId,
          createdAt: o.createdAt,
          status: o.status,
          assignedTruck: o.assignedTruck,
          startPoint: `${o.stops[0].address.city}, ${o.stops[0].address.state} ${o.stops[0].address.zipcode}`,
          endPoint: `${o.stops[o.stops.length - 1].address.city}, ${
            o.stops[o.stops.length - 1].address.state
          } ${o.stops[o.stops.length - 1].address.zipcode}`,
        };
      }),
      'createdAt'
    ).reverse();
  }

  export const headers = [
    { header: 'order', text: 'Order' },
    { header: 'status', text: 'Status' },
    { header: 'assignedTruck', text: 'Vehicle' },
    { header: 'startPoint', text: 'Start Point' },
    { header: 'endPoint', text: 'End Point' },
    { header: 'view', text: 'View' },
    { header: 'actions', text: 'Actions' },
  ];

  function handleSort(v) {
    if (v === 'new') {
      ordersMapped = _.sortBy(ordersMapped, 'createdAt').reverse();
    } else if (v === 'old') {
      console.log(_.sortBy(orders, 'createdAt').reverse());
      ordersMapped = _.sortBy(ordersMapped, 'createdAt');
    }
  }

  async function handleDelete(orderId) {
    ordersToDelete.push(orderId);
    displayOverlayDelete = true;
    isMultiple = false;
  }

  function handleDeleteSelected() {
    displayOverlayDelete = true;
    isMultiple = true;
  }

  function handleCheck(orderId) {
    if (ordersToDelete.includes(orderId)) {
      ordersToDelete = ordersToDelete.filter(o => o !== orderId);
    } else {
      ordersToDelete.push(orderId);
    }
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
    ordersStore.setOrders(ordersAfterDelete);

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
