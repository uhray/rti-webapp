<script>
  import Input from '../../input/Input.svelte';
  import Divider from '../../divider/Divider.svelte';
  import Label from '../../label/Label.svelte';
  import Button from '../../button/Button.svelte';
</script>

<style src="./TimeOff.scss">

</style>

<section class="TimeOff">
  <div id="TimeOff-modal" uk-modal>
    <div class="TimeOff-modalBody uk-modal-dialog uk-modal-body">
      <h2 class="TimeOff-header">Time Off</h2>
      <Divider type="default" />
      <br />
      <Input label="First Name" placeholder="First Name" fill />
      <Input label="Last Name" placeholder="Last Name" fill />
      <Input label="Start Date" placeholder="Start Date" fill />
      <Input label="End Date" placeholder="End Date" fill />
      <br />
      <label>Select Status</label>
      <div class="uk-flex">
        <div class="TimeOff-status">
          <Label status="warning" text="Pending" />
        </div>
        <div class="TimeOff-status">
          <Label status="success" text="Approved" />
        </div>
        <div class="TimeOff-status">
          <Label status="danger" text="Declined" />
        </div>
      </div>
      <br />
      <div class="TimeOff-bottomGroup">
        <Divider type="default" />
        <div style="margin-top: 9px;" />
        <div class="uk-flex uk-align-right TimeOff-buttons">
          <Button outline fill>Message</Button>
          <div style="margin-left: 6px;" />
          <Button primary fill>Save</Button>
        </div>
      </div>
    </div>
  </div>
</section>
