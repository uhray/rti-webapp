<script>
  import Avatar from '../Avatar/Avatar.svelte';
  import Icon from '../icon/Icon.svelte';
  import { formatDate } from '../../tools/tools';

  export let isOrder = false;
  export let user;
  export let post;
  export let canFormatDate = false;
  export let isAllMessages = false;
  export let userTo = undefined;

  $: {
    console.log(userTo);
  }
</script>

<style src="./PostHeader.scss">

</style>

<div class="PostHeader-container">
  <div class="Post-header">
    <Avatar {user} size={40} />
    <div class="Post-header-details">
      <div class="Post-header-name">{user.name || ''}</div>
      <div class="Post-header-timestamp">
        {formatDate(post.createdAt, canFormatDate)}
        {isOrder ? ` • Updated ${formatDate(post.updatedAt, canFormatDate)}` : ''}
      </div>
    </div>
  </div>

  {#if isAllMessages}
    <div class="Post-header-group">
      <div class="Post-header-spacer" />
      <div style="margin-bottom: 11px;">
        <Icon type="caretright" />
      </div>
      <div class="Post-header">
        <div class="Post-header-detailsAll">
          <div class="Post-header-name">{userTo.name || ''}</div>
          <div class="Post-header-timestamp">
            {formatDate(post.createdAt, canFormatDate)}
            {isOrder ? ` • Updated ${formatDate(post.updatedAt, canFormatDate)}` : ''}
          </div>
        </div>
        <Avatar user={userTo} size={40} />
      </div>

    </div>
  {/if}
</div>
