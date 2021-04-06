<script context="module">
  export async function preload(page, session) {
    const { slug } = page.params;

    return { slug };
  }
</script>

<script>
  import Button from '../../../components/button/Button.svelte';
  import Icon from '../../../components/icon/Icon.svelte';
  import Divider from '../../../components/divider/Divider.svelte';
  import Input from '../../../components/input/Input.svelte';
  import Header from './Header.svelte';

  export let slug;
  console.log('The Slug Received was --->', slug);
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

<Header />
<div class="Account">
  <h3>Profile Photo</h3>

  <img
    class="Account-photo"
    src="/images/defaultavatar.png"
    alt="Your profile" />

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
      <Input label="First Name" />
      <Input label="Last Name" />
    </div>
    <br />
    <div class="row">
      <Input label="Driver Manager" />
      <Input label="Vehicle" />
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
