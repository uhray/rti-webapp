<script>
  export let message = undefined;

  let div;

  $: {
    if (div) {
      div.innerHTML = message;
    }
  }
</script>

<style src="./Post.scss">

</style>

<!-- HTML -->
<div bind:this={div} class="Post">{message}</div>
