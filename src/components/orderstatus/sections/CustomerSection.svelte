<script>
  import { formatPhoneNumber } from '../../../tools/tools';

  import Divider from '../../divider/Divider.svelte';

  export let stop;
</script>

{#if stop}
  <section class="OrderStatus">
    <div class="OrderStatus-timelineSection">
      <div class="uk-flex">
        <div class="uk-width-1-2">
          <h4 class="OrderStatus-timelineHeader">Customer</h4>
          <div class="OrderStatus-timelineContent">
            <p class="OrderStatus-timelineContentText">
              {stop.company || stop.address.city || '-'}
            </p>
          </div>
        </div>
        <div class="uk-width-1-2">
          <h4 class="OrderStatus-timelineHeader">Customer ID</h4>
          <div class="OrderStatus-timelineContent">
            <p class="OrderStatus-timelineContentText">
              {stop.companyId || '-'}
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
              {`${stop.address.addressLine1} ${stop.address.addressLine2} ${stop.address.city}, ${stop.address.state} ${stop.address.zipcode}`}
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
              {formatPhoneNumber(stop.companyPhoneNumber) || '-'}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
{/if}

<style src="../OrderStatus.scss">
</style>
