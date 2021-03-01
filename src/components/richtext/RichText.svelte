<script>
  import { onMount } from 'svelte';

  // ========================= Quill.js Config ================== //
  let quill;
  let htmlContent;
  let content;

  onMount(async () => {
    //   import Quill after mount so that document object is defined
    const { default: Quill } = await import('quill');

    quill = new Quill('#editor', {
      theme: 'snow',
    });
  });
  const updateContent = () => {
    content = quill.getText();
    htmlContent = quill.root.innerHTML;
  };
  // =========================================================== //
</script>

<!-- HTML -->
<section class="RichText">
  <div id="editor" on:keyup={updateContent} />

  <br />
  Resulting HTML: {@html htmlContent}
</section>

<style src="./RichText.scss">
</style>
