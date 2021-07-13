<script>
  import Divider from '../../divider/Divider.svelte';
  import Icon from '../../icon/Icon.svelte';
  import moment from 'moment';
  import { eventCodes } from '../../../tools/values';
  import _ from 'lodash';

  export let documents;
  export let stop;
  export let index;
  let event = '';

  $: {
    if (eventCodes[`${stop.event}`]) {
      event = eventCodes[`${stop.event}`];
    } else {
      event = stop.event;
    }
  }
</script>

{#if stop && documents}
  <section class="OrderStatus">
    <div class="OrderStatus-timelineSection">
      <div class="uk-flex">
        <div class="uk-width-1-2">
          <h4 class="OrderStatus-timelineHeader">Trailer #</h4>
          <div class="OrderStatus-timelineContent">
            <p class="OrderStatus-timelineContentText">
              {stop.trailerId || '-'}
            </p>
          </div>
        </div>
        <div class="uk-width-1-2">
          <h4 class="OrderStatus-timelineHeader">Event</h4>
          <div class="OrderStatus-timelineContent">
            <p class="OrderStatus-timelineContentText">
              {event}
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
              {moment(stop.startTime).format('MMM D, YYYY • h:mm a') || '-'}
            </p>
          </div>
        </div>
        <div class="uk-width-1-2">
          <h4 class="OrderStatus-timelineHeader">Arrival Time</h4>
          <div class="OrderStatus-timelineContent">
            <p class="OrderStatus-timelineContentText">
              {moment(stop.endTime).format('MMM D, YYYY • h:mm a') || '-'}
            </p>
          </div>
        </div>
      </div>
      <Divider />
      {#if documents.length}
        <h4 class=" OrderStatus-timelineHeader">Uploaded Documents</h4>
        <div class="OrderStatus-documents uk-flex">
          {#each documents as document}
            {#if document.stopIndex === index}
              <div class="OrderStatus-file">
                <Icon type="file" color="#161D35" />
              </div>
              <span class="OrderStatus-timelineContentText">
                {document.fileName || '-'}
                <span class="OrderStatus-filesize"
                  >({document.size || '-'})</span
                >
              </span>
            {/if}
          {/each}
        </div>
      {/if}
      <Divider />
      <h4 class="OrderStatus-timelineHeader">Driver / Delivery Notes</h4>
      <div class="OrderStatus-timelineContent">
        <p class="OrderStatus-timelineContentText">{stop.notes? 'Dilvery: ' : ''} {stop.notes || '-'}</p>
        <p class="OrderStatus-timelineContentText">{stop.driverNotes? 'Driver: ' : ''} {stop.driverNotes || ''}</p>
      </div>
    </div>
  </section>
{/if}

<style src="../OrderStatus.scss">
</style>
