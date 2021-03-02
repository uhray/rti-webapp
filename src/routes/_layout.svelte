<script lang="ts">
  import Nav from '../components/nav/Nav.svelte';
  import HeadSection from '../components/headsection/HeadSection.svelte';

  export let segment: string;
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
    padding: 2em;
    box-sizing: border-box;
  }
</style>

{#if segment === 'signin'}
  <div class="wrapper-forSignin">
    <main>
      <slot />
    </main>
  </div>
{:else}
  <div class="wrapper">
    <Nav {segment} />
    <main>
    <HeadSection segment={segment} />
      <slot />
    </main>
  </div>
{/if}
