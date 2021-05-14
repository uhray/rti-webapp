<script>
  import Post from '../post/Post.svelte';
  import Avatar from '../Avatar/Avatar.svelte';
  import { formatDate } from '../../tools/tools';
  import { formatInitials } from '../../tools/tools';
  import moment from 'moment';

  export let isOrder = false;
  export let user;
  export let post;
  export let canFormatDate = false;
</script>

<style src="./PostHeader.scss">

</style>

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
