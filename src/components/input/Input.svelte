<script>
  import Error from '../error/Error.svelte';
  import Icon from '../icon/Icon.svelte';
  import { colors } from '../../theme/variables';

  export let fill = undefined;
  export let icon = undefined;
  export let active = false;
  export let invalid = false;
  export let error = 'Error';
  export let label = undefined;
  export let placeholder = undefined;
  export let onInput;

  let isFocused = false;
  const onFocus = () => {
    isFocused = true;
  };
  const onBlur = () => {
    isFocused = false;
  };
</script>

<style src="./Input.scss">

</style>

<!-- HTML -->
<div>
  {#if label}
    <label>{label}</label>
    <br />
  {/if}
  <div class={`Input uk-inline ${fill && 'uk-width-1-1'}`} {invalid}>
    <input
      class="uk-input"
      type="text"
      {placeholder}
      {active}
      {invalid}
      {isFocused}
      on:input={onInput}
      on:focus={onFocus}
      on:blur={onBlur} />

    <span class="uk-form-icon uk-form-icon-flip">
      <Icon
        type={invalid ? 'close' : icon}
        color={invalid ? colors.warning : isFocused ? colors.darkblue : colors.lightgray} />
    </span>

  </div>
  {#if invalid}
    <Error type="default-error" text={error && error} />
  {/if}
</div>
