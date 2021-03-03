<script>
  export let type = undefined;
</script>

<!-- HTML -->
<section class="Divider">
  {#if type === 'default'}
    <div class="Divider-default" />
  {/if}
</section>

<!-- ==== -->
<style src="./Divider.scss">
</style>
