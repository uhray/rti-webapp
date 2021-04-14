<script>
  import { goto } from '@sapper/app';
  import Input from '../../input/Input.svelte';
  import Button from '../../button/Button.svelte';
  import {
    isEmpty,
    validEmail,
    validPass,
    passMatch,
    formValid,
  } from '../../form-helpers/validation';

  import { userSignup } from '../../../tools/crudApi';

  let firstName = '';
  let lastName = '';
  let email = '';
  let username = '';
  let password = '';
  let confirmPass = '';

  $: firstNameValid = !isEmpty(firstName);
  $: lastNameValid = !isEmpty(lastName);
  $: emailValid = validEmail(email);
  $: usernameValid = !isEmpty(username);
  $: passValid = validPass(password);
  $: confirmPassword = passMatch(password, confirmPass);
  $: isDisabled = formValid(
    firstNameValid,
    lastNameValid,
    emailValid,
    usernameValid,
    passValid,
    confirmPassword
  );

  const handleSignup = async data => {
    try {
      const response = await userSignup(data);
      if (!response.error) {
        goto('/signin');
      }
    } catch (err) {
      console.log('my error', err);
    }
  };
</script>

<section class="SignUpForm">
  <div class="SignUpForm-formContainer">
    <form class="SignUpForm-form">
      <h3 class="SignUpForm-formHeader">Create an account</h3>
      <p class="SignUpForm-formSubHeader">
        Welcome to RTI! Create your account below.
        <br />
        Already have an account?
        <a href="signin">Log In</a>
      </p>
      <span class="SignUpForm-inputLabel">First Name</span>
      <Input fill placeholder="" on:input={e => (firstName = e.target.value)} />
      <br />
      <span class="SignUpForm-inputLabel">Last Name</span>
      <Input fill placeholder="" on:input={e => (lastName = e.target.value)} />
      <br />
      <span class="SignUpForm-inputLabel">Email</span>
      <Input fill placeholder="" on:input={e => (email = e.target.value)} />
      <br />
      <span class="SignUpForm-inputLabel">User ID</span>
      <Input fill placeholder="" on:input={e => (username = e.target.value)} />
      <br />
      <span class="SignUpForm-inputLabel">Password</span>
      <Input
        fill
        placeholder=""
        type="password"
        on:input={e => (password = e.target.value)}
      />
      <br />
      <span class="SignUpForm-inputLabel">Confirm Password</span>
      <Input
        fill
        placeholder=""
        type="password"
        on:input={e => (confirmPass = e.target.value)}
      />
      <br />
      <div
        class="SignUpForm-button"
        on:click|preventDefault={() =>
          handleSignup({
            email,
            username,
            password,
            contactInfo: { firstName, lastName },
          })}
      >
        <Button primary fill large disabled={isDisabled}>Create Account</Button>
      </div>
    </form>
  </div>
</section>

<style src="./SignUp.scss">
</style>
