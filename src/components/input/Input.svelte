<script>
  import Error from '../error/Error.svelte';
  import Icon from '../icon/Icon.svelte';
  import { onMount } from 'svelte';

  // ========================= Quill.js Config ================== //
  // onMount(async () => {
  //   const { quill } = await import('svelte-quill');

  //   let options = {
  //     modules: {
  //       toolbar: [
  //         [{ header: [1, 2, 3, false] }],
  //         ['bold', 'italic', 'underline', 'strike'],
  //         ['link', 'code-block'],
  //       ],
  //     },
  //     placeholder: 'Type something...',
  //     theme: 'snow',
  //   };
  // });
  // let content = { html: '', text: '' };
  // =========================================================== //

  export let isValid;
  export let type;
  export let rows;
  export let placeholder;
</script>

<!-- HTML -->
<section class="Input">
  {#if type === 'input-inactive'}
    {#if isValid}
      <div class="uk-inline uk-width-1-1">
        <input
          class="uk-input Input-inactive"
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
  {#if type === 'input-active-filled'}
    {#if isValid}
      <div class="uk-inline uk-width-1-1">
        <input
          class="uk-input Input-activeFilled"
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
  {#if type === 'input-active-outlined'}
    {#if isValid}
      <div class="uk-inline uk-width-1-1">
        <input
          class="uk-input Input-activeOutlined"
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
  {#if type === 'textarea-plain-active'}
    <div class="uk-margin">
      <textarea class="uk-textarea Input-textareaActive" {rows} {placeholder} />
    </div>
  {/if}
  {#if type === 'textarea-plain-inactive'}
    <div class="uk-margin">
      <textarea
        class="uk-textarea Input-textareaInactive"
        {rows}
        {placeholder}
      />
    </div>
  {/if}
  <!-- {#if type === 'textarea-full-inactive'}
    <div class="uk-margin">
      <textarea
        class="uk-textarea Input-textareaInactive"
        {rows}
        {placeholder}
      />
    </div>
  {/if}
  {#if type === 'textarea-full-active'}
    <div class="uk-margin">
      <textarea class="uk-textarea Input-textareaActive" {rows} {placeholder} />
    </div>
  {/if} -->
  <!-- {#if type === 'testing-quill'}
    <div
      class="editor"
      use:quill={options}
      on:text-change={e => (content = e.detail)}
    />

    <br />
    Resulting HTML:

    {@html content.html}
  {/if} -->
</section>

<style src="./Input.scss">
</style>
