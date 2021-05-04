<script>
  import Divider from '../../divider/Divider.svelte';
  import Icon from '../../icon/Icon.svelte';
  import moment from 'moment';

  export let stop;
</script>

<style src="../OrderStatus.scss">

</style>

{#if stop}
  <section class="OrderStatus">
    <div class="OrderStatus-timelineSection">
      <div class="uk-flex">
        <div class="uk-width-1-2">
          <h4 class="OrderStatus-timelineHeader">Trailer #</h4>
          <div class="OrderStatus-timelineContent">
            <p class="OrderStatus-timelineContentText">{stop.trailerNumber}</p>
          </div>
        </div>
        <div class="uk-width-1-2">
          <h4 class="OrderStatus-timelineHeader">Event</h4>
          <div class="OrderStatus-timelineContent">
            <p class="OrderStatus-timelineContentText">{stop.stopType}</p>
          </div>
        </div>
      </div>
      <Divider />
      <div class="uk-flex">
        <div class="uk-width-1-2">
          <h4 class="OrderStatus-timelineHeader">Appointment Time</h4>
          <div class="OrderStatus-timelineContent">
            <p class="OrderStatus-timelineContentText">
              {moment(stop.appointmentTime).format('MMM D, YYYY • h:mm a')}
            </p>
          </div>
        </div>
        <div class="uk-width-1-2">
          <h4 class="OrderStatus-timelineHeader">Arrival Time</h4>
          <div class="OrderStatus-timelineContent">
            <p class="OrderStatus-timelineContentText">
              {moment(stop.endTime).format('MMM D, YYYY • h:mm a')}
            </p>
          </div>
        </div>
      </div>
      <Divider />
      <h4 class="OrderStatus-timelineHeader">Uploaded Documents</h4>
      <div class="OrderStatus-timelineContent uk-flex">
        {#if stop.documents}
          {#each stop.documents as document}
            <div class="OrderStatus-file">
              <Icon type="file" color="#a6adc4" />
            </div>
            <p class="OrderStatus-timelineContentText grayed">{document}</p>
          {/each}
        {/if}
      </div>
      <Divider />
      <h4 class="OrderStatus-timelineHeader">Driver / Delivery Notes</h4>
      <div class="OrderStatus-timelineContent">
        <p class="OrderStatus-timelineContentText">{stop.driverNotes}</p>
      </div>
    </div>
  </section>
{/if}
