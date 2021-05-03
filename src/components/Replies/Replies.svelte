<script>
  import PostHeader from '../PostHeader/PostHeader.svelte';
  import Post from '../post/Post.svelte';
  import Icon from '../icon/Icon.svelte';
  import _ from 'lodash';

  export let post = undefined;
  export let replies = undefined;
  export let toggleReplies = undefined;
  export let handleReplyPost = undefined;
  export let findContact = undefined;
</script>

<style src="./Replies.scss">

</style>

{#if post.subthread && post.subthread.length > 0}
  <div class="Post-replies">

    {#if _.find(replies, {
      id: post._id,
    }) && _.find(replies, { id: post._id }).display}
      <div class="Post-replies-show" on:click={() => toggleReplies(post._id)}>
        <span>
          Hide {post.subthread.length} repl{post.subthread.length > 1 ? 'ies' : 'y'}
        </span>
        <div class="Post-replies-icon">
          <Icon type="chev-up" />
        </div>
      </div>

      <div class="Post-replies-wrapper">
        {#each post.subthread as reply}
          <div class="Post-replies-content">
            <PostHeader
              user={findContact(reply.from)}
              post={reply}
              canFormatDate={true} />

            <div class="Post-message">
              <Post message={reply.message} />
            </div>
          </div>
        {/each}

        <div class="Post-reply">
          <div
            class="Post-reply-action"
            on:click={() => {
              handleReplyPost(post);
            }}>
            <Icon type="reply" color="#243E93" />
            <span>Reply in the thread</span>
          </div>
        </div>
      </div>
    {:else}
      <div class="Post-replies-show" on:click={() => toggleReplies(post._id)}>
        <span>
          Show {post.subthread.length} repl{post.subthread.length > 1 ? 'ies' : 'y'}
        </span>
        <div class="Post-replies-icon">
          <Icon type="chev-down" />
        </div>
      </div>
    {/if}

  </div>
{:else}
  <div class="Post-reply">
    <div
      class="Post-reply-action"
      on:click={() => {
        handleReplyPost(post);
      }}>
      <Icon type="reply" color="#243E93" />
      <span>Reply in the thread</span>
    </div>
  </div>
{/if}
