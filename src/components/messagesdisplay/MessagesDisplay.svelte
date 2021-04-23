<script>
  import PostHeader from '../PostHeader/PostHeader.svelte';
  import _ from 'lodash';
  import { beforeUpdate, afterUpdate } from 'svelte';
  import { onMount } from 'svelte';
  import Label from '../label/Label.svelte';
  import Icon from '../icon/Icon.svelte';
  import RichText from '../richtext/RichText.svelte';
  import Post from '../post/Post.svelte';
  import MessageCard from '../MessageCard/MessageCard.svelte';
  import OrderMessageCard from '../OrderMessageCard/OrderMessageCard.svelte';
  import Replies from '../Replies/Replies.svelte';
  import { uuid } from '../../tools/uuid.ts';
  import { userStore } from '../../store';
  import moment from 'moment';

  export let posts;
  export let sortedPosts;
  export let me;
  export let refetch;
  export let contacts = [];
  export let replies;
  export let toggleReplies;
  export let orders;
  export let slug = undefined;

  let messages;
  let input;
  let autoscroll;
  let maxHeight;
  let replyPost = null;

  afterUpdate(() => {
    // console.log('### CONTACTS', contacts);
    // console.log('### ME', me);
    // console.log('### SORTED POSTS ###', sortedPosts);
    // console.log('### REPLIES ###', replies);
  });

  onMount(() => {
    if (messages && input) {
      messages.style.paddingBottom = `${input.offsetHeight - 60}px`;

      messages.scrollTo(0, messages.scrollHeight);

      onElementHeightChange(input, function(h) {
        if (messages) {
          messages.style.paddingBottom = `${h - 60}px`;
        }
      });
    }
  });

  const scrollToBottom = (div = undefined) => {
    if (div) {
    } else {
      messages.scrollTo(0, messages.scrollHeight);
    }
  };

  const findContact = id => {
    return _.find(contacts, { id: id });
  };

  function onElementHeightChange(elm, callback) {
    var lastHeight = elm.clientHeight,
      newHeight;

    (function run() {
      newHeight = elm.clientHeight;
      if (lastHeight != newHeight) callback(newHeight);
      lastHeight = newHeight;

      if (elm.onElementHeightChangeTimer)
        clearTimeout(elm.onElementHeightChangeTimer);

      elm.onElementHeightChangeTimer = setTimeout(run, 200);
    })();
  }

  async function send(message) {
    const id = meData.id;

    if (replyPost) {
      replyPost.subthread.push({ from: id, message: message });

      let payload = replyPost;

      putData(`http://localhost:5000/api/v1/posts/${replyPost._id}`, payload)
        .then(json => {
          console.log(json.data);
          refetch(payload._id);
        })
        .catch(err => {
          console.log(err);
        });

      replyPost = null;
    } else {
      let payload = {
        from: id,
        message: message,
        to: [slug],
      };

      postData('http://localhost:5000/api/v1/posts', payload)
        .then(async json => {
          console.log(json.data);
          await refetch(json.data._id);
          scrollToBottom();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async function putData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  function removeTags(str) {
    if (str === null || str === '') return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, '');
  }

  function handleReplyPost(p) {
    replyPost = p;
  }
</script>

<style src="./MessagesDisplay.scss">

</style>

<div class="Display" id="Messages" bind:this={messages}>
  {#if sortedPosts}
    {#each Object.keys(sortedPosts) as date}
      <div class="Display-dateLabel">
        {#if date}
          <Label
            text={moment(new Date(date).toISOString()).isSame(moment(), 'day') ? 'Today' : moment(new Date(date).toISOString()).isSame(moment().subtract(1, 'days'), 'day') ? 'Yesterday' : date}
            status="disabled"
            backgroundColor="rgba(166, 173, 196, 0.3);" />
        {/if}
      </div>

      {#each Object.values(sortedPosts[date]) as post}
        <div class="Post">
          {#if post.postType === 'MESSAGE'}
            <MessageCard {post} {findContact} />
          {:else if post.postType === 'ALERT'}
            <MessageCard isAlert={true} {post} {findContact} />
          {:else if post.postType === 'ORDER'}
            <OrderMessageCard
              {me}
              {post}
              {findContact}
              order={_.find(orders, { orderId: post.orderId })} />
          {/if}

          <Replies
            {post}
            {replies}
            {toggleReplies}
            {replyPost}
            {handleReplyPost}
            {findContact} />
        </div>
      {/each}
    {/each}
  {/if}
</div>

<div id="Input" bind:this={input}>
  <div class="Input-fade" />
  <div class="Input-input">
    {#if replyPost}
      <div class="Input-input-replying">
        <div class="uk-flex uk-flex-middle">
          <span>Replying to: {removeTags(replyPost.message)}</span>
        </div>
        <div
          class="clickable"
          on:click={() => {
            replyPost = null;
          }}>
          <Icon type="close" />
        </div>
      </div>
    {/if}
    <RichText id={uuid()} {send} />
  </div>
</div>
