<script>
  import PostHeader from '../PostHeader/PostHeader.svelte';
  import Label from '../label/Label.svelte';
  import { capitalize } from '../../tools/tools.ts';
  import { userStore } from '../../store';

  export let me;
  export let post;
  export let order;
  export let resend;

  function formatAddressCSZ(addressObject) {
    if (addressObject) {
      let fullAddress = `${addressObject.city} ${addressObject.state} ${addressObject.zipcode}`;
      return fullAddress;
    } else {
      let defaultAddress = '12345 S. Streename Drive, City, STATE, zipcode';
      return defaultAddress;
    }
  }
</script>

{#if order && post}
  <PostHeader from={me} {post} {resend} />

  <div class="Card">
    <div class="Card-content">
      <div class="Card-header">
        <div class="Card-orderNumber">Order #{order.orderId}</div>
        <Label status={order.status} text={capitalize(order.status)} small />
      </div>

      <div class="OrderCard-stops">
        {#each order.stops as s, index}
          <div class="OrderCard-stop">
            <div class="OrderCard-stopDetails">
              {#if index === 0 || index === order.stops.length - 1}
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="OrderCard-svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4 0.75C1.93388 0.75 0.25 2.35223 0.25 4.33594C0.25
                    5.33164 0.716199 6.59607 1.52522 8.05696L1.5543
                    8.1093C2.09884 9.08595 2.73881 10.0492 3.36617 10.9L3.39799
                    10.9431C3.53812 11.1356 3.76188 11.2495 4 11.2495L4.01151
                    11.2494C4.24148 11.2459 4.45696 11.1362 4.59517
                    10.9524L4.60019 10.9456C5.24949 10.0688 5.91434 9.06966
                    6.47477 8.05777C7.28379 6.59705 7.75 5.33237 7.75
                    4.33594C7.75 2.35223 6.06612 0.75 4 0.75ZM4 1.5C5.66001 1.5
                    7 2.77501 7 4.33594C7 5.17202 6.5707 6.3366 5.81868
                    7.6944L5.79054 7.74503C5.26352 8.69009 4.64019 9.62796
                    4.03013 10.455L3.99998 10.4958L4.00258 10.4993C3.37128
                    9.64647 2.72358 8.67281 2.18133 7.69362C1.42931 6.33565 1
                    5.17128 1 4.33594C1 2.77501 2.33999 1.5 4 1.5ZM4 3C3.17157 3
                    2.5 3.67157 2.5 4.5C2.5 5.32843 3.17157 6 4 6C4.82843 6 5.5
                    5.32843 5.5 4.5C5.5 3.67157 4.82843 3 4 3ZM4 3.75C4.41421
                    3.75 4.75 4.08579 4.75 4.5C4.75 4.91421 4.41421 5.25 4
                    5.25C3.58579 5.25 3.25 4.91421 3.25 4.5C3.25 4.08579 3.58579
                    3.75 4 3.75Z"
                    fill="#15224B"
                  />
                </svg>
              {:else}
                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="OrderCard-svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6 1.625C3.30761 1.625 1.125 3.80761 1.125 6.5C1.125
                    9.19239 3.30761 11.375 6 11.375C8.69239 11.375 10.875
                    9.19239 10.875 6.5C10.875 3.80761 8.69239 1.625 6 1.625ZM6
                    2.375C8.27817 2.375 10.125 4.22183 10.125 6.5C10.125 8.77817
                    8.27817 10.625 6 10.625C3.72183 10.625 1.875 8.77817 1.875
                    6.5C1.875 4.22183 3.72183 2.375 6 2.375Z"
                    fill="#15224B"
                  />
                </svg>
              {/if}

              {#if index === 0}
                <span class="OrderCard-stopType">Start Point:&nbsp;&nbsp;</span>
              {:else if index === order.stops.length - 1}
                <span class="OrderCard-stopType">End Point:&nbsp;&nbsp;</span>
              {:else}
                <span class="OrderCard-stopType">
                  Stop {index}:&nbsp;&nbsp;
                </span>
              {/if}
              {s.company}
              <span class="OrderCard-address">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="OrderCard-svg"
                  viewBox="0 0 512 512"
                >
                  <title>Arrow Forward</title>
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="48"
                    d="M268 112l144 144-144 144M392 256H100"
                  />
                </svg>
                &nbsp;
                <i>{formatAddressCSZ(s.address) || ''}</i>
              </span>
            </div>
          </div>
        {/each}
      </div>
    </div>
    <a href={`/orders/${order._id}`}>
      <div class="Card-button clickable">View</div>
    </a>
  </div>
{/if}

<style src="./OrderMessageCard.scss">
</style>
