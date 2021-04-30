<script>
  import { colors } from '../../theme/variables';
  import Icon from '../icon/Icon.svelte';
  export let text = '';
  export let status = 'default';
  export let iconLeft = undefined;
  export let iconRight = undefined;
  export let iconColor = undefined;
  export let fontWeight = 600;
  export let statusColor = undefined;
  export let textColor = undefined;
  export let backgroundColor = undefined;
  export let small = false;
</script>

<style src="./Label.scss">

</style>

<!-- HTML -->
<section class="Label">

  <div
    class="uk-flex Label-container"
    {status}
    {backgroundColor}
    small={small ? true : false}
    style={`--custom-font-weight: ${fontWeight}; --custom-text-color: ${textColor}; --custom-background-color: ${backgroundColor}`}>

    {#if statusColor}
      <div class="statusColor" {statusColor} />
    {/if}
    {#if iconLeft}
      <Icon type={iconLeft} color={iconColor} />
    {/if}
    <span>{text}</span>
    {#if iconRight}
      <Icon type={iconRight} color={iconColor} />
    {/if}

  </div>

</section>

<!-- ==== -->
