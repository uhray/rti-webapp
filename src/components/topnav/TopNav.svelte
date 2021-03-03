<script>
  import Icon from '../icon/Icon.svelte';
</script>

<!-- TODO: MOVE TOP NAV TO COMP, RENDER AT LAYOUT LEVEL -->
<section class="TopNav">
  <div class="TopNav-topNav uk-flex">
    <Icon type="account" />
    <span class="TopNav-navName">John Smith</span>
    <Icon type="chev-down" />
  </div>
</section>

<!-- ================================================== -->
<style src="./TopNav.scss"></style>
