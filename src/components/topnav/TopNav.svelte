<script>
  import Avatar from '../Avatar/Avatar.svelte';
  import Icon from '../icon/Icon.svelte';
  import DropDown from '../dropdown/DropDown.svelte';
  export let user;
  // console.log(user);
</script>

<style src="./TopNav.scss">

</style>

<!-- TODO: MOVE TOP NAV TO COMP, RENDER AT LAYOUT LEVEL -->
<section class="TopNav">
  <DropDown type="top-nav" choices={['choice', 'choice']}>
    <div class="TopNav-topNav uk-flex">
      <Avatar user={user.user} size={28} />
      <span class="TopNav-navName">
        {#if user.isLoggedIn}
          {#if user.user.contactInfo.firstName}
            {user.user.contactInfo.firstName} {user.user.contactInfo.lastName}
          {:else}{user.user.email}{/if}
        {/if}
      </span>
      <Icon color="#161D35" type="caretdown" />
    </div>
  </DropDown>
</section>

<!-- ================================================== -->
