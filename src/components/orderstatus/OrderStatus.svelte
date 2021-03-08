<script>
  import Card from '../card/Card.svelte';
  import TabMenu from '../tabmenu/TabMenu.svelte';
  import Divider from '../divider/Divider.svelte';

  export let orderStatusData = undefined;
  console.log(orderStatusData);
</script>

<section class="OrderStatus">
  <Card type="card-gray-bg">
    <h6 class="OrderStatus-headerText">Order Status</h6>

    <div class="uk-flex">
      <div class="uk-width-1-3">
        <Card type="input-card"
          ><div class="OrderStatus-cardSection">
            Something
            <!-- TODO: ADD ORDER STATUS PART -->
          </div></Card
        >
      </div>
      <div style="margin-left: 4px;" />
      <div class="uk-width-2-3">
        <Card type="input-card"
          ><div class="OrderStatus-cardSection">
            <TabMenu
              type="default"
              tabs={['TIMELINE', 'CUSTOMER INFO', 'REFERENCE NUMBERS']}
            />
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
              <div class="OrderStatus-timelineContent">
                <p class="OrderStatus-timelineContentText">
                  {orderStatusData.timeline.uploadedDocs}
                </p>
              </div>
              <Divider />
              <h4 class="OrderStatus-timelineHeader">
                Driver / Delivery Notes
              </h4>
              <div class="OrderStatus-timelineContent">
                <p class="OrderStatus-timelineContentText">
                  {orderStatusData.timeline.deliveryNotes}
                </p>
              </div>
            </div>
          </div></Card
        >
      </div>
    </div>
  </Card>
</section>

<style src="./OrderStatus.scss"></style>
