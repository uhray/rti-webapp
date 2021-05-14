<script context="module">
  export async function preload(page, session) {
    const { id } = page.params;

    return { id };
  }
</script>

<script>
  import Button from '../../components/button/Button.svelte';
  import Switch from '../../components/Switch/Switch.svelte';
  import Icon from '../../components/icon/Icon.svelte';
  import Divider from '../../components/divider/Divider.svelte';
  import Input from '../../components/input/Input.svelte';
  import Dropdown from '../../components/Dropdown/Dropdown.svelte';
  import ProfileHeader from './ProfileHeader.svelte';
  import {
    getUser,
    editUser,
    getTeamTruckIds,
    getContacts,
  } from '../../tools/crudApi.ts';
  import { contactsStore, trucksStore } from '../../store';
  import { onMount } from 'svelte';
  import _ from 'lodash';
  import { getDisplayName } from '../../tools/tools.ts';

  export let id;

  let user;
  let contacts;
  let trucks;
  let basicInfo = { first: '', last: '', dm: '', truckId: '' };
  let statusSwitch = false;
  let truckOpts = [];
  let dropdownOpts = [];
  let isVehicleLoading = false;

  $: {
    user = _.find($contactsStore.contacts.users, { id: id });
    trucks = $trucksStore.trucks;
    contacts = $contactsStore.contacts;

    getTeamTruckIds(user.teamId).then(res => (truckOpts = res));
  }

  $: {
    if (truckOpts.length > 0) {
      dropdownOpts = [
        {
          header: 'Vehicles',
          opts: truckOpts.map(o => {
            return { text: o, value: o, selected: false };
          }),
        },
      ];
    }
  }

  onMount(async () => {
    // user = await getUser(id);

    basicInfo = {
      first: user.contactInfo.firstName,
      last: user.contactInfo.lastName,
      dm: user.teamId,
      truckId: user.truckId,
    };
    statusSwitch = user.states.isActive ? true : false;
  });

  function handleSwitch(v) {
    statusSwitch = v;
    updateUser();
  }

  function handleSelect(v) {
    basicInfo.truckId = v;
    updateUser();
  }

  function handleInput(e) {
    basicInfo[e.target.name] = e.target.value;
    if (e.target.name === 'dm') {
      basicInfo.truckId = '';
      isVehicleLoading = true;
    }
    updateUser();
  }

  async function updateUser() {
    const updatedUser = await editUser(id, {
      ...user,
      truckId: basicInfo.truckId,
      teamId: basicInfo.dm,
      contactInfo: {
        ...user.contactInfo,
        firstName: basicInfo.first,
        lastName: basicInfo.last,
      },
      states: { ...user.states, isActive: statusSwitch },
    });

    updatedUser.name = getDisplayName(updatedUser);
    updatedUser.id = updatedUser._id;

    if (updatedUser.truckId !== user.truckId) {
      const updatedTrucks = trucks.map(t => {
        if (t.truckId === user.truckId) {
          return { ...t, drivers: t.drivers.filter(d => d !== user._id) };
        } else if (t.truckId === updatedUser.truckId) {
          return { ...t, drivers: [...t.drivers, user._id] };
        } else {
          return t;
        }
      });

      trucksStore.setTrucks(updatedTrucks);
    }
    let teamsAfterUpdate;

    if (updatedUser.teamId !== user.teamId) {
      teamsAfterUpdate = $contactsStore.contacts.teams.map(t => {
        if (t.name === user.teamId) {
          return {
            ...t,
            subgroups: t.subgroups.map(s => {
              if (s.name === user.driverClass) {
                return {
                  ...s,
                  contacts: s.contacts.filter(d => d.id !== user._id),
                };
              } else {
                return s;
              }
            }),
          };
        } else if (t.name === updatedUser.teamId) {
          const check = _.find(t.subgroups, { name: user.driverClass });

          if (!check) {
            t.subgroups.push({ name: user.driverClass, contacts: [] });
          }
          return {
            ...t,
            subgroups: t.subgroups.map(s => {
              if (s.name === user.driverClass) {
                return { ...s, contacts: [...s.contacts, updatedUser] };
              } else {
                return s;
              }
            }),
          };
        } else {
          return t;
        }
      });
    } else {
      teamsAfterUpdate = $contactsStore.contacts.teams.map(d => {
        return {
          ...d,
          subgroups: d.subgroups.map(s => {
            return {
              ...s,
              contacts: s.contacts.map(c =>
                c.id === user.id ? updatedUser : c
              ),
            };
          }),
        };
      });
    }

    teamsAfterUpdate = teamsAfterUpdate.map(d => {
      return {
        ...d,
        subgroups: d.subgroups.flatMap(s => (s.contacts.length > 0 ? s : [])),
      };
    });

    const usersAfterUpdate = $contactsStore.contacts.users.map(u =>
      u.id === user.id ? updatedUser : u
    );

    contactsStore.setContacts({
      teams: teamsAfterUpdate,
      users: usersAfterUpdate,
    });

    isVehicleLoading = false;
  }
</script>

<style lang="scss">
  .Account {
    display: flex;
    flex-flow: column;
    padding: 2em;

    .Account-photo {
      width: 80px;
      height: 80px;
      border-radius: 100%;
    }
  }
  .row {
    display: inline-flex;
    flex-flow: row nowrap;
    width: 100%;
    max-width: 1000px;
    margin-bottom: 10px;
  }
  .toggle-text {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: #15224b;
    margin: auto 15px auto 0px;
  }
  .half {
    width: 50%;
    max-width: 500px;
  }
</style>

<svelte:head>
  <title>Account/User Profile</title>
</svelte:head>

{#if user}
  <ProfileHeader name={user.name} />

  <div class="Account">
    <h3>Profile Photo</h3>

    <img class="Account-photo" src={user.avatarUrl} alt="Your profile" />

    <br />

    <div
      on:click={() => {
        console.log('#TODO');
      }}>
      <Button primary outline>
        Upload New Image
        <Icon type="upload" color="#15224b" slotend />
      </Button>
    </div>

    <br />

    <div class="uk-width-2-3">
      <Divider />
    </div>

    <h3>Basic Information</h3>

    <form class="uk-form-stacked">
      <div class="row">
        <Input
          name="first"
          label="First Name"
          value={basicInfo.first}
          onChange={handleInput} />
        <Input
          name="last"
          label="Last Name"
          value={basicInfo.last}
          onChange={handleInput} />
      </div>
      <br />
      <div class="row">
        <Input
          name="dm"
          label="Driver Manager"
          value={basicInfo.dm}
          onChange={handleInput} />
        <div>
          <Input
            name="truckId"
            label="Vehicle"
            value={basicInfo.truckId}
            onChange={handleInput}
            icon="caretdown" />
          <Dropdown
            loading={isVehicleLoading}
            simpleSelect={true}
            data={dropdownOpts}
            {handleSelect} />
        </div>
      </div>
    </form>

    <br />

    <div class="uk-width-2-3">
      <Divider />
    </div>
    <!-- Section for User Status -->
    <h3>User Status</h3>
    <div class="uk-flex">
      <p class="toggle-text">Status Active (Off/On)</p>
      <Switch {handleSwitch} checked={statusSwitch} />
    </div>

    <br />

    <div class="uk-width-2-3">
      <Divider />
    </div>

    <h3>Login Information</h3>

    <form class="uk-form-stacked">
      <div class="half">
        <div class="row">
          <Input label="User ID" />
        </div>
        <div class="row">
          <Input label="Password" />
        </div>
        <br />
        <Button primary>Reset Password</Button>
      </div>
    </form>
  </div>
{/if}
