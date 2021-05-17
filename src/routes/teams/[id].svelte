<script context="module">
  export async function preload(page) {
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
  import { editteam, getTeamTruckIds } from '../../tools/crudApi.ts';
  import { contactsStore, trucksStore } from '../../store';
  import { onMount } from 'svelte';
  import _ from 'lodash';
  import { getDisplayName } from '../../tools/tools.ts';

  export let id;

  let team;
  let trucks;
  let basicInfo = { first: '', last: '', dm: '', truckId: '' };
  let statusSwitch = false;
  let truckOpts = [];
  let dropdownOpts = [];

  $: {
    team = _.find($contactsStore.contacts.teams, { id: id });
  }

  $: {
  }

  function handleSelect(v) {
    basicInfo.truckId = v;
    updateteam();
  }

  function handleInput(e) {
    basicInfo[e.target.name] = e.target.value;
    if (e.target.name === 'dm') {
      basicInfo.truckId = '';
      isVehicleLoading = true;
    }
    updateteam();
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
  <title>Account/team Profile</title>
</svelte:head>

{#if team}
  <ProfileHeader name={team.name} />

  <div class="Account">
    <h3>Profile Photo</h3>

    <img class="Account-photo" src={team.avatarUrl} alt="Your profile" />

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
          <Dropdown simpleSelect={true} data={dropdownOpts} {handleSelect} />
        </div>
      </div>
    </form>

    <br />

    <div class="uk-width-2-3">
      <Divider />
    </div>

  </div>
{/if}
