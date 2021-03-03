<script>
  export let fill = undefined;
  export let disabled = undefined;
  export let primary = undefined;
  export let secondary = undefined;
  export let warning = undefined;
  export let success = undefined;
  export let outline = undefined;
  export let large = undefined;
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
</button>

<!-- ==== -->
<style src="./Button.scss">
</style>
