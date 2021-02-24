<script>
  // javascript //
  export let options;
</script>

<!-- HTML -->
<section class="RadioGroup">
  <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
    {#each options as option}
      <label
        ><input class="uk-radio" type="radio" name={`radio1`} /><span
          class="RadioGroup-spanLabels">{option}</span
        ></label
      >
    {/each}
  </div>
</section>

<style src="./Radios.scss">
</style>
