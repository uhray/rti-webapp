<script>
  import Error from '../error/Error.svelte';
  import Icon from '../icon/Icon.svelte';

  export let isValid = undefined;
  export let icon = undefined;
  export let type = undefined;
  export let rows = undefined;
  export let placeholder = undefined;
  export let label = undefined;
</script>

<!-- HTML -->
<section class="Input">
  {#if type === 'input-inactive'}
    {#if isValid}
      <div class="uk-inline uk-width-1-1">
        <input class="uk-input Input-inactive" type="text" {placeholder} />
        <span class="uk-form-icon uk-form-icon-flip">
          <Icon type={icon} />
        </span>
      </div>
    {:else}
      <div class="uk-inline uk-width-1-1">
        <input
          class="uk-input Input-notValid"
          type="text"
          placeholder="Placeholder Text"
        />
        <span class="uk-form-icon uk-form-icon-flip">
          <Icon type="close-red" />
        </span>
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
        <span class="uk-form-icon uk-form-icon-flip">
          <Icon type="rocket" />
        </span>
      </div>
    {:else}
      <div class="uk-inline uk-width-1-1">
        <input
          class="uk-input Input-notValid"
          type="text"
          placeholder="Placeholder Text"
        />
        <span class="uk-form-icon uk-form-icon-flip">
          <Icon type="close-red" />
        </span>
      </div>
      <Error type="default-error" text="Something is wrong" />
    {/if}
  {/if}
  {#if type === 'input-active-outlined'}
    {#if isValid}
      {#if label}
        <label>{label}</label>
      {/if}
      <div class="uk-inline uk-width-1-1">
        <input
          class="uk-input Input-activeOutlined"
          type="text"
          placeholder="Placeholder Text"
        />
        <span class="uk-form-icon uk-form-icon-flip">
          <Icon type="rocket" />
        </span>
      </div>
    {:else}
      <div class="uk-inline uk-width-1-1">
        <input
          class="uk-input Input-notValid"
          type="text"
          placeholder="Placeholder Text"
        />
        <span class="uk-form-icon uk-form-icon-flip">
          <Icon type="close-red" />
        </span>
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
</section>

<style src="./Input.scss">
</style>
