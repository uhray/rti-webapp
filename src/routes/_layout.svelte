<script lang="ts">
  import { onMount } from 'svelte';
  import Nav from '../components/nav/Nav.svelte';
  import TopNav from '../components/topnav/TopNav.svelte';
  import { userStore } from '../store';
  import { auth } from '../tools/crudApi';

  export let segment: string;

  onMount(async () => {
    const user = await auth();
    if(user){
      userStore.setCurrent(user);
    }else{
      segment = 'signin';
    }
  });

</script>

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
        <slot />
      </div>
    </main>
  </div>
{/if}

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
