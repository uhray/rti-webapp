<script>
  import { onMount } from 'svelte';

  // ========================= Quill.js Config ================== //
  let quill;

  onMount(async () => {
    const { quill } = await import('svelte-quill');
    quill = quill;
  });

  let options = {
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['link', 'code-block'],
      ],
    },
    placeholder: 'Type something...',
    theme: 'snow',
  };
  let content = { html: '', text: '' };
  // =========================================================== //
</script>

<!-- HTML -->
<section class="RichText">
  <!-- {#if type === 'textarea-full-inactive'}
    <div class="uk-margin">
      <textarea
        class="uk-textarea RichText-textareaInactive"
        {rows}
        {placeholder}
      />
    </div>
  {/if}
  {#if type === 'textarea-full-active'}
    <div class="uk-margin">
      <textarea class="uk-textarea RichText-textareaActive" {rows} {placeholder} />
    </div>
  {/if} -->

  <div
    class="editor"
    use:quill={options}
    on:text-change={e => (content = e.detail)}
  />

  <br />
  Resulting HTML:

  {@html content.html}
</section>

<style src="./RichText.scss">
</style>
