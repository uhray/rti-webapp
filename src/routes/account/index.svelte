<script>
  import Logo from '../../../static/images/rti.png';
  import Button from '../../components/button/Button.svelte';
  import Icon from '../../components/icon/Icon.svelte';
  import Divider from '../../components/divider/Divider.svelte';
  import Input from '../../components/input/Input.svelte';
  import Header from './Header.svelte';
  import { userStore } from '../../store';
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

  <img class="Account-photo" src={Logo} alt="Your profile" />

  <br />

  <div>
    <Button primary outline>
      Upload New Image
      <Icon type="upload" color="#15224b" slotend />
    </Button>
    <Button primary outline>Remove</Button>
  </div>

  <br />

  <Divider />

  <h3>Basic Information</h3>

  <form class="uk-form-stacked">
    <div class="row">
      <div class="uk-width-1-3 uk-margin-small-right">
        <Input label="First Name" fill />
      </div>
      <div class="uk-width-1-3 uk-margin-small-right">
        <Input label="Last Name" fill />
      </div>
    </div>
    <br />
    <div class="row">
      <div class="uk-width-1-3 uk-margin-small-right">
        <Input label="Email" fill />
      </div>
      <div class="uk-width-1-3 uk-margin-small-right">
        <Input label="Driver Manager" fill />
      </div>
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
      <Button primary>Save Password</Button>
    </div>
  </form>
</div>
