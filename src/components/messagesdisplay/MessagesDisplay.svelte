<script>
  import IntersectionObserver from 'svelte-intersection-observer';
  import { onMount } from 'svelte';
  import _ from 'lodash';
  import Label from '../label/Label.svelte';
  import Icon from '../icon/Icon.svelte';
  import RichText from '../richtext/RichText.svelte';
  import { uuid } from '../../tools/tools.ts';
  import { capitalize } from '../../tools/tools.ts';
  import { postsStore, repliesStore } from '../../store';
  import { addPost, editPost } from '../../tools/crudApi.ts';
  import moment from 'moment';
  import { getPosts } from '../../tools/crudApi';
  import Post from '../Post/Post.svelte';

  var io = require('socket.io-client');

  export let posts;
  export let me;
  export let contacts = [];
  export let toggleReplies;
  export let orders;
  export let slug;
  export let loading;

  let messages;
  let input;
  let replyPost = null;
  let attachments = [];
  let element;
  let intersecting;
  let pageIndex = 1;
  let perPage = 50;
  let isMoreLoading = false;
  let disableInfiniteScroll = $postsStore.posts.length % 10 !== 0;

  onMount(() => {
    if (me && me._id) {
      let socket = io('http://localhost:80', {
        transports: ['websocket'],
        query: { userId: me._id },
      });

      socket.connect();

      socket.on('connect_error', error => {
        console.error(error);
      });

      socket.on('connect', () => {
        socket.on('addPost', post => {
          postsStore.setPosts([post, ...$postsStore.posts]);
          repliesStore.setReplies([
            ...$repliesStore.replies,
            { id: post._id, display: false },
          ]);
          scrollToBottom();
        });

        socket.on('updatePost', post => {
          postsStore.setPosts(
            $postsStore.posts.map(p => (p._id === post._id ? post : p))
          );

          replyPost = null;
        });
      });

      return () => {
        socket.disconnect();
        // socket.removeAllListeners();
      };
    }
  });

  $: if (!loading && slug) requestAnimationFrame(() => scrollToBottom());

  const scrollToBottom = (div = undefined) => {
    if (div) {
    } else {
      if (messages) {
        messages.scrollTo(0, messages.scrollHeight);
      }
    }
  };

  const findContact = id => {
    return _.find(contacts, { id: id });
  };

  async function send(message) {
    if (replyPost) {
      replyPost.subthread.push({ from: me._id, message: message });
      if (attachments) {
        attachments.forEach(a => {
          replyPost.attachments.push(a);
        });
      }
      let payload = replyPost;

      editPost(replyPost._id, payload)
        .then(res => {
          postsStore.setPosts(
            $postsStore.posts.map(p =>
              p._id === res._id ? { ...p, subthread: res.subthread } : p
            )
          );

          replyPost = null;

          return res._id;
        })
        .then(id => {
          repliesStore.setReplies(
            $repliesStore.replies.map(r => {
              return r._id === id ? { ...r, display: true } : r;
            })
          );
        })
        .catch(err => {
          console.log('Error adding reply: ', err);

          replyPost = null;
        });
    } else {
      let payload = {
        from: me._id,
        message: message,
        userId: slug,
        attachments: attachments,
      };

      addPost(payload)
        .then(res => {
          postsStore.setPosts([res, ...$postsStore.posts]);
          repliesStore.setReplies([
            ...$repliesStore.replies,
            { id: res._id, display: false },
          ]);
          scrollToBottom();
        })
        .catch(err => console.log('Error adding post: ', err));
    }

    attachments = [];
  }

  function removeTags(str) {
    if (str === null || str === '') return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, '');
  }

  function handleReplyPost(p) {
    replyPost = p;
  }

  function addAttachment() {
    attachments.push({
      name: 'Cybertruck',
      format: 'image',
      fileUrl: 'https://cdn.motor1.com/images/mgl/2RpBB/s1/tesla-truck.jpg',
      size: '12 MB',
    });
    attachments = attachments;
  }

  function removeAttachment(data) {
    const filteredAttachments = attachments.filter(
      a => a.fileUrl !== data.fileUrl
    );
    attachments = filteredAttachments;
  }

  function readPost(post) {
    let payload = post;
    if (payload.toRead) {
      payload.toRead = [...payload.toRead, me._id];
    } else {
      payload.toRead = [me._id];
    }

    payload.states.deliveryStatus = 'READ';
    payload.readTime = Date.now();

    editPost(post._id, payload);
  }

  function loadMorePosts() {
    isMoreLoading = true;

    getPosts({ allMessages: true, page: pageIndex, perPage: perPage })
      .then(res => {
        pageIndex++;
        const r = res.map(post => {
          return { id: post._id, display: false };
        });
        postsStore.setPosts([...$postsStore.posts, ...res]);
        repliesStore.setReplies([...$repliesStore.replies, ...r]);

        disableInfiniteScroll = res.length < 10;
        isMoreLoading = false;
      })
      .catch(err => {
        console.log('Error fetching more posts: ', err);

        disableInfiniteScroll = true;
        isMoreLoading = false;
      });
  }

  function compareSortTimes(post1, post2) {
    if (post1 && post2) {
      let date1 = moment(new Date(post1.sortDatetime).toISOString()).format(
        'MMM D, YYYY'
      );
      let date2 = moment(new Date(post2.sortDatetime).toISOString()).format(
        'MMM D, YYYY'
      );

      if (date1 !== date2) {
        return true;
      }
    }
    return false;
  }
</script>

<div class="MessagesDisplay">
  <div id="Messages" class="Messages" bind:this={messages}>
    {#if !loading}
      {#if posts && posts.length > 0}
        {#each posts as post, index}
          <Post
            {post}
            {orders}
            {slug}
            {me}
            {findContact}
            {toggleReplies}
            {handleReplyPost}
          />

          {#if compareSortTimes(posts[index], posts[index + 1]) || posts[posts.length - 1]._id === post._id}
            <div class="Messages-dateLabel">
              <Label
                text={moment(
                  new Date(
                    moment(new Date(post.sortDatetime).toISOString()).format(
                      'MMM D, YYYY'
                    )
                  ).toISOString()
                ).isSame(moment(), 'day')
                  ? 'Today'
                  : moment(
                      new Date(
                        moment(
                          new Date(post.sortDatetime).toISOString()
                        ).format('MMM D, YYYY')
                      ).toISOString()
                    ).isSame(moment().subtract(1, 'days'), 'day')
                  ? 'Yesterday'
                  : moment(new Date(post.sortDatetime).toISOString()).format(
                      'MMM D, YYYY'
                    )}
                status="disabled"
                backgroundColor="rgba(166, 173, 196, 0.3);"
              />
            </div>
          {/if}
        {/each}

        <IntersectionObserver
          {element}
          bind:intersecting
          on:intersect={e => {
            if (!disableInfiniteScroll) {
              loadMorePosts();
            }
          }}
        >
          <div bind:this={element} class="Infinite" />
        </IntersectionObserver>

        {#if isMoreLoading}
          <div class="Messages-loading">
            <div uk-spinner class="Loader-color" />
          </div>
        {/if}
      {:else}
        <div class="Messages-empty">No Messages</div>
      {/if}
    {:else}
      <div class="Messages-loading">
        <div uk-spinner class="Loader-color" />
      </div>
    {/if}
  </div>

  {#if (slug === 'all' && replyPost) || slug !== 'all'}
    <div class="Input" id="Input" bind:this={input}>
      <div class={`Input-input ${replyPost && 'Input-replyingPadding'}`}>
        {#if attachments.length > 0}
          <div class="Input-attachments">
            <MessageAttachments
              isDisplay={false}
              {removeAttachment}
              {attachments}
            />
          </div>
        {/if}
        {#if replyPost}
          <div class="Input-replying">
            {#if replyPost.postType === 'MESSAGE' || replyPost.postType === 'ALERT'}
              <div class="Input-info">
                <div>Replying to: {findContact(replyPost.from).name}</div>
                <div>{removeTags(replyPost.message)}</div>
              </div>
            {:else if replyPost.postType === 'ORDER'}
              <div class="Input-orderInfo">
                <div class="Input-orderText">
                  <svg
                    width="16"
                    height="11"
                    viewBox="0 0 16 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="Input-orderIcon"
                  >
                    <path
                      d="M15.6289 4.70312L12.7578 0.574219C12.5117 0.246094
                      12.1289 0 11.6641 0H4.30859C3.84375 0 3.46094 0.246094
                      3.21484 0.574219L0.34375 4.70312C0.207031 4.92188 0.125
                      5.16797 0.125 5.46875V9.1875C0.125 9.92578 0.699219 10.5
                      1.4375 10.5H14.5625C15.2734 10.5 15.875 9.92578 15.875
                      9.1875V5.46875C15.875 5.19531 15.793 4.92188 15.6289
                      4.70312ZM4.30859 1.3125H11.6641L13.7969
                      4.375H10.4609L9.58594 6.125H6.38672L5.51172
                      4.375H2.17578L4.30859 1.3125ZM14.5625
                      9.1875H1.4375V5.6875H4.71875L5.59375
                      7.4375H10.4062L11.2812 5.6875H14.5625V9.1875Z"
                      fill="#15224B"
                    />
                  </svg>
                  <div>
                    <div class="Input-orderNumber">
                      Order #{replyPost.orderId}
                    </div>
                    <!-- #TODO CHANGE THIS TO REPRESENT DATA -->
                    <div class="Input-orderDetails">
                      Trip Started: COOCAR - AMRLAW • Appointment Time: Jan 25,
                      9:45 am
                    </div>
                  </div>
                </div>
                <Label
                  status={_.find(orders, { orderId: replyPost.orderId }).status}
                  text={capitalize(
                    _.find(orders, {
                      orderId: replyPost.orderId,
                    }).status
                  )}
                  small
                />
              </div>
            {/if}

            <div
              class="clickable"
              on:click={() => {
                replyPost = null;
              }}
            >
              <Icon type="close" />
            </div>
          </div>
        {/if}
        <RichText {addAttachment} id={uuid()} {send} />
      </div>
    </div>
  {/if}
</div>

<style src="./MessagesDisplay.scss"></style>
