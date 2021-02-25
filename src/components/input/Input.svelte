<script>
  export let type;
  export let options;
  export let rows;
  export let placeholder;
</script>

<!-- HTML -->
<section class="Input">
  {#if type === 'default'}
    <input class="uk-input Input-default" />
  {/if}
  {#if type === 'selector'}
    <select class="uk-select Input-selector">
      {#each options as option}
        <option>{option}</option>
      {/each}
    </select>
  {/if}
  {#if type === 'textarea'}
    <div class="uk-margin">
      <textarea class="uk-textarea Input-textarea" {rows} {placeholder} />
    </div>
  {/if}
</section>

<!-- ==== -->
<style src="./Input.scss">
</style>
