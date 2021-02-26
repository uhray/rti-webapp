<script lang="ts">
  import Nav from '../components/nav/Nav.svelte';

  export let segment: string;
</script>

<style lang="scss">
  .wrapper {
    min-height: 100vh;

    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
  }

  main {
    width: 100%;
    background-color: white;
    padding: 2em;
    box-sizing: border-box;
  }
</style>

<div class="wrapper">

  <Nav {segment} />

  <main>
    <slot />
  </main>
</div>
