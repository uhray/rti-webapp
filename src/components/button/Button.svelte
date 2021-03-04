<script>
  import Icon from '../icon/Icon.svelte';
  export let fill = undefined;
  export let disabled = undefined;
  export let primary = undefined;
  export let secondary = undefined;
  export let warning = undefined;
  export let success = undefined;
  export let outline = undefined;
  export let large = undefined;
  export let icon = undefined;
  export let height = undefined;
</script>

<style src="./Button.scss">

</style>

<!-- HTML -->
<button
  class={fill ? 'uk-button uk-width-1-1' : 'uk-button'}
  style={`${height && `height: ${height}`}`}
  {primary}
  {secondary}
  {warning}
  {success}
  {disabled}
  {outline}
  {large}>
  <slot />
  {#if icon}
    <Icon type={icon} />
  {/if}
</button>

<!-- ==== -->
