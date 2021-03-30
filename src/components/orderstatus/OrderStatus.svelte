<script>
  import Card from '../card/Card.svelte';
  import TabMenu from '../tabmenu/TabMenu.svelte';
  import Label from '../label/Label.svelte';
  import Icon from '../icon/Icon.svelte';
  import TimelineSection from './sections/TimelineSection.svelte';
  import CustomerSection from './sections/CustomerSection.svelte';
  import ReferenceSection from './sections/ReferenceSection.svelte';

  export let orderStatusData = undefined;
  export let inProgress = true;
</script>

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
              <div class="uk-width-1-1 uk-margin-small-right">
                <h4 class="OrderStatus-cardHeader">
                  {orderStatusData.dispatchedFrom.name}
                  <span style="height: 2em; width: 2em;">
                    <Icon type="chev-right" color="black" />
                  </span>
                </h4>
                <p class="OrderStatus-cardText">
                  {`${orderStatusData.dispatchedFrom.location} • ${orderStatusData.dispatchedFrom.day}, ${orderStatusData.dispatchedFrom.time}`}
                </p>
                <Label
                  status="disabled"
                  text={orderStatusData.dispatchedFrom.status}
                />
              </div>
              <div class="OrderStatus-cardLine">
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
              </div>
            </div>

            <!-- ARRAY OF MIDDLE STOPS -->
            <div class="uk-flex OrderStatus-statusCard">
              <div class="OrderStatus-locationIcon">
                <Icon type="indicator-outline" color="gray" />
              </div>
              <div class="uk-width-1-1 uk-margin-small-right">
                <h4 class="OrderStatus-cardHeader">
                  {orderStatusData.stopPoints[0].name}
                  <span style="height: 2em; width: 2em;">
                    <Icon type="chev-right" color="black" />
                  </span>
                </h4>
                <p class="OrderStatus-cardText">
                  {`${orderStatusData.stopPoints[0].location} • ${orderStatusData.stopPoints[0].day}, ${orderStatusData.stopPoints[0].time}`}
                </p>
                <Label
                  status="disabled"
                  text={orderStatusData.stopPoints[0].status}
                />
              </div>
              <div class="OrderStatus-cardLine">
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
                <div>·</div>
              </div>
            </div>

            <!-- FOR THE DESTINATION -->
            <div
              class={inProgress
                ? 'uk-flex OrderStatus-statusCard active'
                : 'uk-flex OrderStatus-statusCard'}
            >
              <div class="OrderStatus-locationIcon">
                <Icon type="location-end-filled" color="black" />
              </div>
              <div class="uk-width-1-1 uk-margin-small-right">
                <h4 class="OrderStatus-cardHeader">
                  {orderStatusData.destination.name}
                  <span style="height: 2em; width: 2em;">
                    <Icon type="chev-right" color="black" />
                  </span>
                </h4>
                <p class="OrderStatus-cardText">
                  {`${orderStatusData.destination.location} • ${orderStatusData.destination.day}, ${orderStatusData.destination.time}`}
                </p>
                <Label
                  status="default"
                  text={orderStatusData.destination.status}
                />
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
              tabs={['TIMELINE', 'CUSTOMER INFO', 'REFERENCE NUMBERS']}
            />
            <!-- TIMELINE SECTION -->
            <TimelineSection {orderStatusData} />
            <!-- CUSTOMER INFO SECTION -->
            <!-- <CustomerSection {orderStatusData} /> -->
            <!-- REFERENCE SECTION -->
            <!-- <ReferenceSection {orderStatusData} /> -->
          </div>
        </Card>
      </div>
    </div>
  </Card>
</section>

<style src="./OrderStatus.scss">
</style>
