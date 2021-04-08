<script>
  import Input from '../../input/Input.svelte';
  import Checkbox from '../../checkbox/Checkbox.svelte';
  import Button from '../../button/Button.svelte';
  import tools from '../../../tools/crudApi';
  import {
    isEmpty,
    validEmail,
    validPass,
    formValid,
  } from '../../form-helpers/validation';
  import Card from '../../card/Card.svelte';

  let email = '';
  let password = '';
  let isDisabled = true;

  $: emailValid = validEmail(email);
  $: passValid = validPass(password);
  $: isDisabled = formValid(emailValid, passValid);

  const handleLogin = async data => {
    if (!isDisabled) {
      const response = await tools.fetch(
        'http://localhost:5000/turnkey/login',
        {
          method: 'POST',
          body: JSON.stringify(data),
        }
      );
      if (!response.error) {
        await localStorage.setItem('turnkey', response);
        console.log(localStorage.getItem('turnkey'));
        const user = await tools.fetch(
          'http://localhost:5000/api/v1/users/me',
          { headers: { 'Turnkey-Auth': localStorage.getItem('turnkey') || '' } }
        );
        console.log(user);
      }
    }
  };
</script>

<section class="SignInForm">
  <div class="SignInForm-formContainer">
    <form class="SignInForm-form">
      <h3 class="SignInForm-formHeader">Sign Into Your Account</h3>
      <p class="SignInForm-formSubHeader">
        Welcome to RTI, Get started by signing in below.
        <br />
        Don't have an account?
        <a href="signup">Sign Up</a>
      </p>
      <span class="SignInForm-inputLabel">User ID</span>
      <Input
        fill
        placeholder=""
        value={email}
        icon="user"
        on:input={e => (email = e.target.value)}
      />
      <br />
      <span class="SignInForm-inputLabel">Password</span>
      <Input
        fill
        placeholder=""
        value={password}
        type="password"
        on:input={e => (password = e.target.value)}
      />
      <div class="uk-flex">
        <div class="uk-flex SignInForm-subGroup">
          <Checkbox secondary />
          <span class="SignInForm-subLabel">Stay signed in?</span>
        </div>
        <a href="home" class="SignInForm-forgotText">Forgot Password?</a>
      </div>
      <div
        class="SignInForm-button"
        on:click|preventDefault={() => handleLogin({ email, password })}
      >
        <Button primary fill large disabled={isDisabled}>Sign In</Button>
      </div>
    </form>
  </div>
</section>

<style src="./SignIn.scss">
</style>
