<script lang="ts">
  import { onMount } from 'svelte';
  import Nav from '../components/nav/Nav.svelte';
  import TopNav from '../components/topnav/TopNav.svelte';
  import {
    userStore,
    postsStore,
    contactsStore,
    ordersStore,
    trucksStore,
  } from '../store';
  import {
    auth,
    getPosts,
    getContacts,
    getOrders,
    getTrucks,
    editUser,
  } from '../tools/crudApi';
  import moment from 'moment';

  export let segment: string;
  let loading = true;
  let user = undefined;

  onMount(async () => {
    user = await auth();

    if (user) {
      userStore.setCurrent(user);

      const p = await getPosts({ allMessages: true });
      const c = await getContacts();
      const o = await getOrders();
      const t = await getTrucks();

      postsStore.setPosts(p);
      contactsStore.setContacts(c);
      ordersStore.setOrders(o);
      trucksStore.setTrucks(t);
    } else {
      segment = 'signin';
    }
    loading = false;
  });

  $: {
    if ($userStore && $userStore.user) {
      const user = $userStore.user;
      localStorage.setItem('lastLogin', moment().toISOString());

      const lsLastLogin = localStorage.getItem('lastLogin');
      const dbLastLogin = user.lastLogin;

      if (
        lsLastLogin &&
        dbLastLogin &&
        moment(dbLastLogin).isSame(lsLastLogin, 'minute')
      ) {
      } else {
        const newUser = user;
        newUser.lastLogin = moment().toString();

        editUser(user._id, newUser).then(res => {
          userStore.setCurrent(res);
        });
      }
    }
  }
</script>

<style lang="scss" global>
  @import '../theme/theme.scss';

  .wrapper {
    min-height: 100vh;

    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .wrapper-forSignin {
    min-height: 100vh;

    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
  }

  main {
    position: relative;
    width: 100%;
    min-height: 100vh;
    height: inherit;
    background-color: white;
    box-sizing: border-box;

    .loader {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .main-content {
    height: 100%;
    // padding: 2em;
  }
</style>

{#if segment === 'signin' || segment === 'signup'}
  <div class="wrapper-forSignin">
    <main>
      <slot />
    </main>
  </div>
{:else}
  <div class="wrapper">
    <Nav {segment} />
    <main>
      {#if loading}
        <div class="loader">
          <div uk-spinner="ratio: 2" />
        </div>
      {:else}
        <TopNav user={$userStore} />
        <div class="main-content">

          <slot />

        </div>
      {/if}
    </main>
  </div>
{/if}
