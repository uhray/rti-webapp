<script>
  import { goto } from '@sapper/app';
  import Input from '../../input/Input.svelte';
  import Checkbox from '../../checkbox/Checkbox.svelte';
  import Button from '../../button/Button.svelte';
  import { userLogin, auth } from '../../../tools/crudApi';
  import { userStore } from '../../../store';
  import { isEmpty, validPass, formValid } from '../../form-helpers/validation';
  import { setData } from '../../../tools/tools';

  let username = '';
  let password = '';
  let isDisabled = true;

  $: usernameValid = !isEmpty(username);
  $: passValid = validPass(password);
  $: isDisabled = formValid(usernameValid, passValid);

  const handleLogin = async data => {
    if (!isDisabled) {
      userLogin(data)
        .then(async res => {
          console.log('response', res);
          localStorage.setItem('turnkey', res);
          const user = await auth();
          if (user) {
            userStore.setCurrent(user.data);

            await setData();
            goto('/');
          }
        })
        .catch(e => {
          console.log('error', e);
          alert(e);
        });
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
        value={username}
        icon="user"
        on:input={e => (username = e.target.value.toLowerCase())}
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
        on:click|preventDefault={() => handleLogin({ username, password })}
      >
        <Button primary fill large disabled={isDisabled}>Sign In</Button>
      </div>

      <!-- <div>Error: </div> -->
    </form>
  </div>
</section>

<style src="./SignIn.scss">
</style>
