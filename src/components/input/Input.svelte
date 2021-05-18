<script>
  import { onMount } from 'svelte';
  import Error from '../error/Error.svelte';
  import Icon from '../icon/Icon.svelte';
  import { colors } from '../../theme/variables';

  export let type = 'text';
  export let fill = undefined;
  export let icon = undefined;
  export let invalid = false;
  export let error = 'Error';
  export let label = undefined;
  export let placeholder = undefined;
  export let onInput = undefined;
  export let onChange = undefined;
  export let value = '';
  export let name = undefined;
  export let disabled = undefined;
  export let noborder = undefined;

  let showPassword = false;

  onMount(() => (showPassword = false));

  const togglePass = () => console.log('toggle');

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
<div class="Input-wrapper">
  {#if label}
    <label>{label}</label>
    <br />
  {/if}
  {#if type === 'text'}
    <div
      class={`Input uk-inline ${fill ? 'uk-width-1-1 uk-margin-small-right' : ''}`}
      {invalid}>
      <input
        class="uk-input"
        type="text"
        {name}
        {value}
        {placeholder}
        {invalid}
        {isFocused}
        {disabled}
        {noborder}
        on:input
        on:focus={onFocus}
        on:blur={onBlur}
        on:input={onInput ? e => onInput(e.target.value) : () => {}}
        on:change={onChange ? e => onChange(e) : () => {}} />

      <span class="uk-form-icon uk-form-icon-flip">
        <Icon
          type={invalid ? 'close' : icon}
          color={invalid ? colors.warning : isFocused ? colors.darkblue : colors.lightgray} />
      </span>
    </div>
  {:else if type === 'password'}
    <div
      class={`Input uk-inline ${fill ? 'uk-width-1-1 uk-margin-small-right' : ''}`}
      {invalid}>
      <input
        class="uk-input"
        type={showPassword ? 'text' : 'password'}
        {value}
        {placeholder}
        {invalid}
        {isFocused}
        on:input
        on:focus={onFocus}
        on:blur={onBlur} />

      <span class="uk-form-icon uk-form-icon-flip" on:click={togglePass}>
        <Icon
          type={showPassword ? 'show' : 'hide'}
          color={invalid ? colors.warning : isFocused ? colors.darkblue : colors.lightgray} />
      </span>
    </div>
  {/if}
  {#if invalid}
    <Error type="default-error" text={error && error} />
  {/if}
</div>
