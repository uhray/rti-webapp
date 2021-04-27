<script>
  import Post from '../post/Post.svelte';
  import PostHeader from '../PostHeader/PostHeader.svelte';
  import moment from 'moment';

  export let isAlert = false;
  export let post;
  export let findContact;
  let user = findContact(post.from);
</script>

<style src="./MessageCard.scss">

</style>

<PostHeader {user} {post} />

{#if isAlert}
  <div class="AlertCard">
    <div class="AlertCard-tags">
      Fleet Message • {post.tags.map((t, index) => (post.tags.length > 1 ? (index === post.tags.length - 1 ? t : t + ' - ') : t))}
    </div>
    <Post message={post.message} />
  </div>
{:else}
  <div class="MessageCard">

    <Post message={post.message} />
  </div>
{/if}
