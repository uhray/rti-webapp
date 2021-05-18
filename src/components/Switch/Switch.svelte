<script>
  export let handleSwitch;
  export let checked;
  export let disabled = undefined;
</script>

<style src="./Switch.scss">

</style>

<label
  class="uk-switch"
  for="default-1"
  on:change={() => {
    handleSwitch(!checked);
  }}>
  <input
    type="checkbox"
    id="default-1"
    {checked}
    disabled={disabled === 'true' ? true : false} />
  <div class="uk-switch-slider" {disabled} />
</label>
