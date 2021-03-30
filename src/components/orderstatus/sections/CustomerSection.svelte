<script>
  import Divider from '../../divider/Divider.svelte';
  import Icon from '../../icon/Icon.svelte';

  export let orderStatusData = undefined;
</script>

<section class="OrderStatus">
  <div class="OrderStatus-timelineSection">
    <div class="uk-flex">
      <div class="uk-width-1-2">
        <h4 class="OrderStatus-timelineHeader">Customer</h4>
        <div class="OrderStatus-timelineContent">
          <p class="OrderStatus-timelineContentText">
            {orderStatusData.customerInfo.customerName}
          </p>
        </div>
      </div>
      <div class="uk-width-1-2">
        <h4 class="OrderStatus-timelineHeader">Customer ID</h4>
        <div class="OrderStatus-timelineContent">
          <p class="OrderStatus-timelineContentText">
            {orderStatusData.customerInfo.customerID}
          </p>
        </div>
      </div>
    </div>
    <Divider />
    <div class="uk-flex">
      <div class="uk-width-1-2">
        <h4 class="OrderStatus-timelineHeader">Address</h4>
        <div class="OrderStatus-timelineContent">
          <p class="OrderStatus-timelineContentText">
            {orderStatusData.customerInfo.address}
          </p>
        </div>
      </div>
    </div>
    <Divider />
    <div class="uk-flex">
      <div class="uk-width-1-2">
        <h4 class="OrderStatus-timelineHeader">Phone Number</h4>
        <div class="OrderStatus-timelineContent">
          <p class="OrderStatus-timelineContentText">
            {orderStatusData.customerInfo.phoneNumber}
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<style src="../OrderStatus.scss">
</style>
