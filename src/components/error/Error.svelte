<!-- Script -->
<script>
  export let type;
  export let text;
</script>

<!-- HTML HERE -->
<section class="Error">
  {#if type === 'email-validation-error'}
    <div class="uk-flex">
      <p class="Error-validationText">Please enter a valid email address</p>
    </div>
  {/if}
  {#if type === 'password-validation-error'}
    <div class="uk-flex">
      <p class="Error-validationText">Please enter a correct password</p>
    </div>
  {/if}
  {#if type === 'default-error'}
    <div class="uk-flex">
      <p class="Error-validationText">{text}</p>
    </div>
  {/if}
</section>
<!-- ========= -->

<!-- Style -->
<style src="./Error.scss"></style>
