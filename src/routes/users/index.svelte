<script>
  import Header from './Header.svelte';
  import Table from '../../components/table/Table.svelte';
  import { contactsStore } from '../../store';
  import _ from 'lodash';

  let drivers = [];
  let users = [];
  let usersMapped;

  $: {
    drivers = $contactsStore.contacts.drivers;
    console.log(drivers);

    drivers.forEach(d => {
      d.subgroups.forEach(s => {
        s.contacts.forEach(c => {
          users.push(c);
        });
      });
    });

    users = users;
    usersMapped = _.sortBy(
      users.map(u => {
        return {
          id: u._id,
          type: 'users',
          name: u.name,
          username: u.username,
          teamId: u.teamId,
          truckId: u.truckId,
          status: u.status,
        };
      }),
      'createdAt'
    );

    console.log(users);
  }

  export const headers = [
    { header: 'name', text: 'Full Name', size: 'large' },
    { header: 'username', text: 'User ID' },
    { header: 'teamId', text: 'Driver Manager', size: 'medium' },
    { header: 'truckId', text: 'Vehicle' },
    { header: 'status', text: 'Status' },
    { header: 'userActions', text: 'Actions', size: 'small' },
  ];
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

<Header />
<!-- Show This Link Tag Only If Users/Admins are Selected -->
<!-- <div class="uk-flex uk-align-right delete-section">
  <a class="delete-link">Delete Selections</a>
  <Icon type="delete" color="#2b8af7" />
</div> -->
<section class="ManagePage">
  <!-- Show This if Users Tab Is Active -->
  <Table {headers} data={usersMapped} />
  <br />
  <!-- Show This if Admins Tab Is Active -->
  <!-- <Table height={25} headers={adminsHeaders} data={adminsTable} expand /> -->
</section>
