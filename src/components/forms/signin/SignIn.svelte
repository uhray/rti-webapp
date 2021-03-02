<script>
  import Input from '../../input/Input.svelte';
  import Checkbox from '../../checkbox/Checkbox.svelte';
  import Button from '../../button/Button.svelte';
</script>

<section class="SignInForm">
  <div class="SignInForm-formContainer">
    <form class="SignInForm-form">
      <h3 class="SignInForm-formHeader">Sign Into Your Account</h3>
      <p class="SignInForm-formSubHeader">
        Welcome to RTI, Get started by signing in below.
      </p>
      <span class="SignInForm-inputLabel">User ID</span>
      <Input type="input-inactive" isValid placeholder="" icon="user" />
      <br />
      <span class="SignInForm-inputLabel">Password</span>
      <Input type="input-inactive" isValid placeholder="" icon="hide" />
      <div class="uk-flex">
        <div class="uk-flex SignInForm-subGroup">
          <Checkbox secondary />
          <span class="SignInForm-subLabel">Stay signed in?</span>
        </div>
        <a href="home" class="SignInForm-forgotText">Forgot Password?</a>
      </div>
      <div class="SignInForm-button">
        <Button primary fillWidth large>Sign In</Button>
      </div>
    </form>
  </div>
</section>

<style src="./SignIn.scss"></style>
