<script>
  import Table from '../../components/table/Table.svelte';
  import { headers, data } from './data';
  import Button from '../../components/button/Button.svelte';
  import SearchBar from '../../components/searchbar/SearchBar.svelte';

  import Header from './Header.svelte';
</script>

<svelte:head>
  <title>Orders</title>
</svelte:head>

<Header />

<div class="Orders">
  <Table {headers} {data} height={75} />
</div>

<style lang="scss">
  .Orders {
    padding: 2em;
  }
</style>
