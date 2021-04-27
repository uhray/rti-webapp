<script>
  import Post from '../post/Post.svelte';
  import PostHeader from '../PostHeader/PostHeader.svelte';
  import Label from '../label/Label.svelte';
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
    <div class="AlertCard-header">
      <div class="AlertCard-tags">
        Fleet Message • {post.tags.map((t, index) => (post.tags.length > 1 ? (index === post.tags.length - 1 ? t : t + ' - ') : t))}
      </div>
      <div class="AlertCard-labels">
        {#each post.teamIds as teamId}
          <div class="AlertCard-label">
            <Label status="inactive" text={teamId} small />
          </div>
        {/each}
        {#each post.driverClass as driverClass}
          <div class="AlertCard-label">
            <Label status="inactive" text={driverClass} small />
          </div>
        {/each}
      </div>
    </div>
    <Post message={post.message} />
  </div>
{:else}
  <div class="MessageCard">
    <Post message={post.message} />
  </div>
{/if}
