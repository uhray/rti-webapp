<script>
  import Header from './Header.svelte';
  import Table from '../../components/table/Table.svelte';
  import { contactsStore, userStore } from '../../store';
  import _ from 'lodash';

  let role;
  let contacts = [];
  let users = [];
  let usersMapped;
  let driverHeaders = [
    { header: 'name', text: 'Full Name', size: 'large' },
    { header: 'username', text: 'User ID' },
    { header: 'teamId', text: 'Driver Manager', size: 'medium' },
    { header: 'truckId', text: 'Vehicle' },
    { header: 'status', text: 'Status' },
    { header: 'userActions', text: 'Actions', size: 'small' },
  ];
  let managerHeaders = [
    { header: 'name', text: 'Full Name', size: 'large' },
    { header: 'teamId', text: 'Teams' },
    { header: 'email', text: 'Email' },
    { header: 'lastLoginDate', text: 'Last Login Date', size: 'medium' },
    { header: 'userActions', text: 'Actions', size: 'small' },
  ];
  let adminHeaders = [
    { header: 'name', text: 'Full Name', size: 'large' },
    { header: 'email', text: 'Email', size: 'medium' },
    { header: 'lastLoginDate', text: 'Last Login Date', size: 'medium' },
    { header: 'actions', text: 'Actions', size: 'small' },
  ];
  let headers = driverHeaders;

  let selectedTab = 'Users';

  $: {
    console.log('store', $userStore.user.role);
    role = $userStore.user.role;
    contacts = $contactsStore.contacts.drivers;
    let allUsers = $contactsStore.contacts.contacts;
    console.log(allUsers);

    contacts.forEach(d => {
      d.subgroups.forEach(s => {
        s.contacts.forEach(c => {
          users.push(c);
        });
      });
    });
    allUsers.forEach(u => {
      console.log(u.role);
      if (u.role === 'MANAGER') {
        users.push(u);
      }
    });

    users = users;

    if (selectedTab === 'Users') {
      users = users.filter(u => u.role === 'DRIVER');
      headers = driverHeaders;
    } else if (selectedTab === 'Managers') {
      users = users.filter(u => u.role === 'MANAGER');
      headers = managerHeaders;
      if (role !== 'ADMIN') {
        // headers.filter(h => header.header !== 'userActions');
      }
    } else if (selectedTab === 'Admins' && role === 'ADMIN') {
      users = users.filter(u => u.role === 'ADMIN');
      headers = adminHeaders;
    }

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
          email: u.contactInfo.email,
        };
      }),
      'name'
    );
  }

  function handleSort(v) {
    if (v === 'new') {
      usersMapped = _.sortBy(usersMapped, 'createdAt').reverse();
    } else if (v === 'old') {
      usersMapped = _.sortBy(usersMapped, 'createdAt');
    } else if (v === 'aToZ') {
      usersMapped = _.sortBy(usersMapped, 'name');
    } else if (v === 'zToA') {
      usersMapped = _.sortBy(usersMapped, 'name').reverse();
    }
  }

  function handleTab(tab) {
    selectedTab = tab;
  }
</script>

<style lang="scss">
  .ManagePage {
    box-sizing: border-box;
    padding: 2em;
    margin-top: 3em;

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

<Header {role} {handleSort} {selectedTab} {handleTab} />
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
