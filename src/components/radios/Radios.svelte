<script>
  // javascript //
  export let options = undefined;
</script>

<style src="./Radios.scss">

</style>

<!-- HTML -->
<section class="RadioGroup">
  <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
    {#each options as option}
      <label>
        <input class="uk-radio" type="radio" name={`radio1`} />
        <span class="RadioGroup-spanLabels" />
      </label>
    {/each}
  </div>
</section>
