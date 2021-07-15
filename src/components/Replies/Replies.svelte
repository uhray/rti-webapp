<script>
  import PostHeader from '../PostHeader/PostHeader.svelte';
  import PostContent from '../PostContent/PostContent.svelte';
  import Icon from '../icon/Icon.svelte';
  import _, { find } from 'lodash';
  import { contactsStore, repliesStore } from '../../store';

  export let post = undefined;
  export let toggleReplies = undefined;
  export let handleReplyPost = undefined;

  let replies;
  $: replies = $repliesStore.replies;
</script>

{#if post.subthread && post.subthread.length > 0}
  <div class="Post-replies">
    {#if _.find( replies, { id: post._id } ) && _.find( replies, { id: post._id } ).display}
      <div class="Post-replies-show" on:click={() => toggleReplies(post._id)}>
        <span>
          Hide {post.subthread.length} repl{post.subthread.length > 1
            ? 'ies'
            : 'y'}
        </span>
        <div class="Post-replies-icon">
          <Icon type="chev-up" />
        </div>
      </div>

      <div class="Post-replies-wrapper">
        {#each post.subthread as reply}
          <div class="Post-replies-content">
            <PostHeader
              from={_.find($contactsStore.contacts.users, { id: reply.from })}
              post={reply}
              canFormatDate={true}
            />

            <div class="Post-message">
              <PostContent message={reply.message} />
            </div>
          </div>
        {/each}

        <div class="Post-reply">
          <div
            class="Post-reply-action clickable"
            on:click={() => {
              handleReplyPost(post);
            }}
          >
            <Icon type="reply" color="#243E93" />
            <span>Reply in the thread</span>
          </div>
        </div>
      </div>
    {:else}
      <div class="Post-replies-show" on:click={() => toggleReplies(post._id)}>
        <span>
          Show {post.subthread.length} repl{post.subthread.length > 1
            ? 'ies'
            : 'y'}
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
      class={`Post-reply-action ${
        post.states.deliveryStatus !== 'ERROR' ? 'clickable' : ''
      }`}
      on:click={() => {
        if (post.states.deliveryStatus !== 'ERROR') {
          handleReplyPost(post);
        }
      }}
    >
      <Icon type="reply" color="#243E93" />
      <span>Reply in the thread</span>
    </div>
  </div>
{/if}

<style src="./Replies.scss">
</style>
