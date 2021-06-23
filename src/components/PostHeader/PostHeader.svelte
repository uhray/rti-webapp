<script>
  import Avatar from '../Avatar/Avatar.svelte';
  import Icon from '../icon/Icon.svelte';
  import { formatDate, getDisplayName } from '../../tools/tools';
  import { userStore, contactsStore } from '../../store';

  export let isOrder = false;
  export let post;
  export let canFormatDate = false;
  export let isAllMessages = false;
  export let userTo = undefined;
  export let resend;
  export let from;
  export let me;
</script>

<div class="PostHeader-container">
  <div class="Post-header">
    <Avatar
      user={isOrder
        ? me
        : _.find($contactsStore.contacts.users, { _id: post.from })}
      size={40}
    />
    <div class="Post-header-details">
      <div class="Post-header-name">
        {isOrder ? getDisplayName(me) : getDisplayName(from)}
      </div>
      {#if $userStore.user._id === post.from && post.states && post.states.deliveryStatus}
        {#if post.states.deliveryStatus === 'SENDING'}
          <div class="Post-header-timestamp">
            {formatDate(post.updatedAt, canFormatDate)} • Sending{' '}
            <div class="Post-header-loader" uk-spinner="ratio: .35" />
          </div>
        {:else if post.states.deliveryStatus === 'DELIVERED'}
          <div class="Post-header-timestamp">
            {formatDate(post.updatedAt, canFormatDate)} • Delivered
            <svg
              width="10"
              height="9"
              viewBox="0 0 10 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.04575 0.71191C9.20486 0.530069 9.48125 0.511643 9.6631 0.670754C9.84245 0.827685 9.86283 1.09871 9.71069 1.28058L9.70425 1.2881L3.57925 8.28809C3.41474 8.47611 3.12709 8.48803 2.94758 8.31615L2.94064 8.30936L0.315641 5.68436C0.144786 5.51351 0.144786 5.2365 0.315641 5.06564C0.484122 4.89716 0.755831 4.89482 0.927179 5.05862L0.934359 5.06564L3.22867 7.35996L9.04575 0.71191Z"
                fill="#595F76"
              />
            </svg>
          </div>
        {:else if post.states.deliveryStatus === 'READ'}
          <div class="Post-header-timestamp">
            {formatDate(post.updatedAt, canFormatDate)} • Read
            <svg
              width="14"
              height="9"
              viewBox="0 0 14 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.3582 0.71191C12.5174 0.530069 12.7938 0.511643 12.9756 0.670754C13.1549 0.827685 13.1753 1.09871 13.0232 1.28058L13.0168 1.2881L6.89175 8.2881C6.72724 8.47612 6.43959 8.48804 6.26008 8.31615L6.25314 8.30937L3.62814 5.68437C3.45729 5.51351 3.45729 5.2365 3.62814 5.06565C3.79662 4.89717 4.06833 4.89483 4.23968 5.05863L4.24686 5.06565L6.54117 7.35997L12.3582 0.71191ZM1.00314 5.06565C1.17162 4.89717 1.44333 4.89483 1.61468 5.05863L1.62186 5.06565L4.24686 7.69065C4.41771 7.8615 4.41771 8.13851 4.24686 8.30937C4.07838 8.47785 3.80667 8.48019 3.63532 8.31639L3.62814 8.30937L1.00314 5.68437C0.832286 5.51351 0.832286 5.2365 1.00314 5.06565ZM10.35 0.670233C10.1679 0.511454 9.89149 0.530383 9.73271 0.712512L6.01397 4.97812L6.00755 4.98566C5.85574 5.1678 5.87662 5.43879 6.05625 5.5954C6.23838 5.75417 6.51474 5.73525 6.67352 5.55312L10.3923 1.2875L10.3987 1.27997C10.5505 1.09782 10.5296 0.826838 10.35 0.670233Z"
                fill="#595F76"
              />
            </svg>
          </div>
        {:else if post.states.deliveryStatus === 'ERROR'}
          <div
            class="Post-header-error clickable"
            on:click={() => {
              resend(post);
            }}
          >
            {formatDate(post.updatedAt, canFormatDate)} • Error
            <svg
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.19592 11.2118L5.8559 2.55736C6.3517 1.63711 7.6715 1.63711 8.16736 2.55746L12.8273 11.2118C13.0463 11.6185 13.0353 12.1104 12.7985 12.5069C12.5616 12.9035 12.1337 13.1465 11.6718 13.1465H2.35141C1.88948 13.1465 1.46157 12.9035 1.22471 12.5069C0.987878 12.1104 0.976942 11.6185 1.19592 11.2118ZM12.0569 11.6266L7.39699 2.97238C7.23162 2.66544 6.79158 2.66544 6.62626 2.97229L1.96635 11.6266C1.89336 11.7621 1.897 11.9261 1.97595 12.0583C2.05491 12.1905 2.19752 12.2715 2.35141 12.2715H11.6718C11.8257 12.2715 11.9683 12.1905 12.0473 12.0583C12.1262 11.9261 12.1298 11.7621 12.0569 11.6266ZM7.01633 5.24936L7.0056 5.24933C6.84521 5.25093 6.69227 5.31726 6.58151 5.43329C6.47073 5.54933 6.41156 5.70522 6.41744 5.86554L6.57458 9.206C6.60074 9.76193 7.42249 9.76191 7.44861 9.20597L7.60529 5.87141C7.61273 5.70754 7.55266 5.54851 7.43924 5.43097C7.33268 5.32055 7.18763 5.25568 7.03449 5.24975L7.02392 5.24947L7.01633 5.24936ZM6.46473 10.8223C6.46473 11.1243 6.70957 11.3691 7.0116 11.3691C7.31363 11.3691 7.55848 11.1243 7.55848 10.8223C7.55848 10.5202 7.31363 10.2754 7.0116 10.2754C6.70957 10.2754 6.46473 10.5202 6.46473 10.8223Z"
                fill="#E86172"
              />
            </svg>
          </div>
        {/if}
      {:else}
        <div class="Post-header-timestamp">
          {formatDate(post.createdAt, canFormatDate)}
          {isOrder
            ? ` • Updated ${formatDate(post.updatedAt, canFormatDate)}`
            : ''}
        </div>
      {/if}
    </div>
  </div>

  {#if isAllMessages && post.from === $userStore.user._id}
    <div class="Post-header-group">
      <div class="Post-header-spacer" />
      <div style="margin-bottom: 11px;">
        <Icon type="caretright" />
      </div>
      <div class="Post-header">
        <div class="Post-header-detailsAll">
          <div class="Post-header-name">{userTo.name || ''}</div>
          <div class="Post-header-timestamp">
            {formatDate(post.createdAt, canFormatDate)}
            {isOrder
              ? ` • Updated ${formatDate(post.updatedAt, canFormatDate)}`
              : ''}
          </div>
        </div>
        <Avatar user={userTo} size={40} />
      </div>
    </div>
  {/if}
</div>

<style src="./PostHeader.scss"></style>
