<script>
  import { formatInitials } from '../../tools/tools.ts';

  export let user;
  export let size;
</script>

<style src="./Avatar.scss">

</style>

<div
  class="Avatar"
  style={`width: ${size ? size + 'px' : '40px'}; height: ${size ? size + 'px' : '40px'}; font-size: ${size ? size / 2 + 'px' : '10px'}`}>
  {#if user}
    {#if user.avatarUrl}
      <img src={user.avatarUrl} alt={_.get(user, 'contactInfo.firstName') || user.username || 'User'} />
    {:else}{formatInitials(user)}{/if}
  {/if}
</div>
