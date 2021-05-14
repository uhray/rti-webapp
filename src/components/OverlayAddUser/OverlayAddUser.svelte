<script>
  import Button from '../button/Button.svelte';
  import Input from '../input/Input.svelte';
  import _ from 'lodash';

  export let clearOverlayData = () => {};
  export let send = () => {};
  export let addUserType = undefined;
  export let sendConfirmation;
  export let overlayError;

  let user = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    teamId: '',
    role: addUserType,
  };
  let validators = {
    firstName: null,
    lastName: null,
    email: null,
    username: null,
    password: null,
    teamId: null,
  };
  let errorCodes = { 0: 'Username already exists', 1: 'Invalid password' };

  $: {
    if (overlayError === 0) {
      validators.username = errorCodes[0];
    } else if (overlayError === 1) {
      validators.password = errorCodes[1];
    }

    console.log(overlayError);
  }

  let inputCheck = false;

  function isValid() {
    if (user.firstName.length <= 0) {
      validators.firstName = 'First name is required';
    }
    if (user.lastName.length <= 0) {
      validators.lastName = 'Last name is required';
    }
    if (user.email.length <= 0) {
      validators.email = 'Email is required';
    }
    if (user.username.length <= 0) {
      validators.username = 'Username is required';
    }
    if (user.password.length <= 0) {
      validators.password = 'Password is required';
    }
    if (overlayError == errorCodes[0]) {
      validators.username = overlayError;
    }

    console.log(
      'validating',
      Object.values(validators),
      Object.values(validators).some(v => v)
    );
    if (Object.values(validators).some(v => v)) {
      return false;
    } else {
      return true;
    }
  }

  function handleInput(e) {
    console.log('e', e);
    user[e.target.name] = e.target.value;
    validators[e.target.name] = null;
    overlayError = null;
  }
</script>

<style src="./OverlayAddUser.scss">

</style>

<div class="Overlay">

  <div class="Overlay-container">
    {#if sendConfirmation}
      <div
        class="Overlay-close clickable"
        on:click={() => {
          clearOverlayData();
        }}>
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.78906 6.5L11.8125 2.51562L12.6328 1.69531C12.75 1.57812 12.75
            1.38281 12.6328 1.22656L11.7734 0.367188C11.6172 0.25 11.4219 0.25
            11.3047 0.367188L6.5 5.21094L1.65625 0.367188C1.53906 0.25 1.34375
            0.25 1.1875 0.367188L0.328125 1.22656C0.210938 1.38281 0.210938
            1.57812 0.328125 1.69531L5.17188 6.5L0.328125 11.3438C0.210938
            11.4609 0.210938 11.6562 0.328125 11.8125L1.1875 12.6719C1.34375
            12.7891 1.53906 12.7891 1.65625 12.6719L6.5 7.82812L10.4844
            11.8516L11.3047 12.6719C11.4219 12.7891 11.6172 12.7891 11.7734
            12.6719L12.6328 11.8125C12.75 11.6562 12.75 11.4609 12.6328
            11.3438L7.78906 6.5Z"
            fill="#A6ADC4" />
        </svg>
      </div>
      <div class="Overlay-title">Confirmation</div>

      <div class="Overlay-message">Message was sent successfully.</div>

      <div class=" Overlay-buttons">
        <div
          class="Overlay-button"
          on:click={() => {
            clearOverlayData();
          }}>
          <Button primary>Got it</Button>
        </div>

      </div>
    {:else}
      <div
        class="Overlay-close clickable"
        on:click={() => {
          clearOverlayData();
        }}>
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.78906 6.5L11.8125 2.51562L12.6328 1.69531C12.75 1.57812 12.75
            1.38281 12.6328 1.22656L11.7734 0.367188C11.6172 0.25 11.4219 0.25
            11.3047 0.367188L6.5 5.21094L1.65625 0.367188C1.53906 0.25 1.34375
            0.25 1.1875 0.367188L0.328125 1.22656C0.210938 1.38281 0.210938
            1.57812 0.328125 1.69531L5.17188 6.5L0.328125 11.3438C0.210938
            11.4609 0.210938 11.6562 0.328125 11.8125L1.1875 12.6719C1.34375
            12.7891 1.53906 12.7891 1.65625 12.6719L6.5 7.82812L10.4844
            11.8516L11.3047 12.6719C11.4219 12.7891 11.6172 12.7891 11.7734
            12.6719L12.6328 11.8125C12.75 11.6562 12.75 11.4609 12.6328
            11.3438L7.78906 6.5Z"
            fill="#A6ADC4" />
        </svg>
      </div>
      <div class="Overlay-title">
        Add New {addUserType === 'MANAGER' ? 'Manager' : 'Admin'}
      </div>
      <div class="Overlay-message" />

      <div class="Overlay-form">

        <div class="Overlay-input">
          <div class="uk-flex uk-width-1-1">
            <div class="uk-width-1-2">
              <span class="Overlay-inputLabel">First Name</span>
              <Input
                fill
                name="firstName"
                onChange={handleInput}
                error={validators.firstName}
                invalid={inputCheck && validators.firstName} />
            </div>
            <div class="Overlay-spacer" />
            <div class="uk-width-1-2">
              <span class="Overlay-inputLabel">Last Name</span>
              <Input
                fill
                name="lastName"
                onChange={handleInput}
                error={validators.lastName}
                invalid={inputCheck && validators.lastName} />
            </div>
          </div>
        </div>

        <div class="Overlay-input">
          <span class="Overlay-inputLabel">Email</span>
          <Input
            fill
            name="email"
            onChange={handleInput}
            error={validators.email}
            invalid={inputCheck && validators.email} />
        </div>
        <div class="Overlay-input">
          <span class="Overlay-inputLabel">Username</span>
          <Input
            fill
            name="username"
            onChange={handleInput}
            error={validators.username}
            invalid={inputCheck && validators.username} />
        </div>
        <div class="Overlay-input">
          <span class="Overlay-inputLabel">Password</span>
          <Input
            fill
            name="password"
            onChange={handleInput}
            error={validators.password}
            invalid={inputCheck && validators.password} />
        </div>
        {#if addUserType === 'MANAGER'}
          <div class="Overlay-input">
            <span class="Overlay-inputLabel">Driver Manager Number</span>
            <span class="Overlay-inputLabelSub">(Optional)</span>
            <Input fill name="teamId" onChange={handleInput} />
          </div>
        {/if}

        <!-- <span class="Overlay-inputLabel Overlay-error">
          {overlayError ? overlayError : ''}
        </span>
        <br /> -->
        <br />

        <div class=" Overlay-buttons">
          <div
            class="Overlay-button"
            on:click={() => {
              clearOverlayData();
            }}>
            <Button primary outline>Cancel</Button>
          </div>

          <div
            on:click={() => {
              console.log('Send clicked');
              inputCheck = true;
              if (isValid()) {
                console.log('sending');
                send(user);
              }
            }}>
            <Button primary>Send Invite</Button>
          </div>
        </div>

      </div>
    {/if}
  </div>

</div>
