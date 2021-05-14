<script>
  import Label from '../../components/label/Label.svelte';
  import Avatar from '../../components/Avatar/Avatar.svelte';
  import { colors } from '../../theme/variables';
  import { formatInitials } from '../../tools/tools.ts';
  export let contact;
  export let filter;
  export let handleFilter;
</script>

<style src="./MessagesHeader.scss">

</style>

<div class="Header">
  {#if contact}
    <Avatar user={contact} size={40} />

    <div class="Header-content">
      <div class="Header-content-details">
        <span class="Header-content-name">
          {contact ? contact.name : 'All Messages'}
        </span>
        <span class="Header-content-vehicle">
          {contact.username.toUpperCase()}
          {contact.truckId ? ' • ' + contact.truckId : ''}
        </span>
      </div>
      <div class="Header-content-actions">
        <div
          on:click={() => {
            handleFilter('all');
          }}>
          <Label
            status="inactive"
            text="All Messages"
            iconLeft="message"
            iconColor={filter === 'all' ? '#243E93' : ''}
            backgroundColor={colors.tablegray} />
        </div>
        <div
          on:click={() => {
            handleFilter('macros');
          }}>
          <Label
            status="inactive"
            text="Macros"
            iconLeft="macro"
            iconColor={filter === 'macros' ? '#243E93' : ''}
            backgroundColor={colors.tablegray} />
        </div>
        <div
          on:click={() => {
            handleFilter('orders');
          }}>
          <Label
            status="inactive"
            text="Orders"
            iconLeft="orders"
            iconColor={filter === 'orders' ? '#243E93' : ''}
            backgroundColor={colors.tablegray} />
        </div>
        <div
          on:click={() => {
            console.log(' #TODO ');
          }}>
          <Label
            status="inactive"
            iconLeft="overflow"
            backgroundColor={colors.tablegray} />
        </div>
      </div>
    </div>
  {:else}
    <div class="Header-content-all">
      <div class="Header-content-title">
        <span>All Messages</span>
      </div>
      <div class="Header-content-actions">
        <div
          on:click={() => {
            handleFilter('all');
          }}>
          <Label
            status="inactive"
            text="All Messages"
            iconLeft="message"
            iconColor={filter === 'all' ? '#243E93' : ''}
            backgroundColor={colors.tablegray} />
        </div>
        <div
          on:click={() => {
            handleFilter('macros');
          }}>
          <Label
            status="inactive"
            text="Macros"
            iconLeft="macro"
            iconColor={filter === 'macros' ? '#243E93' : ''}
            backgroundColor={colors.tablegray} />
        </div>
        <div
          on:click={() => {
            handleFilter('orders');
          }}>
          <Label
            status="inactive"
            text="Orders"
            iconLeft="orders"
            iconColor={filter === 'orders' ? '#243E93' : ''}
            backgroundColor={colors.tablegray} />
        </div>
        <div
          on:click={() => {
            console.log(' #TODO ');
          }}>
          <Label
            status="inactive"
            iconLeft="overflow"
            backgroundColor={colors.tablegray} />
        </div>
      </div>
    </div>
  {/if}
</div>
