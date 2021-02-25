<!-- Script -->
<script>
  import Icon from '../icon/Icon.svelte';

  export let type;
  export let text;
</script>

<!-- HTML HERE -->
<section class="Error">
  {#if type === 'validation-error'}
    <div class="uk-flex uk-width-small">
      <Icon type="warning" />
      <p class="Error-validationText">Invalid {text}</p>
    </div>
  {/if}
</section>
<!-- ========= -->

<!-- Style -->
<style src="./Error.scss"></style>
