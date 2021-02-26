<script>
  import Icon from '../icon/Icon.svelte';
  export let type;
  export let options;
  export let rows;
  export let placeholder;
</script>

<!-- HTML -->
<section class="Input">
  {#if type === 'default'}
    <input
      class="uk-input Input-default"
      type="text"
      placeholder="Placeholder Text"
    />
    <!-- TODO: Get the Rocket Icon inside the input, and the far right of the input -->
    <!-- This will be a common theme among the inputs -->
  {/if}
</section>

<!-- {#if type === 'selector'}
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
  {/if} -->

<!-- ==== -->
<style src="./Input.scss">
</style>
