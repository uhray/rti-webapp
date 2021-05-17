<script>
  import { onMount } from 'svelte';
  import Header from './Header.svelte';
  import Table from '../../components/table/Table.svelte';
  import OverlayDelete from '../../components/OverlayDelete/OverlayDelete.svelte';
  import { deleteTeam } from '../../tools/crudApi.ts';
  import { getDisplayName } from '../../tools/tools.ts';
  import { contactsStore, teamsStore, userStore } from '../../store';
  import moment from 'moment';
  import _ from 'lodash';

  let role;
  let teams = [];
  let teamsMapped = [];

  let headers = [
    { header: 'name', text: 'Team Name' },
    { header: 'dm', text: 'Driver Manager' },
    { header: 'trucks', text: 'Trucks' },
    { header: 'userActions', text: 'Actions' },
  ];

  let selectedTab = 'Teams';
  let search = undefined;
  let filter = undefined;
  let teamsToDelete = [];
  let displayOverlayDelete = false;
  let displayOverlayAdd = false;
  let isMultiple = false;
  let sendConfirmation = false;

  let headerHeight = 0;

  $: {
    role = $userStore.user.role;
    teams = $teamsStore.teams;
    console.log(teams);
    teamsMapped = teams
      .map(t => {
        return {
          type: 'teams',
          id: t._id,
          name: t.teamId,
          dm: t.manager[0] ? getDisplayName(t.manager[0]) : '',
          trucks: t.trucks.map(tr => tr.truckId),
        };
      })
      .filter(u =>
        Object.keys(u).some(k => {
          if (['name', 'dm', 'trucks'].includes(k)) {
            let regex = new RegExp(search, 'i');
            return regex.test(u[k]);
          }
        })
      );

    handleSort();
  }

  onMount(() => {
    if (document) {
      headerHeight = document.getElementById('Header').offsetHeight + 100;
    }
  });

  function handleSort(v) {
    if (v === 'new') {
      teamsMapped = _.sortBy(teamsMapped, 'createdAt').reverse();
    } else if (v === 'old') {
      teamsMapped = _.sortBy(teamsMapped, 'createdAt');
    } else if (v === 'aToZ') {
      teamsMapped = _.sortBy(teamsMapped, 'name');
    } else if (v === 'zToA') {
      teamsMapped = _.sortBy(teamsMapped, 'name').reverse();
    } else {
      teamsMapped = _.sortBy(teamsMapped, 'name');
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
    if (teamsToDelete.includes(id)) {
      teamsToDelete = teamsToDelete.filter(o => o !== id);
    } else {
      teamsToDelete.push(id);
    }

    teamsToDelete = teamsToDelete;
  }

  async function handleDelete(id) {
    teamsToDelete.push(id);
    displayOverlayDelete = true;
    isMultiple = false;
  }

  function handleDeleteSelected() {
    displayOverlayDelete = true;
    isMultiple = true;
  }

  function handleAdd(role) {
    console.log('#todo');
    // displayOverlayAdd = true;
  }

  function clearOverlayData() {
    teamsToDelete = [];
    displayOverlayDelete = false;
    let checkboxes = document.getElementsByClassName('uk-checkbox');
    Array.from(checkboxes).forEach(c => (c.checked = false));

    displayOverlayAdd = false;
    sendConfirmation = false;
  }

  function addTeam(data) {
    overlayError = null;
    const team = {
      contactInfo: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      },
      teamname: data.teamname,
      password: data.password,
      role: data.role,
      teamId: data.teamId,
    };
    console.log('add');

    teamSignup(team)
      .then(res => {
        console.log(res);
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

  async function deleteTeams() {
    teamsToDelete.forEach(async u => {
      await deleteTeam(u);
    });

    console.log($teamsStore.teams.filter(u => !teamsToDelete.includes(u._id)));

    teamsStore.setTeams(
      $teamsStore.teams.filter(u => !teamsToDelete.includes(u._id))
    );

    clearOverlayData();
  }
</script>

<style lang="scss">
  .TeamsPage {
    box-sizing: border-box;
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
  <title>Teams</title>
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

<section class="TeamsPage">
  <Table
    {headers}
    data={teamsMapped}
    {handleDelete}
    {handleDeleteSelected}
    {handleCheck}
    selected={teamsToDelete}
    height={'100vh'}
    {headerHeight} />
  <br />
</section>

{#if displayOverlayDelete}
  <OverlayDelete
    {clearOverlayData}
    send={deleteTeams}
    type={'team'}
    {isMultiple} />
{/if}

<!-- {#if displayOverlayAdd}
  <OverlayAddTeam
    {overlayError}
    {addTeamType}
    {sendConfirmation}
    {clearOverlayData}
    send={addTeam} />
{/if} -->
