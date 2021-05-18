<script>
  export let handleSwitch;
  export let checked;
</script>

<style src="./Switch.scss">

</style>

<label
  class="uk-switch"
  for="default-1"
  on:change={() => {
    handleSwitch(!checked);
  }}>
  <input type="checkbox" id="default-1" {checked} />
  <div class="uk-switch-slider" />
</label>
