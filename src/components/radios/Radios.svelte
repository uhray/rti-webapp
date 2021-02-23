<script>
  // javascript //
  const optionsArray = $$props.numOfOpts;
</script>

<!-- HTML -->
<section class="RadioGroup">
  <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
    {#each optionsArray as option, index}
      <label
        ><input class="uk-radio" type="radio" name={`radio1`} />{option}</label
      >
    {/each}
  </div>
</section>

<style src="./Radios.scss">
</style>
