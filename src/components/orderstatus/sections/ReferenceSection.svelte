<script>
  import Divider from '../../divider/Divider.svelte';

  export let stop;
</script>

{#if stop}
  <!-- #TODO Figure out these variables -->
  <section class="OrderStatus">
    <div class="OrderStatus-timelineSection">
      <div class="uk-flex">
        <div class="uk-width-1-1">
          <h4 class="OrderStatus-timelineHeader">Reference Numbers</h4>
          <div class="OrderStatus-timelineContent">
            <p class="OrderStatus-timelineContentText">Customer Order Id:</p>
            <p class="OrderStatus-timelineContentText">Stop Reference:</p>
            <p class="OrderStatus-timelineContentText">DICT#:</p>
          </div>
        </div>
      </div>
      <Divider />
      <div class="uk-flex">
        <div class="uk-width-1-1">
          <h4 class="OrderStatus-timelineHeader">Order Marks</h4>
          <div class="OrderStatus-timelineContent">
            <p class="OrderStatus-timelineContentText">Hello</p>
          </div>
        </div>
      </div>
    </div>
  </section>
{/if}

<style src="./Section.scss">
</style>
