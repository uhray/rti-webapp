<script>
  import Icon from '../icon/Icon.svelte';
  export let type;
  export let options;
  export let rows;
  export let placeholder;
</script>

<!-- HTML -->
<section class="Input">
  {#if type === 'input'}
    <input
      class="uk-input Input-default"
      type="text"
      placeholder="Placeholder Text"
    />
    <span class="uk-form-icon" uk-icon="icon: rocket" />
    <!-- TODO: Get the Rocket Icon inside the input, and the far right of the input -->
    <!-- You can add new icons to uikit by placing them in /custom/icons -->
    <!-- You can then call it named as the file like above span -->
    <!-- But we need to get off the cdn and starting using our own actual uikit from the package for this to work -->
    <!-- This will be a common theme among the inputs -->
  {/if}
  {#if type === 'textarea-plain'}
    <div class="uk-margin">
      <textarea class="uk-textarea Input-textarea" {rows} {placeholder} />
    </div>
  {/if}
  {#if type === 'textarea-full'}
    <!-- TODO: Talk with Matt on what we're going to do with the rich text editor -->
    <!-- using a plugin, or building from scratch -->
  {/if}
</section>

<style src="./Input.scss">
</style>
