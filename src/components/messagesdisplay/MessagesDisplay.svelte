<script>
  import Icon from '../../components/icon/Icon.svelte';
  import moment from 'moment';
  import _ from 'lodash';
  export let posts;
  export let me;
  export let contacts = [];
  export let replies;

  const findContact = id => {
    return _.find(contacts, { id: id });
  };

  const toggleReplies = id => {
    console.log('toggling ' + id);

    replies = replies.map(r => {
      if (r.id == id) {
        return { id: r.id, display: !r.display };
      } else {
        return r;
      }
    });

    replies = replies;
  };
</script>

<style src="./MessagesDisplay.scss">

</style>

<div class="Display">

  {#if posts}
    {#each posts as post, i}
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

        <div class="Post-message">{post.message}</div>

        {#if post.subthread}
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
                  <div class="Post-message">{reply.message}</div>
                </div>
              {/each}
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
            <div class="Post-reply-action">
              <Icon type="reply" color="#243E93" />
              <span>Reply in the thread</span>
            </div>
          </div>
        {/if}

      </div>
    {/each}
  {/if}
</div>
