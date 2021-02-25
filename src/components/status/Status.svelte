<script>
  import Icon from '../icon/Icon.svelte';

  export let type;
  export let text;
  export let icon;
</script>

<!-- HTML -->
<section class="Status">
  {#if type === 'success'}
    <div class="uk-flex">
      <span><Icon type="success-status" /></span><span
        class="Status-successText">{text}</span
      >
    </div>
  {/if}
  {#if type === 'caution'}
    <div class="uk-flex">
      <span class="Status-successIcon"><Icon type="caution-status" /></span
      ><span class="Status-cautionText">{text}</span>
    </div>
  {/if}
  {#if type === 'warning'}
    <div class="uk-flex">
      <span class="Status-successIcon"><Icon type="warning-status" /></span
      ><span class="Status-warningText">{text}</span>
    </div>
  {/if}
  {#if type === 'default'}
    <div class="uk-flex">
      <span class="Status-successIcon"><Icon type="default-status" /></span
      ><span class="Status-defaultText">{text}</span>
    </div>
  {/if}
</section>

<!-- ==== -->
<style src="./Status.scss">
</style>
