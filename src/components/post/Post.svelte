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
<div bind:this={div}>{message}</div>
