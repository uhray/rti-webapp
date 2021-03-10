<script>
  import Header from './Header.svelte';
  import Table from '../../components/table/Table.svelte';
  import TabMenu from '../../components/tabmenu/TabMenu.svelte';
  import { headers, data } from './data';
</script>

<style>
  .MacroPage {
    padding: 2em;
  }
</style>

<svelte:head>
  <title>Macros</title>
</svelte:head>

<Header />
<section class="MacroPage">
  <div class="uk-width-1-3">
    <TabMenu type="default" nospace tabs={['Active', 'Inactive']} />
  </div>
  <Table {headers} {data} height={71} />
</section>
