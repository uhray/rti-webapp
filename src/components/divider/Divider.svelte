<script>
  import Icon from '../icon/Icon.svelte';
</script>

<!-- HTML -->
<section class="Divider">
  {#if $$props.type === 'default'}
    <div class="Divider-default" />
  {/if}
</section>

<!-- ==== -->
<style src="./Divider.scss">
</style>
