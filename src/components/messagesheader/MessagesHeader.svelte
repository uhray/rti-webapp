<script>
  import Label from '../../components/Label/label.svelte';
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
        <Label type="dis-icon-blue" text="disabled" />
      </div>
      <div>
        <Label type="dis-icon-blue" text="disabled" />
      </div>
      <div>
        <Label type="dis-icon-blue" text="disabled" />
      </div>
      <div>
        <Label type="dis-icon-blue" text="disabled" />
      </div>
    </div>
  </div>
</div>
