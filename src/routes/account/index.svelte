<script>
  import Logo from '../../../static/images/rti.png';
  import Button from '../../components/button/Button.svelte';
  import Icon from '../../components/icon/Icon.svelte';
  import Divider from '../../components/divider/Divider.svelte';
  import Input from '../../components/input/Input.svelte';
</script>

<style lang="scss">
  .test {
    width: 64px;
    height: 64px;
    margin: 8px;
    background-color: green;
  }
  .Account {
    display: flex;
    flex-flow: column;

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

    section {
      margin-right: 10px;
      width: 100%;
    }
    section:last-child {
      margin-right: 0;
    }
  }
</style>

<svelte:head>
  <title>Account/User Profile</title>
</svelte:head>

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

  <Divider type="default" />

  <h3>Basic Information</h3>

  <form class="uk-form-stacked">
    <div class="row">
      <Input type="input-active-outlined" label="First Name" isValid={true} />
      <Input type="input-active-outlined" label="Last Name" isValid={true} />
    </div>
  </form>
</div>
