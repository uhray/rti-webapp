<script>
  export let disabled;
  export let primary;
  export let secondary;
  export let outline;
  export let large;
</script>

<style src="./Button.scss">

</style>

<!-- HTML -->
<button class="uk-button" {primary} {secondary} {disabled} {outline} {large}>
  <slot />
</button>

<!-- ==== -->
