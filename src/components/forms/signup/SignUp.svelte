<script>
  import Input from '../../input/Input.svelte';
  import Button from '../../button/Button.svelte';
</script>

<section class="SignUpForm">
  <div class="SignUpForm-formContainer">
    <form class="SignUpForm-form">
      <h3 class="SignUpForm-formHeader">Create an account</h3>
      <p class="SignUpForm-formSubHeader">
        Welcome to RTI, Create your account below <br />Already have an account?
        <a href="signin">Log In</a>
      </p>
      <span class="SignUpForm-inputLabel">Full Name</span>
      <Input type="input-inactive" isValid placeholder="" />
      <br />
      <span class="SignUpForm-inputLabel">User ID</span>
      <Input type="input-inactive" isValid placeholder="" />
      <br />
      <span class="SignUpForm-inputLabel">Password</span>
      <Input type="input-inactive" isValid placeholder="" icon="hide" />
      <br />
      <span class="SignUpForm-inputLabel">Confirm Password</span>
      <Input type="input-inactive" isValid placeholder="" icon="hide" />
      <br />
      <div class="SignUpForm-button">
        <Button primary fill large>Sign In</Button>
      </div>
    </form>
  </div>
</section>

<style src="./SignUp.scss"></style>
