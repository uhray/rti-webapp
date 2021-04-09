<script>
  import Divider from '../../divider/Divider.svelte';

  export let orderStatusData = undefined;
</script>

<section class="OrderStatus">
  <div class="OrderStatus-timelineSection">
    <div class="uk-flex">
      <div class="uk-width-1-1">
        <h4 class="OrderStatus-timelineHeader">Reference Numbers</h4>
        <div class="OrderStatus-timelineContent">
          <p class="OrderStatus-timelineContentText">
            Customer Order Id: {orderStatusData.refNumbers.customerOrderId}
          </p>
          <p class="OrderStatus-timelineContentText">
            Stop Reference: {orderStatusData.refNumbers.stopRef}
          </p>
          <p class="OrderStatus-timelineContentText">
            DICT#: {orderStatusData.refNumbers.dictNum}
          </p>
        </div>
      </div>
    </div>
    <Divider />
    <div class="uk-flex">
      <div class="uk-width-1-1">
        <h4 class="OrderStatus-timelineHeader">Order Marks</h4>
        <div class="OrderStatus-timelineContent">
          <p class="OrderStatus-timelineContentText">
            {orderStatusData.refNumbers.orderMarks}
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<style src="../OrderStatus.scss">
</style>
