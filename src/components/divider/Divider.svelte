<script>
  import Icon from '../icon/Icon.svelte';
</script>

<!-- HTML -->
<section class="Divider">
  {#if $$props.type === 'default'}
    <div class="Divider-default" />
  {/if}
  {#if $$props.type === 'for-tabs'}
    <div class="Divider-forTabs" />
  {/if}
</section>

<!-- ==== -->
<style src="./Divider.scss">
</style>
