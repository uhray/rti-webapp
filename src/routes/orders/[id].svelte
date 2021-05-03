<script context="module">
  import _ from 'lodash';

  export async function preload(page, session) {
    const { id } = page.params;

    return { id };
  }
</script>

<script>
  import { onMount } from 'svelte';
  import OrderHeader from './OrderHeader.svelte';
  import TripDetails from '../../components/tripdetails/TripDetails.svelte';
  import OrderStatus from '../../components/orderstatus/OrderStatus.svelte';
  import Table from '../../components/table/Table.svelte';
  import { getOrder } from '../../tools/crudApi.ts';

  export let id;
  let order = undefined;
  const headers = [
    { header: 'filename', text: 'File Name' },
    { header: 'size', text: 'Size' },
    { header: 'location', text: 'Location' },
    { header: 'uploaded_at', text: 'Time Uploaded' },
    { header: 'view', text: 'View' },
    { header: 'actions', text: 'Actions' },
  ];

  onMount(async () => {
    order = await getOrder(id);
  });
</script>

<style lang="scss">
  .Order {
    padding: 2em;
    h3 {
      line-height: 1.25;
      margin-bottom: 0.5em;
    }
  }
</style>

<svelte:head>
  <title>Order #{order && order.orderId ? order.orderId : ''}</title>
</svelte:head>

{#if order}
  <OrderHeader {order} />

  <div class="Order">
    <TripDetails {order} />

    <!-- #TODO MAP DOCUMENTS BASED ON UPLOAD -->
    {#if order.documents && order.documents.length > 0}
      <h3>Uploaded Documents</h3>

      <Table {headers} data={order.documents} height={30} />
    {/if}

    <div style="margin-top: 18px;" />

    <OrderStatus {order} />
  </div>
{:else}
  <div class="Loader">
    <div uk-spinner="ratio: 2" />
  </div>
{/if}
