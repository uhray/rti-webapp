<script>
  export let message = undefined;

  let div;

  $: {
    if (div) {
      div.innerHTML = message;
    }
  }
</script>

<!-- HTML -->
<div bind:this={div} class="Post">{message}</div>

<style src="./PostContent.scss">
</style>
