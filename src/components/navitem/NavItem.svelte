<script>
  import Icon from '../../components/icon/Icon.svelte';

  export let segment;
  export let icon;
  export let isOpen;
  export let amount;
</script>

<style src="./NavItem.scss">

</style>

<div class={isOpen ? 'NavItem' : 'NavItem closed'}>
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
