<script>
  import { goto } from '@sapper/app';
  import Input from '../../input/Input.svelte';
  import Checkbox from '../../checkbox/Checkbox.svelte';
  import Button from '../../button/Button.svelte';
  import {
    userLogin,
    auth,
    getPosts,
    getContacts,
    getOrders,
    getTrucks,
  } from '../../../tools/crudApi';
  import {
    userStore,
    postsStore,
    repliesStore,
    contactsStore,
    ordersStore,
    trucksStore,
  } from '../../../store';
  import {
    isEmpty,
    validEmail,
    validPass,
    formValid,
  } from '../../form-helpers/validation';
  import Card from '../../card/Card.svelte';

  let username = '';
  let password = '';
  let isDisabled = true;

  $: usernameValid = !isEmpty(username);
  $: passValid = validPass(password);
  $: isDisabled = formValid(usernameValid, passValid);

  const handleLogin = async data => {
    if (!isDisabled) {
      const response = await userLogin(data);
      if (!response.error) {
        await localStorage.setItem('turnkey', response);
        const user = await auth();
        if (user) {
          userStore.setCurrent(user);

          const p = await getPosts({ allMessages: true });
          const c = await getContacts();
          const o = await getOrders();
          const t = await getTrucks();
          const r = p.map(post => {
            return { id: post._id, display: false };
          });

          postsStore.setPosts(p);
          repliesStore.setReplies(r);
          contactsStore.setContacts(c);
          ordersStore.setOrders(o);
          trucksStore.setTrucks(t);
          goto('/');
        }
      }
    }
  };
</script>

<style src="./SignIn.scss">

</style>

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
        on:input={e => (username = e.target.value.toLowerCase())} />
      <br />
      <span class="SignInForm-inputLabel">Password</span>
      <Input
        fill
        placeholder=""
        value={password}
        type="password"
        on:input={e => (password = e.target.value)} />
      <div class="uk-flex">
        <div class="uk-flex SignInForm-subGroup">
          <Checkbox secondary />
          <span class="SignInForm-subLabel">Stay signed in?</span>
        </div>
        <a href="home" class="SignInForm-forgotText">Forgot Password?</a>
      </div>
      <div
        class="SignInForm-button"
        on:click|preventDefault={() => handleLogin({ username, password })}>
        <Button primary fill large disabled={isDisabled}>Sign In</Button>
      </div>
    </form>
  </div>
</section>
