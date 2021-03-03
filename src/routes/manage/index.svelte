<script>
  import Table from '../../components/table/Table.svelte';
  import { usersTable, adminsTable } from '../../data/fakeTableData';
</script>

<!-- html -->
<section class="ManagePage">
  <Table height={65} data={usersTable} />
  <br />
  <Table height={30} data={adminsTable} />
</section>

<style lang="scss"></style>
