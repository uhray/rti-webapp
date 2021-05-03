<script context="module">
  export async function preload(page, session) {
    const { slug } = page.params;
    return { slug };
  }
</script>

<script>
  import { onMount, afterUpdate } from 'svelte';
  import { getUser } from '../../../tools/crudApi';
  import Button from '../../../components/button/Button.svelte';
  import Icon from '../../../components/icon/Icon.svelte';
  import Divider from '../../../components/divider/Divider.svelte';
  import Input from '../../../components/input/Input.svelte';
  import Header from './Header.svelte';
  import { userUpdate } from '../../../tools/crudApi';

  export let slug;
  let user;
  let password;
  let username = user.username || ' ';
  console.log('The Slug Received was --->', slug);

  $: newpass = password;

  const handleSetPass = async (id, username, password) => {
    const response = await userUpdate(id, { username, password });
    console.log(response);
  };

  onMount(async () => {
    user = await getUser(slug);
    console.log(user);
  });

  console.log(newpass);
</script>

<svelte:head>
  <title>Account/User Profile</title>
</svelte:head>

<Header
  firstName={user ? user.contactInfo.firstName : ''}
  lastName={user ? user.contactInfo.lastName : ''}
/>
<div class="Account">
  <h3>Profile Photo</h3>

  <img
    class="Account-photo"
    src="/images/defaultavatar.png"
    alt="Your profile"
  />

  <br />

  <div>
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
        label="First Name"
        value={user ? user.contactInfo.firstName : ''}
      />
      <Input label="Last Name" value={user ? user.contactInfo.lastName : ''} />
    </div>
    <br />
    <div class="row">
      <Input label="Driver Manager" value={user ? user.teamLeader : ''} />
      <Input label="Vehicle" value={user ? user.truckNumber : ''} />
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
    <Icon type="toggle-active" />
  </div>

  <br />

  <div class="uk-width-2-3">
    <Divider />
  </div>

  <h3>Login Information</h3>

  <form class="uk-form-stacked">
    <div class="half">
      <div class="row">
        <Input label="User ID" bind:value={username} />
      </div>
      <div class="row">
        <Input label="Password" type="password" bind:value={password} />
      </div>
      <br />
      <Button primary on>Reset Password</Button>
    </div>
  </form>
</div>

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
