<script>
  import Table from '../../components/table/Table.svelte';
  import Button from '../../components/button/Button.svelte';
  import SearchBar from '../../components/searchbar/SearchBar.svelte';

  import Header from './Header.svelte';

  import { ordersStore } from '../../store';

  let orders = $ordersStore.orders;
  let ordersMapped = orders.map(o => {
    return {
      orderId: o.orderId,
      createdAt: o.createdAt,
      status: o.status,
      assignedTruck: o.assignedTruck,
      startPoint: `${o.stops[0].address.city}, ${o.stops[0].address.state} ${o.stops[0].address.zipcode}`,
      endPoint: `${o.stops[o.stops.length - 1].address.city}, ${o.stops[o.stops.length - 1].address.state} ${o.stops[o.stops.length - 1].address.zipcode}`,
    };
  });

  export const headers = [
    { header: 'order', text: 'Order' },
    { header: 'status', text: 'Status' },
    { header: 'assignedTruck', text: 'Vehicle' },
    { header: 'startPoint', text: 'Start Point' },
    { header: 'endPoint', text: 'End Point' },
    { header: 'view', text: 'View' },
    { header: 'actions', text: 'Actions' },
  ];

  console.log(ordersMapped);
</script>

<style lang="scss">
  .Orders {
    padding: 2em;
  }
</style>

<svelte:head>
  <title>Orders</title>
</svelte:head>

<Header />

<div class="Orders">
  <Table {headers} data={ordersMapped} />
</div>
