<script>
  import Divider from '../../divider/Divider.svelte';
  import Icon from '../../icon/Icon.svelte';

  export let orderStatusData = undefined;
</script>

<section class="OrderStatus">
  <div class="OrderStatus-timelineSection">
    <div class="uk-flex">
      <div class="uk-width-1-2">
        <h4 class="OrderStatus-timelineHeader">Trailer #</h4>
        <div class="OrderStatus-timelineContent">
          <p class="OrderStatus-timelineContentText">
            {orderStatusData.timeline.trailerNum}
          </p>
        </div>
      </div>
      <div class="uk-width-1-2">
        <h4 class="OrderStatus-timelineHeader">Event</h4>
        <div class="OrderStatus-timelineContent">
          <p class="OrderStatus-timelineContentText">
            {orderStatusData.timeline.event}
          </p>
        </div>
      </div>
    </div>
    <Divider />
    <div class="uk-flex">
      <div class="uk-width-1-2">
        <h4 class="OrderStatus-timelineHeader">Appointment Time</h4>
        <div class="OrderStatus-timelineContent">
          <p class="OrderStatus-timelineContentText">
            {orderStatusData.timeline.apptTime}
          </p>
        </div>
      </div>
      <div class="uk-width-1-2">
        <h4 class="OrderStatus-timelineHeader">Arrival Time</h4>
        <div class="OrderStatus-timelineContent">
          <p class="OrderStatus-timelineContentText">
            {orderStatusData.timeline.arrivalTime}
          </p>
        </div>
      </div>
    </div>
    <Divider />
    <h4 class="OrderStatus-timelineHeader">Uploaded Documents</h4>
    <div class="OrderStatus-timelineContent uk-flex">
      <div class="OrderStatus-file">
        <Icon type="file" color="#a6adc4" />
      </div>
      <p class="OrderStatus-timelineContentText grayed">
        {orderStatusData.timeline.uploadedDocs}
      </p>
    </div>
    <Divider />
    <h4 class="OrderStatus-timelineHeader">Driver / Delivery Notes</h4>
    <div class="OrderStatus-timelineContent">
      <p class="OrderStatus-timelineContentText">
        {orderStatusData.timeline.deliveryNotes}
      </p>
    </div>
  </div>
</section>

<style src="../OrderStatus.scss">
</style>
