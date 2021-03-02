<script>
  export let fillWidth;
  export let disabled;
  export let primary;
  export let secondary;
  export let warning;
  export let success;
  export let outline;
  export let large;
</script>

<!-- HTML -->
{#if fillWidth}
  <button
    class="uk-button uk-width-1-1"
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
{:else}
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
{/if}

<!-- ==== -->
<style src="./Button.scss">
</style>
