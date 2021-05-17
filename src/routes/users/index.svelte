<script>
  import { onMount } from 'svelte';
  import Header from './Header.svelte';
  import Table from '../../components/table/Table.svelte';
  import OverlayDelete from '../../components/OverlayDelete/OverlayDelete.svelte';
  import OverlayAddUser from '../../components/OverlayAddUser/OverlayAddUser.svelte';
  import { deleteUser, userSignup } from '../../tools/crudApi.ts';
  import { getDisplayName } from '../../tools/tools.ts';
  import { contactsStore, userStore } from '../../store';
  import moment from 'moment';
  import _ from 'lodash';

  let role;
  let teams = [];
  let allUsers = [];
  let users = [];

  let usersMapped;
  let driverHeaders = [
    { header: 'name', text: 'Full Name', size: 'large' },
    { header: 'username', text: 'User ID' },
    { header: 'teamId', text: 'Driver Manager' },
    { header: 'truckId', text: 'Vehicle' },
    { header: 'status', text: 'Status' },
    { header: 'userActions', text: 'Actions' },
  ];
  let managerHeaders = [
    { header: 'name', text: 'Full Name', size: 'large' },
    { header: 'teamId', text: 'Teams' },
    { header: 'email', text: 'Email' },
    { header: 'lastLogin', text: 'Last Login Date' },
    { header: 'userActions', text: 'Actions' },
  ];
  let adminHeaders = [
    { header: 'name', text: 'Full Name', size: 'large' },
    { header: 'email', text: 'Email' },
    { header: 'lastLogin', text: 'Last Login Date' },
    { header: 'actions', text: 'Actions' },
  ];
  let headers = driverHeaders;

  let selectedTab = 'Users';
  let search = undefined;
  let filter = undefined;
  let usersToDelete = [];
  let displayOverlayDelete = false;
  let displayOverlayAdd = false;
  let isMultiple = false;
  let sendConfirmation = false;
  let addUserType = 'MANAGER';
  let overlayError = '';

  let headerHeight = 0;

  $: {
    role = $userStore.user.role;
    teams = $contactsStore.contacts.teams;
    allUsers = $contactsStore.contacts.users;

    users = [];

    if (role === 'ADMIN') {
      users = allUsers.filter(u => !u.states.isDeleted);
    } else {
      teams.forEach(d => {
        d.subgroups.forEach(s => {
          s.contacts.forEach(c => {
            !c.states.isDeleted && users.push(c);
          });
        });
      });
      allUsers.forEach(u => {
        if (u.role === 'MANAGER') {
          users.push(u);
        }
      });
    }

    users = users;

    if (selectedTab === 'Users') {
      users = users.filter(u => u.role === 'DRIVER');
      headers = driverHeaders;
    } else if (selectedTab === 'Managers') {
      users = users.filter(u => u.role === 'MANAGER');
      headers = managerHeaders;
      if (role === 'MANAGER') {
        headers = headers.filter(h => h.header !== 'userActions');
      }
    } else if (selectedTab === 'Admins' && role === 'ADMIN') {
      users = users.filter(u => u.role === 'ADMIN');
      headers = adminHeaders;
    }

    usersMapped = users
      .map(u => {
        return {
          id: u.id,
          type: 'users',
          name: u.name || '',
          username: u.username || '',
          teamId: u.teamId || '',
          truckId: u.truckId || '',
          status: u.states.isActive ? 'active' : 'inactive',
          email: u.contactInfo.email || '',
          lastLogin: u.lastLogin
            ? moment(u.lastLogin).format('MMM D YYYY • h:mm a')
            : '',
        };
      })
      .filter(u => (filter ? (u.status === filter ? true : false) : true))
      .filter(u =>
        Object.keys(u).some(k => {
          if (['name', 'username', 'teamId', 'truckId'].includes(k)) {
            let regex = new RegExp(search, 'i');
            return regex.test(u[k]);
          }
        })
      );

    handleSort();
  }

  onMount(() => {
    if (document) {
      let hHeight = document.getElementById('Header').offsetHeight;
      let tabsHeight = document.getElementById('Header-tabs').offsetHeight;

      headerHeight = hHeight + tabsHeight + 50;
    }
  });

  function handleSort(v) {
    if (v === 'new') {
      usersMapped = _.sortBy(usersMapped, 'createdAt').reverse();
    } else if (v === 'old') {
      usersMapped = _.sortBy(usersMapped, 'createdAt');
    } else if (v === 'aToZ') {
      usersMapped = _.sortBy(usersMapped, 'name');
    } else if (v === 'zToA') {
      usersMapped = _.sortBy(usersMapped, 'name').reverse();
    } else {
      usersMapped = _.sortBy(usersMapped, 'name');
    }
  }

  function handleFilter(v) {
    filter = v;
  }

  function handleTab(tab) {
    selectedTab = tab;
  }

  function handleSearch(v) {
    search = v;
  }

  function handleCheck(id) {
    if (usersToDelete.includes(id)) {
      usersToDelete = usersToDelete.filter(o => o !== id);
    } else {
      usersToDelete.push(id);
    }

    usersToDelete = usersToDelete;
  }

  async function handleDelete(id) {
    usersToDelete.push(id);
    displayOverlayDelete = true;
    isMultiple = false;
  }

  function handleDeleteSelected() {
    displayOverlayDelete = true;
    isMultiple = true;
  }

  function handleAdd(role) {
    addUserType = role;

    displayOverlayAdd = true;
  }

  function clearOverlayData() {
    usersToDelete = [];
    displayOverlayDelete = false;
    let checkboxes = document.getElementsByClassName('uk-checkbox');
    Array.from(checkboxes).forEach(c => (c.checked = false));

    displayOverlayAdd = false;
    sendConfirmation = false;
  }

  function addUser(data) {
    overlayError = null;
    const user = {
      contactInfo: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      },
      username: data.username,
      password: data.password,
      role: data.role,
      teamId: data.teamId,
    };

    userSignup(user)
      .then(res => {
        sendConfirmation = true;

        contactsStore.setContacts({
          ...$contactsStore.contacts,
          users: [
            ...$contactsStore.contacts.users,
            { ...res, name: getDisplayName(res) },
          ],
        });
      })
      .catch(err => {
        console.log('ERROR FROM INDEX', err);

        overlayError = err.code;
      });
  }

  async function deleteUsers() {
    usersToDelete.forEach(async u => {
      await deleteUser(u);
    });

    let teamsAfterDelete = $contactsStore.contacts.teams.map(d => {
      return {
        ...d,
        subgroups: d.subgroups.map(s => {
          return {
            ...s,
            contacts: s.contacts.flatMap(c =>
              !c.states.isDeleted && !usersToDelete.includes(c.id) ? c : []
            ),
          };
        }),
      };
    });

    teamsAfterDelete = teamsAfterDelete.map(d => {
      return {
        ...d,
        subgroups: d.subgroups.flatMap(s => (s.contacts.length > 0 ? s : [])),
      };
    });

    const usersAfterDelete = $contactsStore.contacts.users.filter(
      u => !usersToDelete.includes(u._id)
    );

    contactsStore.setContacts({
      teams: teamsAfterDelete,
      users: usersAfterDelete,
    });

    clearOverlayData();
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

<Header
  {role}
  {handleSort}
  {selectedTab}
  {handleTab}
  {search}
  {handleSearch}
  {handleFilter}
  {handleAdd} />
<!-- Show This Link Tag Only If Users/Admins are Selected -->
<!-- <div class="uk-flex uk-align-right delete-section">
  <a class="delete-link">Delete Selections</a>
  <Icon type="delete" color="#2b8af7" />
</div> -->
<section class="ManagePage">
  <Table
    {headers}
    data={usersMapped}
    {handleDelete}
    {handleDeleteSelected}
    {handleCheck}
    selected={usersToDelete}
    height={'100vh'}
    {headerHeight} />
  <br />
</section>

{#if displayOverlayDelete}
  <OverlayDelete
    {clearOverlayData}
    send={deleteUsers}
    type={'user'}
    {isMultiple} />
{/if}

{#if displayOverlayAdd}
  <OverlayAddUser
    {overlayError}
    {addUserType}
    {sendConfirmation}
    {clearOverlayData}
    send={addUser} />
{/if}
