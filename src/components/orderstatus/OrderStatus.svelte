<script>
  import Card from '../card/Card.svelte';
  import TabMenu from '../tabmenu/TabMenu.svelte';
  import Label from '../label/Label.svelte';
  import Icon from '../icon/Icon.svelte';
  import TimelineSection from './sections/TimelineSection.svelte';
  import CustomerSection from './sections/CustomerSection.svelte';
  import ReferenceSection from './sections/ReferenceSection.svelte';
  import { capitalize } from '../../tools/capitalize.ts';
  import { formatDate } from '../../tools/formatDate.ts';
  import _ from 'lodash';

  export let order;
  let selectedStop = 0;
  let selectedTab = 'TIMELINE';

  function handleTab(tab) {
    selectedTab = tab;
  }

  $: {
    if (order && order.stops) {
      let findStop = _.findLastIndex(order.stops, { status: 'inProgress' });
      selectedStop = findStop === -1 ? 0 : findStop;
    }
  }
</script>

<style src="./OrderStatus.scss">

</style>

<!-- #TODO: Differentiate start time and end time per stop -->

{#if order && order.stops}
  <section class="OrderStatus">
    <Card type="card-gray-bg">
      <h6 class="OrderStatus-headerText">Order Status</h6>

      <div class="uk-flex">
        <div class="uk-width-1-4">
          <Card type="input-card-orders">
            <div class="OrderStatus-cardSection">
              <!-- FOR THE ORIGIN -->
              <div
                class={`uk-flex OrderStatus-statusCard clickable ${selectedStop === 0 ? 'active' : ''}`}
                on:click={() => (selectedStop = 0)}>
                <div class="OrderStatus-locationIcon">
                  <Icon type="location-start" color="gray" />
                </div>
                <div class="uk-width-1-1 uk-margin-small-right">
                  <h4 class="OrderStatus-cardHeader">
                    {order.stops[0].company}
                    <span style="height: 2em; width: 2em;">
                      <Icon type="chev-right" color="black" />
                    </span>
                  </h4>
                  <p class="OrderStatus-cardText">
                    {`${order.stops[0].address.city}, ${order.stops[0].address.state} ${order.stops[0].address.zipcode} • ${formatDate(order.stops[0].startTime, true)}`}
                  </p>
                  <div class="OrderStatus-label">
                    <Label
                      status={order.stops[0].status === 'inProgress' ? 'default' : 'disabled'}
                      text={_.startCase(order.stops[0].status)} />
                  </div>
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
              {#each order.stops as stop, index}
                {#if index !== 0 && index !== order.stops.length - 1}
                  <div
                    class={`uk-flex OrderStatus-statusCard clickable ${selectedStop === index ? 'active' : ''}`}
                    on:click={() => (selectedStop = index)}>
                    <div class="OrderStatus-locationIcon">
                      <Icon type="indicator-outline" color="gray" />
                    </div>
                    <div class="uk-width-1-1 uk-margin-small-right">
                      <h4 class="OrderStatus-cardHeader">
                        {stop.company}
                        <span style="height: 2em; width: 2em;">
                          <Icon type="chev-right" color="black" />
                        </span>
                      </h4>
                      <p class="OrderStatus-cardText">
                        {`${stop.address.city}, ${stop.address.state} ${stop.address.zipcode} • ${formatDate(stop.startTime, true)}`}
                      </p>
                      <div class="OrderStatus-label">
                        <Label
                          status={stop.status === 'inProgress' ? 'default' : 'disabled'}
                          text={_.startCase(stop.status)} />
                      </div>
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
                {/if}
              {/each}

              <!-- FOR THE DESTINATION -->
              <div
                class={`uk-flex OrderStatus-statusCard clickable ${selectedStop === order.stops.length - 1 ? 'active' : ''}`}
                on:click={() => {
                  selectedStop = order.stops.length - 1;
                }}>
                <div class="OrderStatus-locationIcon">
                  <Icon type="location-end-filled" color="black" />
                </div>
                <div class="uk-width-1-1 uk-margin-small-right">
                  <h4 class="OrderStatus-cardHeader">
                    {order.stops[order.stops.length - 1].company}
                    <span style="height: 2em; width: 2em;">
                      <Icon type="chev-right" color="black" />
                    </span>
                  </h4>
                  <p class="OrderStatus-cardText">
                    {`${order.stops[order.stops.length - 1].address.city}, ${order.stops[order.stops.length - 1].address.state} ${order.stops[order.stops.length - 1].address.zipcode} • ${formatDate(order.stops[order.stops.length - 1].startTime, true)}`}
                  </p>
                  <Label
                    status={order.stops[order.stops.length - 1].status === 'inProgress' ? 'default' : 'disabled'}
                    text={_.startCase(order.stops[order.stops.length - 1].status)} />
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div style="margin-left: 4px;" />
        <div class="uk-width-3-4">
          <Card type="input-card">
            <div class="OrderStatus-cardSection">
              <TabMenu
                type="default"
                tabs={['TIMELINE', 'CUSTOMER INFO', 'REFERENCE NUMBERS']}
                {selectedTab}
                {handleTab} />

              {#if selectedTab === 'TIMELINE'}
                <!-- TIMELINE SECTION -->
                <TimelineSection
                  documents={order.documents}
                  stop={order.stops[selectedStop]}
                  index={selectedStop} />
              {:else if selectedTab === 'CUSTOMER INFO'}
                <!-- CUSTOMER INFO SECTION -->
                <CustomerSection stop={order.stops[selectedStop]} />
              {:else if selectedTab === 'REFERENCE NUMBERS'}
                <!-- REFERENCE SECTION -->
                <ReferenceSection stop={order.stops[selectedStop]} />
              {/if}
            </div>
          </Card>
        </div>
      </div>
    </Card>
  </section>
{/if}
