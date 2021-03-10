<script>
  import Label from '../../components/Label/label.svelte';
  import { colors } from '../../theme/variables';
  export let name = undefined;
  export let vehicle = undefined;
  export let tag = undefined;
</script>

<style src="./MessagesHeader.scss">

</style>

<!-- <Label type="dis-icon-blue" text="disabled" /> -->
<div class="Header">
  <div class="Header-photo">RE</div>
  <div class="Header-content">
    <div class="Header-content-details">
      <span class="Header-content-name">{name}</span>
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
</div>
