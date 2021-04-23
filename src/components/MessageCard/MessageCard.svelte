<script>
  import Post from '../post/Post.svelte';
  import PostHeader from '../PostHeader/PostHeader.svelte';
  import moment from 'moment';

  export let post;
  export let findContact;
  let user = findContact(post.from);
</script>

<style src="./MessageCard.scss">

</style>

<PostHeader {user} {post} />

<div class="Post-message">
  <Post message={post.message} />
</div>
