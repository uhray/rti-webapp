<script>
  export let disabled = undefined;
  export let primary = undefined;
  export let secondary = undefined;
</script>

<style src="./Checkbox.scss">

</style>

<!-- HTML -->
<input
  on:click
  class="uk-checkbox"
  type="checkbox"
  {primary}
  {secondary}
  {disabled} />

<!-- ==== -->
