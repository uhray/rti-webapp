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
  export let order;
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
</div>
