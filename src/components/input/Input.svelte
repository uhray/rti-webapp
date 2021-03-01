<script>
  import Error from '../error/Error.svelte';
  import Icon from '../icon/Icon.svelte';

  export let isValid;
  export let type;
  export let rows;
  export let placeholder;
</script>

<!-- HTML -->
<section class="Input">
  {#if type === 'input'}
    {#if isValid}
      <div class="uk-inline uk-width-1-1">
        <input
          class="uk-input Input-default"
          type="text"
          placeholder="Placeholder Text"
        />
        <span class="uk-form-icon uk-form-icon-flip"
          ><Icon type="rocket" /></span
        >
      </div>
    {:else}
      <div class="uk-inline uk-width-1-1">
        <input
          class="uk-input Input-notValid"
          type="text"
          placeholder="Placeholder Text"
        />
        <span class="uk-form-icon uk-form-icon-flip"
          ><Icon type="close-red" /></span
        >
      </div>
      <Error type="default-error" text="Something is wrong" />
    {/if}
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
