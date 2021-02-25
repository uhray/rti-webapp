<script lang="ts">
  import Nav from '../components/nav/Nav.svelte';

  export let segment: string;
</script>

<Nav {segment} />

<main>
  <slot />
</main>

<style lang="scss">
  main {
    position: relative;
    max-width: 80em;
    background-color: white;
    padding: 2em;
    margin-top: 0;
    margin-bottom: 0;
    margin-right: 20px;
    margin-left: auto;
    box-sizing: border-box;
    @media only screen and (max-width: 1200px) {
      width: 50em;
    }
  }
</style>
