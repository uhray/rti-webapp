<script>
  import { onMount } from 'svelte';
  import Button from '../button/Button.svelte';
  import Avatar from '../Avatar/Avatar.svelte';
  import _ from 'lodash';
  import { contactsStore } from '../../store';
  import { getDisplayName } from '../../tools/tools';

  export let user;
  export let clearOverlayData = () => {};
</script>

<style src="./OverlayPreview.scss">

</style>

{#if user}
  <div class="Overlay" id="Overlay">

    <div class="Overlay-container">

      <div class="Overlay-title">
        <span>Overview</span>
        <div
          class="Overlay-close clickable"
          on:click={() => {
            clearOverlayData();
          }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.78906 6.5L11.8125 2.51562L12.6328 1.69531C12.75 1.57812
              12.75 1.38281 12.6328 1.22656L11.7734 0.367188C11.6172 0.25
              11.4219 0.25 11.3047 0.367188L6.5 5.21094L1.65625 0.367188C1.53906
              0.25 1.34375 0.25 1.1875 0.367188L0.328125 1.22656C0.210938
              1.38281 0.210938 1.57812 0.328125 1.69531L5.17188 6.5L0.328125
              11.3438C0.210938 11.4609 0.210938 11.6562 0.328125 11.8125L1.1875
              12.6719C1.34375 12.7891 1.53906 12.7891 1.65625 12.6719L6.5
              7.82812L10.4844 11.8516L11.3047 12.6719C11.4219 12.7891 11.6172
              12.7891 11.7734 12.6719L12.6328 11.8125C12.75 11.6562 12.75
              11.4609 12.6328 11.3438L7.78906 6.5Z"
              fill="#A6ADC4" />
          </svg>
        </div>
      </div>
      <div class="Overlay-content">
        <Avatar {user} size={100} />
        <span class="Overlay-name">
          {user.name ? user.name : getDisplayName(user)}
        </span>
        <div class="Overlay-button">
          <a href={`/users/${user.id}`}>
            <Button primary outline fill>Edit Profile</Button>
          </a>
        </div>

        <div class="Overlay-info">
          <span class="Overlay-info-label">Full Name</span>
          <span class="Overlay-info-item">
            {user.name ? user.name : getDisplayName(user)}
          </span>
          <span class="Overlay-info-label">Username</span>
          <span class="Overlay-info-item">{_.upperCase(user.username)}</span>

          <span class="Overlay-info-label">Vehicle</span>
          <span class="Overlay-info-item">{user.truckId}</span>
          <span class="Overlay-info-label">Driver Manager</span>
          <span class="Overlay-info-item">{user.teamId}</span>

        </div>
      </div>

      <div class=" Overlay-buttons">
        <div
          class="Overlay-button"
          on:click={() => {
            clearOverlayData();
          }}>
          <Button primary outline>Close</Button>
        </div>

        <div>
          <a href={`/users/${user.id}`}>
            <Button primary>Go To Profile</Button>
          </a>
        </div>
      </div>

    </div>

  </div>
{/if}
