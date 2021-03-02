<script>
  export let fill;
  export let disabled;
  export let primary;
  export let secondary;
  export let warning;
  export let success;
  export let outline;
  export let large;
</script>

<style src="./Button.scss">

</style>

<!-- HTML -->
<button
  class={fill ? 'uk-button uk-width-1-1' : ''}
  {primary}
  {secondary}
  {warning}
  {success}
  {disabled}
  {outline}
  {large}>
  <slot />
</button>
<!-- ==== -->
