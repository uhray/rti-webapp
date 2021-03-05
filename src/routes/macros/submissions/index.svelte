<script>
  import Header from './Header.svelte';
  import Table from '../../../components/table/Table.svelte';
  import { data } from './data';
</script>

<Header />
<section class="MacroSubmissionsPage">
  <Table userTable height={75} {data} />
</section>

<style lang="scss">
  .MacroSubmissionsPage {
    padding: 2em;
  }
</style>
