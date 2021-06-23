<script>
  import Label from '../label/Label.svelte';
  import Avatar from '../Avatar/Avatar.svelte';
  import Dropdown from '../Dropdown/DropDown.svelte';
  import { colors } from '../../theme/variables';

  export let contact;
  export let filter;
  export let handleFilter;
  export let handlePreview;

  const dropdownOpts = [
    {
      header: '',
      opts: [
        {
          text: 'View Profile',
          value: 'profile',
          selected: false,
          icon: 'user',
        },
      ],
    },
  ];

  function handleSelect(v) {
    if (v === 'profile') {
      if (contact) {
        handlePreview();
      }
    }
  }
</script>

<div class="Header">
  {#if contact}
    <Avatar user={contact} size={40} />
  {/if}

  <div class={contact ? 'Header-content' : 'Header-content-all'}>
    {#if contact}
      <div class="Header-content-details">
        <span class="Header-content-name">
          {contact ? contact.name : 'All Messages'}
        </span>
        <span class="Header-content-vehicle">
          {contact.username.toUpperCase()}
          {contact.truckId ? ' • ' + contact.truckId : ''}
        </span>
      </div>
    {:else}
      <div class="Header-content-title">
        <span>All Messages</span>
      </div>
    {/if}

    <div class="Header-content-actions">
      <div
        on:click={() => {
          handleFilter('all');
        }}
      >
        <Label
          status="inactive"
          text="All Messages"
          iconLeft="message"
          iconColor={filter === 'all' ? '#243E93' : ''}
          backgroundColor={colors.tablegray}
        />
      </div>
      <div
        on:click={() => {
          handleFilter('macros');
        }}
      >
        <Label
          status="inactive"
          text="Macros"
          iconLeft="macro"
          iconColor={filter === 'macros' ? '#243E93' : ''}
          backgroundColor={colors.tablegray}
        />
      </div>
      <div
        on:click={() => {
          handleFilter('orders');
        }}
      >
        <Label
          status="inactive"
          text="Orders"
          iconLeft="orders"
          iconColor={filter === 'orders' ? '#243E93' : ''}
          backgroundColor={colors.tablegray}
        />
      </div>
      {#if contact}
        <div>
          <Label
            status="inactive"
            iconLeft="overflow"
            backgroundColor={colors.tablegray} />
          <Dropdown simpleSelect={true} data={dropdownOpts} {handleSelect} />
        </div>
      {/if}
    </div>
  </div>
</div>

<style src="./MessagesHeader.scss">
</style>
