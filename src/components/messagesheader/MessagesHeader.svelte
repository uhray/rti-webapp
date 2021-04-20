<script>
  import Label from '../../components/label/Label.svelte';
  import { colors } from '../../theme/variables';
  export let contact = undefined;
</script>

<style src="./MessagesHeader.scss">

</style>

<div class="Header">

  {#if contact}
    <div class="Header-photo">
      <img src={contact.avatarUrl || ''} alt={contact.name || ''} />
    </div>

    <div class="Header-content">
      <div class="Header-content-details">
        <span class="Header-content-name">
          {contact ? contact.name : 'All Messages'}
        </span>
        <span class="Header-content-vehicle">
          {contact.username.toUpperCase()} • {contact.truckId}
        </span>
      </div>
      <div class="Header-content-actions">
        <div>
          <Label
            status="disabled"
            text="All Messages"
            iconLeft="message"
            iconColor="#243E93"
            backgroundColor={colors.tablegray} />
        </div>
        <div>
          <Label
            status="disabled"
            text="Macros"
            iconLeft="macro-outline"
            backgroundColor={colors.tablegray} />
        </div>
        <div>
          <Label
            status="disabled"
            text="Orders"
            iconLeft="orders-outline"
            backgroundColor={colors.tablegray} />
        </div>
        <div>
          <Label
            status="disabled"
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
        <div>
          <Label
            status="disabled"
            text="All Messages"
            iconLeft="message"
            iconColor="#243E93"
            backgroundColor={colors.tablegray} />
        </div>
        <div>
          <Label
            status="disabled"
            text="Macros"
            iconLeft="macro-outline"
            backgroundColor={colors.tablegray} />
        </div>
        <div>
          <Label
            status="disabled"
            text="Orders"
            iconLeft="orders-outline"
            backgroundColor={colors.tablegray} />
        </div>
        <div>
          <Label
            status="disabled"
            iconLeft="overflow"
            backgroundColor={colors.tablegray} />
        </div>
      </div>
    </div>
  {/if}
</div>
