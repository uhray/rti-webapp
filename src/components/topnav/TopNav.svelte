<script>
  import Icon from '../icon/Icon.svelte';
  import DropDown from '../dropdown/DropDown.svelte';
  export let user;
  console.log(user);
</script>

<!-- TODO: MOVE TOP NAV TO COMP, RENDER AT LAYOUT LEVEL -->
<section class="TopNav">
  <DropDown type="top-nav" choices={['choice', 'choice']}>
    <div class="TopNav-topNav uk-flex">
      <Icon type="account" />
      <span class="TopNav-navName">
        {#if user.isLoggedIn}
          {#if user.user.contactInfo.firstName}
            {user.user.contactInfo.firstName}
          {:else}
            {user.user.email}
          {/if}
        {/if}
      </span>
      <Icon type="caretdown" />
    </div>
  </DropDown>
</section>

<!-- ================================================== -->
<style src="./TopNav.scss">
</style>
