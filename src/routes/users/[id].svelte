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
  import { getUser, editUser, getTeamTruckIds } from '../../tools/crudApi.ts';
  import { contactsStore, trucksStore } from '../../store';
  import { onMount } from 'svelte';
  import _ from 'lodash';
  import { getDisplayName } from '../../tools/getDisplayName';

  export let id;

  let user;
  let contacts;
  let basicInfo = { first: '', last: '', dm: '', truckId: '' };
  let statusSwitch = false;
  let truckOpts = [];
  let dropdownOpts = [];

  $: {
    console.log($contactsStore.contacts);
    user = _.find($contactsStore.contacts.users, { id: id });
    console.log(user);
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
    console.log(v);
    statusSwitch = v;

    editUser(id, {
      ...user,
      states: { ...user.states, isActive: statusSwitch },
    });
  }

  function handleSelect(v) {
    basicInfo.truckId = v;
  }

  async function handleInput(e) {
    basicInfo[e.target.name] = e.target.value;

    if (e.target.name === 'dm') {
      basicInfo.truckId = '';
    }

    const updatedUser = await editUser(id, {
      ...user,
      truckId: basicInfo.truckId,
      teamId: basicInfo.dm,
      contactInfo: {
        ...user.contactInfo,
        firstName: basicInfo.first,
        lastName: basicInfo.last,
      },
    });

    updatedUser.name = getDisplayName(updatedUser);
    updatedUser.id = updatedUser._id;

    const c = $contactsStore.contacts.users.map(u =>
      u.id === user.id ? updatedUser : u
    );

    console.log(c);

    contactsStore.setContacts({
      teams: $contactsStore.contacts.teams,
      users: c,
    });

    // const _.find(contacts, { id: user._id });
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
            onChange={handleInput} />
          <Dropdown simpleSelect={true} data={dropdownOpts} {handleSelect} />
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
