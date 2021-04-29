<script lang="ts">
  import { onMount } from 'svelte';
  import Nav from '../components/nav/Nav.svelte';
  import TopNav from '../components/topnav/TopNav.svelte';
  import { userStore, postsStore, contactsStore, ordersStore } from '../store';
  import { auth, getPosts, getContacts, getOrders } from '../tools/crudApi';

  export let segment: string;
  let loading = true;

  onMount(async () => {
    console.log('setting user');
    const user = await auth();
    if (user) {
      userStore.setCurrent(user);

      const p = await getPosts({ allMessages: true });
      const c = await getContacts();
      const o = await getOrders();

      postsStore.setPosts(p);
      contactsStore.setContacts(c);
      ordersStore.setOrders(o);
    } else {
      segment = 'signin';
    }
    console.log('done setting user');
    loading = false;
  });
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
    width: 100%;
    height: 100%;
    background-color: white;
    box-sizing: border-box;
  }
  .main-content {
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
      <TopNav user={$userStore} />
      <div class="main-content">
        {#if loading}
          <div uk-spinner />
        {:else}
          <slot />
        {/if}
      </div>
    </main>
  </div>
{/if}
