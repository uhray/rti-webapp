<script>
  import Icon from '../../components/icon/Icon.svelte';

  export let segment;
  export let icon;
</script>

<style src="./NavItem.scss">

</style>

<div class="NavItem">
  <Icon type="tag" />
  <slot />
</div>
