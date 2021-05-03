<script>
  import { onMount, afterUpdate } from 'svelte';
  import Header from './Header.svelte';
  import UserTable from '../../components/table/userTable/UserTable.svelte';
  import Loading from '../../components/loading/Loading.svelte';
  import { userStore } from '../../store';
  import { getAllUsers } from '../../tools/crudApi';

  let userView = '';
  let isLoading = false;

  const handleToggle = e => {
    userView = e.detail.tab;
  };

  let users;
  $: admins = users ? users.filter(user => user.role === 'ADMIN') : users;
  $: drivers = users ? users.filter(user => user.role !== 'ADMIN') : users;

  onMount(async () => {
    isLoading = true;
    if ($userStore.user) {
      users = await getAllUsers();
      console.log('users', users);
      console.log('drivers', drivers);
      isLoading = false;
    }
  });

  afterUpdate(async () => {
    if (!users) {
      if ($userStore.user) {
        users = await getAllUsers();
        isLoading = false;
      }
    }
  });
</script>

<svelte:head>
  <title>Users</title>
</svelte:head>

<!-- html -->
<Header on:toggle={handleToggle} currentTab={userView} />
<section class="ManagePage">
  {#if isLoading}
    <Loading />
  {/if}
  {#if users}
    {#if userView === 'Admins'}
      <UserTable type="admin" data={admins} expand />
    {:else}
      <UserTable type="user" data={drivers} expand />
    {/if}
  {/if}
</section>

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
