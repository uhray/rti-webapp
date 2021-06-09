<script>
  import MessageCard from '../MessageCard/MessageCard.svelte';
  import OrderMessageCard from '../OrderMessageCard/OrderMessageCard.svelte';
  import MessageAttachments from '../MessageAttachments/MessageAttachments.svelte';
  import Replies from '../Replies/Replies.svelte';
  import { editPost } from '../../tools/crudApi';
  import IntersectionObserver from 'svelte-intersection-observer';

  export let post;
  export let orders;
  export let slug;
  export let me;
  export let toggleReplies;
  export let handleReplyPost;
  export let resend;

  let element;
  let intersecting;

  function readPost(p) {
    let payload = p;
    if (payload.toRead) {
      payload.toRead = [...payload.toRead, me._id];
    } else {
      payload.toRead = [me._id];
    }

    payload.states.deliveryStatus = 'READ';
    payload.readTime = Date.now();

    editPost(post._id, payload).catch(err => {
      console.error(err);
    });
  }
</script>

<IntersectionObserver
  {element}
  bind:intersecting
  on:intersect={e => {
    if (post.postType === 'ORDER') {
      if (post.toRead && !post.toRead.includes(me._id)) {
        // UPDATE POST
        readPost(post);
      }
    } else {
      if (
        post.from !== me._id &&
        post.toRead &&
        !post.toRead.includes(me._id)
      ) {
        // UPDATE POST
        readPost(post);
      }
    }
  }}
>
  <div class="Post" bind:this={element}>
    {#if post.postType === 'MESSAGE'}
      <MessageCard
        {post}
        isAllMessages={slug === 'all' ? true : false}
        {resend}
      />
    {:else if post.postType === 'ALERT'}
      <MessageCard isAlert={true} {post} {resend} />
    {:else if post.postType === 'ORDER'}
      <OrderMessageCard
        {me}
        {post}
        order="{_.find(orders, { orderId: post.orderId })}{resend}"
      />
    {/if}

    {#if post.attachments.length > 0}
      <MessageAttachments attachments={post.attachments} />
    {/if}

    <Replies {post} {toggleReplies} {handleReplyPost} />
  </div>
</IntersectionObserver>

<style src="./Post.scss"></style>
