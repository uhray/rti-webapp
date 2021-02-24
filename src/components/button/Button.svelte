<script>
  export let disabled;
  export let primary;
  export let secondary;
</script>

<style src="./Button.scss">

</style>

<!-- HTML -->
<button class="uk-button" {primary} {secondary} {disabled}>
  <slot />
</button>

<!-- ==== -->
