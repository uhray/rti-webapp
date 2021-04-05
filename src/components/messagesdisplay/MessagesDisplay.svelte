<script>
  import _ from 'lodash';
  import { me as meData } from '../../routes/messages/data.js'; // #TODO: remove hardcoded me, get user data
  import { beforeUpdate, afterUpdate } from 'svelte';
  import { onMount } from 'svelte';
  import Label from '../label/Label.svelte';
  import Icon from '../icon/Icon.svelte';
  import RichText from '../richtext/RichText.svelte';
  import Post from '../post/Post.svelte';
  import moment from 'moment';
  export let posts;
  export let sortedPosts;
  export let me;
  export let contacts = [];
  export let replies;
  export let slug = undefined;

  let messages;
  let input;
  let autoscroll;
  let maxHeight;
  let replyPost = null;

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

  // #TODO: auto scrolling when div is populated
  beforeUpdate(() => {
    // autoscroll =
    //   messages &&
    //   messages.offsetHeight + messages.scrollTop > messages.scrollHeight - 20;
  });

  afterUpdate(() => {
    // messages.scrollTo(0, messages.scrollHeight);
  });

  const findContact = id => {
    return _.find(contacts, { id: id });
  };

  const toggleReplies = id => {
    replies = replies.map(r => {
      if (r.id == id) {
        return { id: r.id, display: !r.display };
      } else {
        return r;
      }
    });

    replies = replies;
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
          console.log(json);
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
        .then(json => {
          console.log(json);
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
    return response;
  }

  async function putData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(data),
    });
    return response;
  }

  function removeTags(str) {
    if (str === null || str === '') return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, '');
  }
</script>

<style src="./MessagesDisplay.scss">

</style>

<div class="Display" id="Messages" bind:this={messages}>
  {#if sortedPosts}
    {#each Object.keys(sortedPosts) as date}
      <div class="Display-dateLabel">
        <Label
          text={moment(new Date(date).toISOString()).isSame(moment(), 'day') ? 'Today' : moment(new Date(date).toISOString()).isSame(moment().subtract(1, 'days'), 'day') ? 'Yesterday' : date}
          status="disabled"
          backgroundColor="rgba(166, 173, 196, 0.3);" />
      </div>
      {#each Object.values(sortedPosts[date]) as post}
        <div class="Post">
          {#if post.from === me.id}
            <div class="Post-header">
              <img src={me.pic} alt={me.name} />
              <div class="Post-header-details">
                <div class="Post-header-name">{me.name}</div>
                <div class="Post-header-timestamp">
                  {moment(post.createdAt).format('h:mm A')}
                </div>
              </div>
            </div>
          {:else}
            <div class="Post-header">
              <img
                src={findContact(post.from).pic || ''}
                alt={findContact(post.from).name || ''} />
              <div class="Post-header-details">
                <div class="Post-header-name">
                  {findContact(post.from).name || ''}
                </div>
                <div class="Post-header-timestamp">
                  {moment(post.createdAt).format('h:mm A')}
                </div>
              </div>
            </div>
          {/if}

          <div class="Post-message">
            <Post message={post.message} />
          </div>

          {#if post.subthread && post.subthread.length > 0}
            <div class="Post-replies">

              {#if _.find(replies, { id: post._id }).display}
                <div
                  class="Post-replies-show"
                  on:click={() => toggleReplies(post._id)}>
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
                      {#if reply.from === me.id}
                        <div class="Post-header">
                          <img src={me.pic} alt={me.name} />
                          <div class="Post-header-details">
                            <div class="Post-header-name">{me.name}</div>
                            <div class="Post-header-timestamp">
                              {moment(reply.createdAt).format('h:mm A')}
                            </div>
                          </div>
                        </div>
                      {:else}
                        <div class="Post-header">
                          <img
                            src={findContact(reply.from).pic || ''}
                            alt={findContact(reply.from).name || ''} />
                          <div class="Post-header-details">
                            <div class="Post-header-name">
                              {findContact(reply.from).name || ''}
                            </div>
                            <div class="Post-header-timestamp">
                              {moment(reply.createdAt).format('h:mm A')}
                            </div>
                          </div>
                        </div>
                      {/if}
                      <div class="Post-message">
                        <Post message={reply.message} />
                      </div>
                    </div>
                  {/each}
                  <div class="Post-reply">
                    <div
                      class="Post-reply-action"
                      on:click={() => {
                        replyPost = post;
                      }}>
                      <Icon type="reply" color="#243E93" />
                      <span>Reply in the thread</span>
                    </div>
                  </div>
                </div>
              {:else}
                <div
                  class="Post-replies-show"
                  on:click={() => toggleReplies(post._id)}>
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
                  replyPost = post;
                }}>
                <Icon type="reply" color="#243E93" />
                <span>Reply in the thread</span>
              </div>
            </div>
          {/if}

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
    <RichText {send} />
  </div>
</div>
