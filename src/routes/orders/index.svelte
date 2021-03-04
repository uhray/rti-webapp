<script>
  import Table from '../../components/table/Table.svelte';
  import { data } from './data';
</script>

<style lang="scss">

</style>

<svelte:head>
  <title>Orders</title>
</svelte:head>

<div class="Orders">
  <br />
  <br />
  <br />
  <Table {data} height={80} />
</div>
