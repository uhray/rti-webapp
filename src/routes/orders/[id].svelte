<script context="module">
  import { data } from './data.js';
  import _ from 'lodash';

  export async function preload(page, session) {
    const { id } = page.params;
    const order = _.find(data.data, { id: id });

    return { order };
  }
</script>

<script>
  import OrderHeader from './OrderHeader.svelte';
  import TripDetails from '../../components/tripdetails/TripDetails.svelte';
  import OrderStatus from '../../components/orderstatus/OrderStatus.svelte';
  import Table from '../../components/table/Table.svelte';
  export let order;

  const headers = [
    { header: 'filename', text: 'File Name' },
    { header: 'size', text: 'Size' },
    { header: 'location', text: 'Location' },
    { header: 'uploaded_at', text: 'Time Uploaded' },
    { header: 'view', text: 'View' },
    { header: 'actions', text: 'Actions' },
  ];
</script>

<style lang="scss">
  .Order {
    padding: 2em;
  }
</style>

<svelte:head>
  <title>Order #{order.id}</title>
</svelte:head>

<OrderHeader {order} />

<div class="Order">
  <TripDetails {order} />

  {#if order.documents}
    <h3>Uploaded Documents</h3>

    <Table {headers} data={order.documents} height={30} />
  {/if}

  <div style="margin-top: 18px;" />

  <OrderStatus orderStatusData={order.statusDetails} />
</div>
