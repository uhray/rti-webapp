<script>
  import Table from '../../components/table/Table.svelte';
  import { data } from './data';

  import Header from './Header.svelte';
</script>

<svelte:head>
  <title>Orders</title>
</svelte:head>

<Header />

<div class="Orders">
  <Table {data} height={75} />
</div>

<style lang="scss">
  .Orders {
    padding: 2em;
  }
</style>
