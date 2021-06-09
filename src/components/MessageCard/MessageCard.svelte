<script>
  import PostContent from '../PostContent/PostContent.svelte';
  import PostHeader from '../PostHeader/PostHeader.svelte';
  import Label from '../label/Label.svelte';
  import _ from 'lodash';
  import { contactsStore } from '../../store';

  export let isAlert = false;
  export let post;
  export let isAllMessages = false;
  export let resend;
  let from = _.find($contactsStore.contacts.users, { id: post.from });
  let userTo = _.find($contactsStore.contacts.users, { id: post.userId });

  // console.log('From: ' + from.name + ' To: ' + userTo.name);
</script>

<PostHeader {userTo} {post} {isAllMessages} {resend} />
{#if isAlert}
  <div class="AlertCard">
    <div class="AlertCard-header">
      <div class="AlertCard-tags">
        Fleet Message {post.tags.length > 0 ? '•' : ''}
        {#each post.tags as t, index}
          {post.tags.length > 1
            ? index === post.tags.length - 1
              ? t
              : t + ' - '
            : t}
        {/each}
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
    <PostContent message={post.message} />
  </div>
{:else}
  <div class="MessageCard">
    <PostContent message={post.message} />
  </div>
{/if}

<style src="./MessageCard.scss">
</style>
