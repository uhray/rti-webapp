<script>
  import Label from '../../components/label/Label.svelte';
  import { colors } from '../../theme/variables';
  export let contact;
  export let name = undefined;
  export let vehicle = undefined;
  export let tag = undefined;

  console.log(contact);
</script>

<style src="./MessagesHeader.scss">

</style>

<div class="Header">

  {#if contact}
    <!-- #TODO: needs to become profile picture -->
    <div class="Header-photo">
      <img src={contact.pic || ''} alt={contact.name || ''} />
    </div>

    <div class="Header-content">
      <div class="Header-content-details">
        <!-- #TODO: remove id -->
        <span class="Header-content-name">{contact.name} • {contact.id}</span>
        <span class="Header-content-vehicle">{tag} • {vehicle}</span>
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
    <!-- #TODO: needs to become profile picture -->

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
