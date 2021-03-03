<script>
  import Icon from '../icon/Icon.svelte';
  import DropDown from '../dropdown/DropDown.svelte';
</script>

<!-- TODO: MOVE TOP NAV TO COMP, RENDER AT LAYOUT LEVEL -->
<section class="TopNav">
  <DropDown type="top-nav" choices={['choice', 'choice']}>
    <div class="TopNav-topNav uk-flex">
      <Icon type="account" />
      <span class="TopNav-navName">John Smith</span>
      <Icon type="chev-down" />
    </div>
  </DropDown>
</section>

<!-- ================================================== -->
<style src="./TopNav.scss"></style>
