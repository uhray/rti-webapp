<script context="module">
  export const preload = page => {
    {
      const { usertype } = page.params;
      return { usertype };
    }
  };
</script>

<script>
  import { onMount } from 'svelte';
  import Header from './Header.svelte';
  export let usertype;
  onMount(() => {
    console.log(usertype);
  });
</script>

<div>
  <Header {usertype} />
</div>
