<script>
  import Post from '../post/Post.svelte';
  import { formatDate } from '../../tools/formatDate';
  import { formatInitials } from '../../tools/formatInitials';
  import moment from 'moment';

  export let isOrder;
  export let user;
  export let post;
</script>

<style src="./PostHeader.scss">

</style>

<div class="Post-header">
  {#if user.avatarUrl}
    <img
      class="Post-header-avatar"
      src={user.avatarUrl || ''}
      alt={user.name || ''} />
  {:else}
    <div class="Post-header-avatar">{formatInitials(user.name)}</div>
  {/if}
  <div class="Post-header-details">
    <div class="Post-header-name">{user.name || ''}</div>
    <div class="Post-header-timestamp">
      {formatDate(post.createdAt, false)}
      {isOrder ? ` • Updated ${formatDate(post.updatedAt, false)}` : ''}
    </div>
  </div>
</div>
