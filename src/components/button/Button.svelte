<script>
  import Icon from '../icon/Icon.svelte';
  export let fill;
  export let disabled;
  export let primary;
  export let secondary;
  export let warning;
  export let success;
  export let outline;
  export let large;
  export let icon;
</script>

<!-- HTML -->
<button
  class={fill ? 'uk-button uk-width-1-1' : 'uk-button'}
  {primary}
  {secondary}
  {warning}
  {success}
  {disabled}
  {outline}
  {large}
>
  <slot />
  {#if icon}<Icon type={icon} />{/if}
</button>

<!-- ==== -->
<style src="./Button.scss">
</style>
