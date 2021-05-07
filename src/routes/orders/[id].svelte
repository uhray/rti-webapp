<script context="module">
  import _ from 'lodash';

  export async function preload(page, session) {
    const { id } = page.params;

    return { id };
  }
</script>

<script>
  import { onMount } from 'svelte';
  import OrderHeader from './OrderHeader.svelte';
  import TripDetails from '../../components/tripdetails/TripDetails.svelte';
  import OrderStatus from '../../components/orderstatus/OrderStatus.svelte';
  import Table from '../../components/table/Table.svelte';
  import Button from '../../components/button/Button.svelte';
  import RichText from '../../components/richtext/RichText.svelte';
  import MessageAttachments from '../../components/MessageAttachments/MessageAttachments.svelte';
  import { getOrder, editPost } from '../../tools/crudApi.ts';
  import { uuid } from '../../tools/uuid.ts';
  import { userStore, postsStore } from '../../store.ts';

  export let id;
  let order = undefined;
  let displayMessageOverlay = false;
  let sendConfirmation = false;
  let canSubmit = false;
  let message = '';
  let posts;
  let attachments = [];
  const headers = [
    { header: 'filename', text: 'File Name' },
    { header: 'size', text: 'Size' },
    { header: 'location', text: 'Location' },
    { header: 'createdAt', text: 'Time Uploaded' },
    { header: 'view', text: 'View' },
    { header: 'actions', text: 'Actions' },
  ];

  $: posts = $postsStore.posts;
  $: me = $userStore.user;

  onMount(async () => {
    order = await getOrder(id);
  });

  function toggleMessage() {
    displayMessageOverlay = true;
  }

  function clearOverlayData() {
    sendConfirmation = false;
    canSubmit = false;
    message = '';
    displayMessageOverlay = false;
  }

  function handleInput(input, basicContent) {
    if (basicContent.length > 1) {
      message = input;
      canSubmit = true;
    } else {
      message = '';
      canSubmit = false;
    }
  }

  function send() {
    const p = _.find(posts, { orderId: order.orderId });

    if (p) {
      p.subthread.push({ from: me._id, message: message });
      if (attachments) {
        attachments.forEach(a => {
          p.attachments.push(a);
        });
      }
      let payload = p;

      editPost(p._id, payload)
        .then(res => {
          posts = posts.map(p => (p._id === res._id ? res : p));
          postsStore.setPosts(posts);
          sendConfirmation = true;
        })
        .catch(err => {
          console.log('Error adding reply: ', err);
        });
    }
  }

  function addAttachment() {
    attachments.push({
      name: 'Cybertruck',
      format: 'image',
      fileUrl: 'https://cdn.motor1.com/images/mgl/2RpBB/s1/tesla-truck.jpg',
      size: '12 MB',
    });
    attachments = attachments;
  }

  function removeAttachment(data) {
    const filteredAttachments = attachments.filter(
      a => a.fileUrl !== data.fileUrl
    );
    attachments = filteredAttachments;
  }

  function mapDocs(docs) {
    return docs.map(d => {
      if (d.stopIndex !== undefined && d.stopIndex !== null) {
        return { ...d, location: order.stops[d.stopIndex].companyId };
      } else {
        return { ...d, location: '' };
      }
    });
  }
</script>

<style lang="scss">
  .Order {
    padding: 2em;
    h3 {
      line-height: 1.25;
      margin-bottom: 0.5em;
    }
  }
  .MessageOverlay {
    box-sizing: border-box;
    position: fixed;
    z-index: 2000;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(22, 29, 53, 0.3);

    display: flex;
    justify-content: center;
    align-items: center;

    div {
      box-sizing: border-box;
    }

    .MessageOverlay-container {
      position: relative;
      width: 600px;
      max-height: 800px;
      background: #fff;
      border-radius: 8px;
      padding: 44px 30px 30px;
    }
    .MessageOverlay-close {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .MessageOverlay-title {
      font-weight: 500;
      font-size: 20px;
      margin-bottom: 30px;
    }
    .MessageOverlay-message {
      font-size: 15px;
      margin-bottom: 30px;
    }
    .MessageOverlay-form {
      display: flex;
      flex-flow: column;
    }

    .MessageOverlay-labels {
      display: flex;
      flex-flow: row wrap;
    }
    .MessageOverlay-label {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      align-self: flex-start;
      height: 28px;
      background: rgba(36, 62, 147, 0.05);
      border-radius: 4px;
      padding: 2px 4px 2px 8px;
      font-size: 14px;
      margin-bottom: 5px;
      margin-right: 5px;
    }
    .MessageOverlay-input {
      width: 100%;
      margin-bottom: 10px;
    }
    .MessageOverlay-inputLabel {
      font-size: 12px;
      font-weight: 500;
    }
    .MessageOverlay-inputLabelSub {
      font-size: 12px;
      font-weight: 400;
      color: #a6adc4;
    }
    .MessageOverlay-rte {
      max-height: 400px;
      margin-bottom: 30px;
    }
    .MessageOverlay-buttons {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
      align-items: center;
    }
    .MessageOverlay-button {
      margin-right: 10px;
    }
  }
</style>

<svelte:head>
  <title>Order #{order && order.orderId ? order.orderId : ''}</title>
</svelte:head>

{#if order}
  <OrderHeader {order} {toggleMessage} />

  <div class="Order">
    <TripDetails {order} />

    <!-- #TODO MAP DOCUMENTS BASED ON UPLOAD -->
    {#if order.documents && order.documents.length > 0}
      <h3>Uploaded Documents</h3>

      <Table {headers} data={mapDocs(order.documents)} height={'267px'} />
    {/if}

    <div style="margin-top: 18px;" />

    <OrderStatus {order} />
  </div>
{:else}
  <div class="Loader">
    <div uk-spinner="ratio: 2" />
  </div>
{/if}

{#if displayMessageOverlay}
  <div class="MessageOverlay">

    <div class="MessageOverlay-container">
      {#if sendConfirmation}
        <div
          class="MessageOverlay-close clickable"
          on:click={() => {
            clearOverlayData();
          }}>
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.78906 6.5L11.8125 2.51562L12.6328 1.69531C12.75 1.57812
              12.75 1.38281 12.6328 1.22656L11.7734 0.367188C11.6172 0.25
              11.4219 0.25 11.3047 0.367188L6.5 5.21094L1.65625 0.367188C1.53906
              0.25 1.34375 0.25 1.1875 0.367188L0.328125 1.22656C0.210938
              1.38281 0.210938 1.57812 0.328125 1.69531L5.17188 6.5L0.328125
              11.3438C0.210938 11.4609 0.210938 11.6562 0.328125 11.8125L1.1875
              12.6719C1.34375 12.7891 1.53906 12.7891 1.65625 12.6719L6.5
              7.82812L10.4844 11.8516L11.3047 12.6719C11.4219 12.7891 11.6172
              12.7891 11.7734 12.6719L12.6328 11.8125C12.75 11.6562 12.75
              11.4609 12.6328 11.3438L7.78906 6.5Z"
              fill="#A6ADC4" />
          </svg>
        </div>
        <div class="MessageOverlay-title">Confirmation</div>

        <div class="MessageOverlay-message">Message was sent successfully.</div>

        <div class=" MessageOverlay-buttons">
          <div
            class="MessageOverlay-button"
            on:click={() => {
              clearOverlayData();
            }}>
            <Button primary>Got it</Button>
          </div>

        </div>
      {:else}
        <div
          class="MessageOverlay-close clickable"
          on:click={() => {
            clearOverlayData();
          }}>
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.78906 6.5L11.8125 2.51562L12.6328 1.69531C12.75 1.57812
              12.75 1.38281 12.6328 1.22656L11.7734 0.367188C11.6172 0.25
              11.4219 0.25 11.3047 0.367188L6.5 5.21094L1.65625 0.367188C1.53906
              0.25 1.34375 0.25 1.1875 0.367188L0.328125 1.22656C0.210938
              1.38281 0.210938 1.57812 0.328125 1.69531L5.17188 6.5L0.328125
              11.3438C0.210938 11.4609 0.210938 11.6562 0.328125 11.8125L1.1875
              12.6719C1.34375 12.7891 1.53906 12.7891 1.65625 12.6719L6.5
              7.82812L10.4844 11.8516L11.3047 12.6719C11.4219 12.7891 11.6172
              12.7891 11.7734 12.6719L12.6328 11.8125C12.75 11.6562 12.75
              11.4609 12.6328 11.3438L7.78906 6.5Z"
              fill="#A6ADC4" />
          </svg>
        </div>
        <div class="MessageOverlay-title">
          Send Message to Order #{order.orderId}
        </div>

        <div class="MessageOverlay-form">

          {#if attachments.length > 0}
            <div class="MessageOverlay-attachments">
              <MessageAttachments
                isDisplay={false}
                {removeAttachment}
                {attachments} />
            </div>
          {/if}

          <div class="MessageOverlay-rte">
            <RichText
              id={uuid()}
              {addAttachment}
              {handleInput}
              hideSend={true} />
          </div>

          <div class=" MessageOverlay-buttons">
            <div
              class="MessageOverlay-button"
              on:click={() => {
                clearOverlayData();
              }}>
              <Button primary outline>Cancel</Button>
            </div>

            <div on:click={send}>
              <Button primary disabled={!canSubmit}>Send Message</Button>
            </div>
          </div>

        </div>
      {/if}
    </div>

  </div>
{/if}
