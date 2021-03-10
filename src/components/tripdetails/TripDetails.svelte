<script>
  import Divider from '../divider/Divider.svelte';
  import Icon from '../icon/Icon.svelte';
  export let order = undefined;

  let isOpen = true;

  const toggle = () => {
    isOpen = !isOpen;
  };
</script>

<style src="./TripDetails.scss">

</style>

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
      <br />
      <Divider secondary />
      <br />

      <div class="TripDetails-content-row">
        <div class="TripDetails-content-cell">
          <h4>Start Point</h4>
          <span>{order.startPoint}</span>
        </div>
        <div class="TripDetails-content-cell">
          <h4>End Point</h4>
          <span>{order.endPoint}</span>
        </div>
        <div class="TripDetails-content-cell">
          <h4>Vehicle Number</h4>
          <span>{order.vehicle}</span>
        </div>
        <div class="TripDetails-content-cell">
          <h4>Total Miles</h4>
          <span>{order.totalMiles} mi</span>
        </div>
        <div class="TripDetails-content-cell">
          <h4>Est. Weight</h4>
          <span>{order.estWeight} lbs</span>
        </div>
      </div>
    </div>
  {/if}
</div>

<!-- ==== -->
