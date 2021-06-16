<script>
  import Icon from '../../components/icon/Icon.svelte';

  export const segment = undefined;
  export let icon = undefined;
  export let isOpen = undefined;
  export let amount = undefined;
  export let isActive = false;
</script>

<div class={`${isOpen ? 'NavItem' : 'NavItem closed'} ${isActive && 'active'}`}>
  {#if isActive}
    <div class="NavItem-activeBar" />
  {/if}
  <Icon type={icon} color="#fff" />
  <span>
    <slot />
  </span>
  {#if amount > 0}
    <div class="NavItem-badge">
      <div>{amount}</div>
    </div>
  {/if}
</div>

<style src="./NavItem.scss">
</style>
