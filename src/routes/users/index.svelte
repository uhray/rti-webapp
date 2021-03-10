<script>
  import Header from './Header.svelte';
  import Table from '../../components/table/Table.svelte';
  import Icon from '../../components/icon/Icon.svelte';
  import { usersTable, adminsTable } from '../../data/fakeTableData';
</script>

<style lang="scss">
  .ManagePage {
    padding: 2em;
    .delete-section {
      margin: 0px 15px 5px 0px;
      padding: 5px;
    }
    .delete-link {
      font-family: Poppins;
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 15px;
      text-align: center;
      text-transform: capitalize;
      color: #2b8af7;
      margin-top: auto;
      margin-bottom: auto;
    }
  }
</style>

<svelte:head>
  <title>Users</title>
</svelte:head>
<h1>Users Management</h1>
<!-- html -->
<Header />
<!-- Show This Link Tag Only If Users/Admins are Selected -->
<!-- <div class="uk-flex uk-align-right delete-section">
  <a class="delete-link">Delete Selections</a>
  <Icon type="delete" color="#2b8af7" />
</div> -->
<section class="ManagePage">
  <!-- Show This if Users Tab Is Active -->
  <Table height={60} data={usersTable} expand />
  <br />
  <!-- Show This if Admins Tab Is Active -->
  <Table height={25} data={adminsTable} expand />
</section>
