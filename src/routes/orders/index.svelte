<script>
  import Table from '../../components/table/Table.svelte';
  import { data } from './data';
  import Button from '../../components/button/Button.svelte';
  import SearchBar from '../../components/searchbar/SearchBar.svelte';

  import Header from './Header.svelte';
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
  <Table {data} height={75} />
</div>
