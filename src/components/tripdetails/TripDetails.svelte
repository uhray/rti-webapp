<script>
  import { beforeUpdate } from 'svelte';
  import Divider from '../divider/Divider.svelte';
  import Icon from '../icon/Icon.svelte';
  import _ from 'lodash';

  export let order = {};
  let s;
  let e;
  let start = '';
  let startCSZ = '';
  let end = '';
  let endCSZ = '';

  let isOpen = true;

  $: {
    if (order && order.stops) {
      s = _.first(order.stops).address;
      e = _.last(order.stops).address;
      start = `${s.addressLine1} ${s.addressLine2}`;
      startCSZ = `${s.city}, ${s.state} ${s.zipcode}`;
      end = `${e.addressLine1} ${e.addressLine2}`;
      endCSZ = `${e.city}, ${e.state} ${e.zipcode}`;
    }
  }

  const toggle = () => {
    isOpen = !isOpen;
  };
</script>

<!-- HTML -->
<div class="TripDetails">
  <div class="TripDetails-header">
    <h3>Trip Details</h3>
    <div class="TripDetails-header-toggle" on:click={toggle}>
      <span>Show Less</span>
      <Icon type={isOpen ? 'chev-up' : 'chev-down'} />
    </div>
  </div>

  {#if isOpen}
    <div class="TripDetails-content">
      <Divider secondary />
      <br />

      <div class="TripDetails-content-row">
        <div class="TripDetails-content-cell">
          <h4>Start Point</h4>
          <span>
            {start}
            <br />
            {startCSZ}
          </span>
        </div>
        <div class="TripDetails-content-cell">
          <h4>End Point</h4>
          <span>
            {end}
            <br />
            {endCSZ}
          </span>
        </div>
        <div class="TripDetails-content-cell">
          <h4>Vehicle Number</h4>
          <span>{order.assignedTruck}</span>
        </div>
        <div class="TripDetails-content-cell">
          <h4>Total Miles</h4>
          <span>{order.mileage} mi</span>
        </div>
        <div class="TripDetails-content-cell">
          <h4>Est. Weight</h4>
          <span>{order.currentWeight} lbs</span>
        </div>
      </div>
    </div>
  {/if}
</div>

<!-- ==== -->

<style src="./TripDetails.scss">
</style>
