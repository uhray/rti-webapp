<script>
  import Avatar from '../../components/Avatar/Avatar.svelte';
  import Button from '../../components/button/Button.svelte';
  import Icon from '../../components/icon/Icon.svelte';
  import Divider from '../../components/divider/Divider.svelte';
  import Input from '../../components/input/Input.svelte';
  import Header from './Header.svelte';
  import { userStore } from '../../store';
  import { editUser } from '../../tools/crudApi';
  import { getDisplayName, setData } from '../../tools/tools';

  let user = undefined;
  let basicInfo = { first: '', last: '', email: '' };

  $: {
    user = $userStore.user;

    basicInfo = {
      first: user.contactInfo.firstName || '',
      last: user.contactInfo.lastName || '',
      email: user.contactInfo.email || '',
    };
  }

  function handleInput(e) {
    basicInfo[e.target.name] = e.target.value;

    updateUser();
  }
  async function removeAvatar() {
    const updatedUser = await editUser(user._id, { ...user, avatarUrl: '' });

    updateStores(updatedUser);
  }

  async function updateUser() {
    const updatedUser = await editUser(user._id, {
      ...user,
      contactInfo: {
        ...user.contactInfo,
        firstName: basicInfo.first,
        lastName: basicInfo.last,
        email: basicInfo.email,
      },
    });

    updateStores(updatedUser);
  }

  async function updateStores(updatedUser) {
    updatedUser.name = getDisplayName(updatedUser);
    updatedUser.id = updatedUser._id;

    userStore.setCurrent({
      ...$userStore.user,
      id: updatedUser.id,
      name: updatedUser.name,
      avatarUrl: updatedUser.avatarUrl,
      contactInfo: {
        ...$userStore.user.contactInfo,
        firstName: updatedUser.contactInfo.firstName,
        lastName: updatedUser.contactInfo.lastName,
        email: updatedUser.contactInfo.email,
      },
    });

    await setData({ contacts: true, teams: true });
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
  .half {
    width: 50%;
    max-width: 500px;
  }
</style>

<svelte:head>
  <title>Account/User Profile</title>
</svelte:head>

<Header />

<div class="Account">
  <h3>Profile Photo</h3>

  <Avatar {user} size={100} />

  <br />

  <div>
    <Button primary outline on:click={() => console.log('#todo')}>
      Upload New Image
      <Icon type="upload" color="#15224b" slotend />
    </Button>
    <Button primary outline on:click={removeAvatar}>Remove</Button>
  </div>

  <br />

  <Divider />

  <h3>Basic Information</h3>

  <form class="uk-form-stacked">
    <div class="row">
      <div class="uk-width-1-3 uk-margin-small-right">
        <Input
          name="first"
          label="First Name"
          value={basicInfo.first}
          onChange={handleInput}
          fill />
      </div>
      <div class="uk-width-1-3 uk-margin-small-right">
        <Input
          name="last"
          label="Last Name"
          value={basicInfo.last}
          onChange={handleInput}
          fill />
      </div>
    </div>
    <br />
    <div class="row">
      <div class="uk-width-1-3 uk-margin-small-right">
        <Input
          name="email"
          label="Email"
          value={basicInfo.email}
          onChange={handleInput}
          fill />
      </div>
      {#if user.role === 'MANAGER'}
        <div class="uk-width-1-3 uk-margin-small-right">
          <Input value={user.teamId} label="Team" fill disabled />
        </div>
      {/if}
    </div>
  </form>

  <br />
  <Divider />

  <h3>Password</h3>

  <form class="uk-form-stacked">
    <div class="half">
      <div class="row">
        <div class="uk-width-2-3">
          <Input label="Current Password" fill />
        </div>
      </div>
      <div class="row">
        <div class="uk-width-2-3">
          <Input label="New Password" fill />
        </div>
      </div>
      <div class="row">
        <div class="uk-width-2-3">
          <Input label="Confirm Password" fill />
        </div>
      </div>
      <br />
      <Button primary>Save Passwordd</Button>
    </div>
  </form>
</div>
