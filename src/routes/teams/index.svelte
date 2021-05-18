<script>
  import { onMount } from 'svelte';
  import Header from './Header.svelte';
  import Table from '../../components/table/Table.svelte';
  import OverlayDelete from '../../components/OverlayDelete/OverlayDelete.svelte';
  import { deleteTeam, editTeam } from '../../tools/crudApi.ts';
  import { getDisplayName } from '../../tools/tools.ts';
  import {
    contactsStore,
    teamsStore,
    trucksStore,
    userStore,
  } from '../../store';
  import moment from 'moment';
  import _ from 'lodash';

  let role;
  let teams = [];
  let teamsMapped = [];
  let truckOpts = [];
  let managerOpts = [];

  let headers = [
    { header: 'name', text: 'Team Name' },
    { header: 'dm', text: 'Driver Manager' },
    { header: 'trucks', text: 'Trucks' },
    { header: 'actions', text: 'Actions' },
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
    let trucks = $trucksStore.trucks;
    let unavailableTrucks = [];
    let unavailableManagers = [];

    teams.forEach(t => {
      t.trucks.forEach(tr => {
        unavailableTrucks.push(tr.truckId);
      });
      unavailableManagers.push(
        t.manager && t.manager[0] ? t.manager[0]._id : 'None'
      );
    });

    let managers = $contactsStore.contacts.users.filter(
      u => u.role === 'MANAGER'
    );

    truckOpts = [
      {
        header: 'Available Trucks',
        opts: trucks
          .flatMap(t =>
            !unavailableTrucks.includes(t.truckId) ? t.truckId : []
          )
          .map(o => {
            return { text: o, value: o, selected: false };
          }),
      },
    ];

    managerOpts = [
      {
        header: 'Available Managers',
        opts: [{ text: 'None', value: null, selected: false }].concat(
          managers
            .flatMap(t => (!unavailableManagers.includes(t._id) ? t : []))
            .map(o => {
              return { text: o.name, value: o._id, selected: false };
            })
        ),
      },
    ];

    teamsMapped = teams
      .map(t => {
        return {
          type: 'teams',
          id: t._id,
          name: t.teamId,
          dm: t.manager[0] ? getDisplayName(t.manager[0]) : 'None',
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

    teamSignup(team)
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
        overlayError = err.code;
      });
  }

  async function deleteTeams() {
    teamsToDelete.forEach(async u => {
      await deleteTeam(u);
    });

    teamsStore.setTeams(
      $teamsStore.teams.filter(u => !teamsToDelete.includes(u._id))
    );

    clearOverlayData();
  }

  function removeTruckFromTeam(teamId, truckId) {
    let teamToEdit = _.find(teams, { _id: teamId });

    let t = teamToEdit.trucks.map(t => t.truckId).filter(t => t !== truckId);

    teamToEdit = {
      ...teamToEdit,
      manager: teamToEdit.manager.map(m => m._id),
      trucks: t,
    };

    delete teamToEdit.truckIds;
    delete teamToEdit.__v;

    editTeam(teamToEdit.teamId, teamToEdit).then(res => {
      teamsStore.setTeams(
        $teamsStore.teams.map(t => {
          if (t._id == teamId) {
            return {
              ...t,
              trucks: t.trucks.filter(tr => tr.truckId !== truckId),
            };
          } else {
            return t;
          }
        })
      );
    });
  }

  function handleSelectTruck(teamId, truckId) {
    let teamToEdit = _.find(teams, { _id: teamId });
    let t = teamToEdit.trucks.map(t => t.truckId);

    teamToEdit = {
      ...teamToEdit,
      manager: teamToEdit.manager.map(m => m._id),
      trucks: [...t, truckId],
    };

    delete teamToEdit.truckIds;
    delete teamToEdit.__v;

    editTeam(teamToEdit.teamId, teamToEdit).then(res => {
      teamsStore.setTeams(
        $teamsStore.teams.map(t => {
          if (t._id == teamId) {
            let newTruck = _.find($trucksStore.trucks, { truckId: truckId });
            return {
              ...t,
              trucks: [...t.trucks, newTruck],
            };
          } else {
            return t;
          }
        })
      );
    });
  }

  function handleSelectManager(teamId, managerId) {
    let teamToEdit = _.find(teams, { _id: teamId });

    let t = teamToEdit.trucks.map(t => t.truckId);

    teamToEdit = { ...teamToEdit, manager: managerId, trucks: t };

    delete teamToEdit.truckIds;
    delete teamToEdit.__v;

    editTeam(teamToEdit.teamId, teamToEdit)
      .then(res => {
        teamsStore.setTeams(
          $teamsStore.teams.map(t => {
            if (t._id == teamId) {
              return {
                ...t,
                manager: res.manager,
              };
            } else {
              return t;
            }
          })
        );

        contactsStore.setContacts({
          ...$contactsStore.contacts,
          teams: $contactsStore.contacts.teams.map(t => {
            if (t.id === teamId) {
              return {
                ...t,
                subgroups: t.subgroups.map(s => {
                  if (s.name === 'Driver Manager') {
                    if (managerId === null) {
                      return { ...s, contacts: [] };
                    } else {
                      let m = res.manager[0];
                      m.id = m._id;
                      m.name = getDisplayName(m);

                      return { ...s, contacts: [m] };
                    }
                  } else {
                    return s;
                  }
                }),
              };
            } else {
              return t;
            }
          }),
        });

        console.log($contactsStore.contacts);
      })
      .catch(err => console.log(err));
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
    {headerHeight}
    {removeTruckFromTeam}
    {truckOpts}
    {managerOpts}
    {handleSelectTruck}
    {handleSelectManager}
    {role} />
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
