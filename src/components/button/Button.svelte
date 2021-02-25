<script>
  export let disabled;
  export let primary;
  export let secondary;
  export let warning;
  export let success;
  export let outline;
  export let large;
</script>

<!-- HTML -->
<button
  class="uk-button"
  {primary}
  {secondary}
  {warning}
  {success}
  {disabled}
  {outline}
  {large}
>
  <slot />
</button>

<!-- ==== -->
<style src="./Button.scss">
</style>
