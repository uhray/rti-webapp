<script>
  import Card from '../card/Card.svelte';
  import TabMenu from '../tabmenu/TabMenu.svelte';
  import Divider from '../divider/Divider.svelte';
  import Label from '../label/Label.svelte';
  import Icon from '../icon/Icon.svelte';

  export let orderStatusData = undefined;
  export let inProgress = true;
</script>

<style src="./OrderStatus.scss">

</style>

<section class="OrderStatus">
  <Card type="card-gray-bg">
    <h6 class="OrderStatus-headerText">Order Status</h6>

    <div class="uk-flex">
      <div class="uk-width-1-4">
        <Card type="input-card-orders">
          <div class="OrderStatus-cardSection">
            <!-- FOR THE ORIGIN -->
            <div class="uk-flex OrderStatus-statusCard">
              <div class="OrderStatus-locationIcon">
                <Icon type="location-start" color="gray" />
              </div>
              <div>
                <h4 class="OrderStatus-cardHeader">
                  {orderStatusData.dispatchedFrom.name}
                </h4>
                <p class="OrderStatus-cardText">
                  {`${orderStatusData.dispatchedFrom.location} • ${orderStatusData.dispatchedFrom.day}, ${orderStatusData.dispatchedFrom.time}`}
                </p>
                <Label
                  status="disabled"
                  text={orderStatusData.dispatchedFrom.status} />
              </div>
              <div class="OrderStatus-chevron">
                <Icon type="chev-right" color="black" />
              </div>
            </div>
            <br />

            <!-- ARRAY OF MIDDLE STOPS -->
            <div class="uk-flex OrderStatus-statusCard">
              <div class="OrderStatus-locationIcon">
                <Icon type="indicator-outline" color="gray" />
              </div>
              <div>
                <h4 class="OrderStatus-cardHeader">
                  {orderStatusData.stopPoints[0].name}
                </h4>
                <p class="OrderStatus-cardText">
                  {`${orderStatusData.stopPoints[0].location} • ${orderStatusData.stopPoints[0].day}, ${orderStatusData.stopPoints[0].time}`}
                </p>
                <Label
                  status="disabled"
                  text={orderStatusData.stopPoints[0].status} />
              </div>
              <div class="OrderStatus-chevron">
                <Icon type="chev-right" color="black" />
              </div>
            </div>

            <br />
            <!-- FOR THE DESTINATION -->
            <div
              class={inProgress ? 'uk-flex OrderStatus-statusCard active' : 'uk-flex OrderStatus-statusCard'}>
              <div class="OrderStatus-locationIcon">
                <Icon type="location-end-filled" color="black" />
              </div>
              <div>
                <h4 class="OrderStatus-cardHeader">
                  {orderStatusData.destination.name}
                </h4>
                <p class="OrderStatus-cardText">
                  {`${orderStatusData.destination.location} • ${orderStatusData.destination.day}, ${orderStatusData.destination.time}`}
                </p>
                <Label
                  status="default"
                  text={orderStatusData.destination.status} />
              </div>
              <div class="OrderStatus-chevron">
                <Icon type="chev-right" color="black" />
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div style="margin-left: 4px;" />
      <div class="uk-width-3-4">
        <Card type="input-card">
          <div class="OrderStatus-cardSection">
            <!-- TODO: Gray out inactive tabs -->
            <TabMenu
              type="default"
              tabs={['TIMELINE', 'CUSTOMER INFO', 'REFERENCE NUMBERS']} />
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
              <h4 class="OrderStatus-timelineHeader">
                Driver / Delivery Notes
              </h4>
              <div class="OrderStatus-timelineContent">
                <p class="OrderStatus-timelineContentText">
                  {orderStatusData.timeline.deliveryNotes}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </Card>
</section>
