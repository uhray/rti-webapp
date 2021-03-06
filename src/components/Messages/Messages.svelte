<script>
  import { onMount, afterUpdate } from 'svelte';
  import Header from './Header.svelte';
  import SearchBar from '../searchbar/SearchBar.svelte';
  import MessagesHeader from '../messagesheader/MessagesHeader.svelte';
  import ContactList from '../contactlist/ContactList.svelte';
  import MessagesDisplay from '../messagesdisplay/MessagesDisplay.svelte';
  import RichText from '../richtext/RichText.svelte';
  import Input from '../input/Input.svelte';
  import Button from '../button/Button.svelte';
  import MessageAttachments from '../MessageAttachments/MessageAttachments.svelte';
  import OverlayPreview from '../OverlayPreview/OverlayPreview.svelte';
  import _ from 'lodash';
  import moment from 'moment';
  import { addPost } from '../../tools/crudApi.ts';
  import { uuid } from '../../tools/tools.ts';
  import { userStore, postsStore, repliesStore } from '../../store';

  export let trigger;
  export let posts;
  export let me;
  export let contactsList = [];
  export let driversList = [];
  export let teamsList = [];
  export let driverClassList = [];
  export let orders;
  export let slug;
  export let loading;
  let filter = 'all';
  let search = '';

  // OVERLAY VARIABLES
  let displayMessageOverlay = false;
  let teamsToMessage = [];
  let driverClassesToMessage = [];
  const messageTypes = [
    'Safety',
    'Driver Logs',
    'Operations',
    'Dispatching',
    'Other',
  ];
  let selectedMessageTypes = [];
  let inputRecipients = '';
  let inputMessageType = '';
  let message = '';
  let canSubmit = false;
  let sendConfirmation = false;
  let attachments = [];

  let displayPreviewOverlay = false;
  let overlay;

  // afterUpdate(async () => {
  //   sortedPosts = _.chain(filterPosts(posts))
  //     .map(p => {
  //       let newP = p;

  //       newP.date = moment(
  //         new Date(
  //           p.postType === 'ORDER' ? p.updatedAt : p.createdAt
  //         ).toISOString()
  //       ).format('MMM D, YYYY');

  //       newP.sortDate = p.postType === 'ORDER' ? p.updatedAt : p.createdAt;

  //       return newP;
  //     })
  //     .sortBy('sortDate')
  //     .groupBy('date')
  //     .value();
  // });

  const toggleReplies = id => {
    const r = $repliesStore.replies.map(r =>
      r.id == id ? { id: r.id, display: !r.display } : r
    );

    repliesStore.setReplies(r);
  };

  function toggleMessageOverlay(team) {
    displayMessageOverlay = !displayMessageOverlay;
    teamsToMessage.push(team.name);
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

  function handleMessageTypeInput(v) {
    inputMessageType = v;
  }

  function handleRecipientInput(v) {
    inputRecipients = v;
  }

  function handleFilter(v) {
    filter = v;

    filterPosts();
  }

  function handleSearch(v) {
    search = v;
  }

  function filterPosts() {
    let fPosts;

    if (filter === 'all') {
      fPosts = $postsStore.posts.filter(i => !i.states.isArchived);
    } else if (filter === 'orders') {
      fPosts = $postsStore.posts.filter(
        i => i.postType === 'ORDER' && !i.states.isArchived
      );
    } else if (filter === 'macros') {
      fPosts = $postsStore.posts.filter(
        i => i.postType === 'MACRO' && !i.states.isArchived
      );
    }

    posts = fPosts;
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

  async function send() {
    let payload = {
      from: $userStore.user._id,
      postType: 'ALERT',
      message: message,
      tags: selectedMessageTypes,
      teamIds: teamsToMessage,
      driverClass: driverClassesToMessage,
    };
    let initPayload = _.cloneDeep(payload);
    let date = moment().toISOString();

    initPayload._id = uuid();
    initPayload.createdAt = date;
    initPayload.updatedAt = date;
    initPayload.sortDatetime = date;
    initPayload.states = {
      isArchived: false,
      isDeleted: false,
      deliveryStatus: 'SENDING',
    };
    initPayload.driverClass = [];
    initPayload.subthread = [];
    initPayload.attachments = [];

    postsStore.setPosts([initPayload, ...$postsStore.posts]);

    addPost({ post: payload, initPostId: initPayload._id }).then(res => {
      if (res.error) {
        postsStore.setPosts(
          $postsStore.posts.map(p =>
            p._id === initPayload._id
              ? {
                  ...p,
                  states: { ...p.states, deliveryStatus: 'ERROR' },
                  errorTime: date,
                }
              : p
          )
        );

        const localPosts = localStorage.getItem('errorAdminPosts');

        localStorage.setItem(
          `errorAdminPosts`,
          (localPosts ? localPosts : '') +
            (localPosts ? ', ' : '') +
            JSON.stringify({
              ...initPayload,
              errorTime: moment().toISOString(),
              states: { ...initPayload.states, deliveryStatus: 'ERROR' },
            })
        );
      } else {
        // TODO: no error
      }
    });

    clearOverlayData();
  }

  function clearOverlayData() {
    sendConfirmation = false;
    canSubmit = false;
    teamsToMessage = [];
    selectedMessageTypes = [];
    message = '';
    inputMessageType = undefined;
    displayMessageOverlay = false;
    displayPreviewOverlay = false;
  }

  function handlePreview() {
    displayPreviewOverlay = true;

    let overlay = document.getElementById('Overlay');

    if (overlay) {
      window.addEventListener('click', function (e) {
        if (overlay.contains(e.target)) {
        } else {
          clearOverlayData();
        }
      });
    }
  }
</script>

<svelte:head>
  <title>Messages</title>
</svelte:head>

<Header />

<div class="Messages">
  <div class="Messages-nav">
    <div class="Messages-nav-search">
      <SearchBar {search} {handleSearch} alternate />
    </div>
    <div class="Messages-nav-contacts">
      <ContactList
        slug={slug ? slug : 'all'}
        {driversList}
        {toggleMessageOverlay}
        {trigger}
        {search}
        {loading}
      />
    </div>
  </div>
  <div class="Messages-main">
    <div class="Messages-main-header">
      <MessagesHeader
        contact={_.find(contactsList, { id: slug })}
        {filter}
        {handleFilter}
        {handlePreview}
      />
    </div>
    <div id="Messages-Container" class="Messages-main-posts">
      <MessagesDisplay
        {posts}
        {me}
        {toggleReplies}
        contacts={contactsList}
        {orders}
        {slug}
        {loading}
      />
    </div>
  </div>
</div>

{#if displayMessageOverlay}
  <div class="MessageOverlay">
    <div class="MessageOverlay-container">
      {#if sendConfirmation}
        <div
          class="MessageOverlay-close clickable"
          on:click={() => {
            clearOverlayData();
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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
              fill="#A6ADC4"
            />
          </svg>
        </div>
        <div class="MessageOverlay-title">Confirmation</div>

        <div class="MessageOverlay-message">Message was sent successfully.</div>

        <div class=" MessageOverlay-buttons">
          <div
            class="MessageOverlay-button"
            on:click={() => {
              clearOverlayData();
            }}
          >
            <Button primary>Got it</Button>
          </div>
        </div>
      {:else}
        <div
          class="MessageOverlay-close clickable"
          on:click={() => {
            clearOverlayData();
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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
              fill="#A6ADC4"
            />
          </svg>
        </div>
        <div class="MessageOverlay-title">Fleet Message</div>

        <div class="MessageOverlay-form">
          <div class="MessageOverlay-labels">
            {#each teamsToMessage as team}
              <div class="MessageOverlay-label uk-flex">
                {team}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={'#15224B'}
                  xmlns="http://www.w3.org/2000/svg"
                  class="clickable"
                  on:click={() => {
                    teamsToMessage = teamsToMessage.filter(
                      t => teamsToMessage != team
                    );
                  }}
                >
                  <path
                    d="M12 4.25C7.71875 4.25 4.25 7.71875 4.25 12C4.25 16.2812
                    7.71875 19.75 12 19.75C16.2812 19.75 19.75 16.2812 19.75
                    12C19.75 7.71875 16.2812 4.25 12 4.25ZM12 18.75C8.28125
                    18.75 5.25 15.75 5.25 12C5.25 8.3125 8.25 5.25 12
                    5.25C15.6875 5.25 18.75 8.28125 18.75 12C18.75 15.7188
                    15.7188 18.75 12 18.75ZM14.9375 9.84375C15.0938 9.6875
                    15.0938 9.46875 14.9375 9.3125L14.6875 9.0625C14.5312
                    8.90625 14.3125 8.90625 14.1562 9.0625L12 11.2188L9.8125
                    9.0625C9.6875 8.90625 9.4375 8.90625 9.28125 9.0625L9.03125
                    9.3125C8.875 9.46875 8.875 9.6875 9.03125 9.84375L11.1875
                    12L9.03125 14.1875C8.875 14.3125 8.875 14.5625 9.03125
                    14.7188L9.28125 14.9688C9.4375 15.125 9.6875 15.125 9.8125
                    14.9688L12 12.8125L14.1562 14.9688C14.3125 15.125 14.5312
                    15.125 14.6875 14.9688L14.9375 14.7188C15.0938 14.5625
                    15.0938 14.3125 14.9375 14.1875L12.7812 12L14.9375 9.84375Z"
                  />
                </svg>
              </div>
            {/each}

            {#each driverClassesToMessage as driverClass}
              <div class="MessageOverlay-label uk-flex">
                {driverClass}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={'#15224B'}
                  xmlns="http://www.w3.org/2000/svg"
                  class="clickable"
                  on:click={() => {
                    driverClassesToMessage = driverClassesToMessage.filter(
                      dc => driverClassesToMessage != driverClass
                    );
                  }}
                >
                  <path
                    d="M12 4.25C7.71875 4.25 4.25 7.71875 4.25 12C4.25 16.2812
                    7.71875 19.75 12 19.75C16.2812 19.75 19.75 16.2812 19.75
                    12C19.75 7.71875 16.2812 4.25 12 4.25ZM12 18.75C8.28125
                    18.75 5.25 15.75 5.25 12C5.25 8.3125 8.25 5.25 12
                    5.25C15.6875 5.25 18.75 8.28125 18.75 12C18.75 15.7188
                    15.7188 18.75 12 18.75ZM14.9375 9.84375C15.0938 9.6875
                    15.0938 9.46875 14.9375 9.3125L14.6875 9.0625C14.5312
                    8.90625 14.3125 8.90625 14.1562 9.0625L12 11.2188L9.8125
                    9.0625C9.6875 8.90625 9.4375 8.90625 9.28125 9.0625L9.03125
                    9.3125C8.875 9.46875 8.875 9.6875 9.03125 9.84375L11.1875
                    12L9.03125 14.1875C8.875 14.3125 8.875 14.5625 9.03125
                    14.7188L9.28125 14.9688C9.4375 15.125 9.6875 15.125 9.8125
                    14.9688L12 12.8125L14.1562 14.9688C14.3125 15.125 14.5312
                    15.125 14.6875 14.9688L14.9375 14.7188C15.0938 14.5625
                    15.0938 14.3125 14.9375 14.1875L12.7812 12L14.9375 9.84375Z"
                  />
                </svg>
              </div>
            {/each}
          </div>

          <div class="MessageOverlay-input">
            <Input
              fill
              placeholder="Type or Select Recipients"
              onInput={handleRecipientInput}
              error="A team must be selected"
              invalid={teamsToMessage.length <= 0}
            />
            <div
              uk-dropdown="pos: bottom-justify; mode: click"
              class="Dropdown"
            >
              {#if _.some(teamsList.filter(t => t
                    .toLowerCase()
                    .includes(inputRecipients.toLowerCase())))}
                <div class="Dropdown-header">Teams</div>

                <div class="Dropdown-content">
                  {#each teamsList as t}
                    <div
                      class="Dropdown-selection clickable"
                      on:click={() => {
                        if (teamsToMessage.includes(t)) {
                          teamsToMessage = teamsToMessage.filter(
                            tM => tM !== t
                          );
                        } else {
                          teamsToMessage.push(t);
                          teamsToMessage = teamsToMessage;
                        }
                      }}
                    >
                      <div class="Dropdown-selection-check">
                        {#if teamsToMessage.includes(t)}
                          <svg
                            width="16"
                            height="12"
                            viewBox="0 0 16 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.5938 0.625L5.375 8.84375L2.375
                              5.8125C2.21875 5.6875 1.96875 5.6875 1.84375
                              5.8125L0.9375 6.71875C0.8125 6.84375 0.8125
                              7.09375 0.9375 7.25L5.125 11.4062C5.28125 11.5625
                              5.5 11.5625 5.65625 11.4062L15.0312
                              2.03125C15.1562 1.90625 15.1562 1.65625 15.0312
                              1.5L14.125 0.625C14 0.46875 13.75 0.46875 13.5938
                              0.625Z"
                              fill="#2B8AF7"
                            />
                          </svg>
                        {/if}
                      </div>
                      {t}
                    </div>
                  {/each}
                </div>
              {/if}

              {#if _.some(driverClassList.filter(dc => dc
                    .toLowerCase()
                    .includes(inputRecipients.toLowerCase())))}
                <div class="Dropdown-header">Divisions</div>

                <div class="Dropdown-content">
                  {#each inputRecipients ? driverClassList.filter(dc => dc
                          .toLowerCase()
                          .includes(inputRecipients.toLowerCase())) : driverClassList as dc}
                    <div
                      class="Dropdown-selection clickable"
                      on:click={() => {
                        if (driverClassesToMessage.includes(dc)) {
                          driverClassesToMessage =
                            driverClassesToMessage.filter(sR => sR !== dc);
                        } else {
                          driverClassesToMessage.push(dc);
                          driverClassesToMessage = driverClassesToMessage;
                        }
                      }}
                    >
                      <div class="Dropdown-selection-check">
                        {#if driverClassesToMessage.includes(dc)}
                          <svg
                            width="16"
                            height="12"
                            viewBox="0 0 16 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.5938 0.625L5.375 8.84375L2.375
                              5.8125C2.21875 5.6875 1.96875 5.6875 1.84375
                              5.8125L0.9375 6.71875C0.8125 6.84375 0.8125
                              7.09375 0.9375 7.25L5.125 11.4062C5.28125 11.5625
                              5.5 11.5625 5.65625 11.4062L15.0312
                              2.03125C15.1562 1.90625 15.1562 1.65625 15.0312
                              1.5L14.125 0.625C14 0.46875 13.75 0.46875 13.5938
                              0.625Z"
                              fill="#2B8AF7"
                            />
                          </svg>
                        {/if}
                      </div>
                      {dc}
                    </div>
                  {/each}
                </div>
              {/if}
            </div>
          </div>

          <div class="MessageOverlay-labels">
            {#each selectedMessageTypes as selectedMessageType}
              <div class="MessageOverlay-label uk-flex">
                {selectedMessageType}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={'#15224B'}
                  xmlns="http://www.w3.org/2000/svg"
                  class="clickable"
                  on:click={() => {
                    selectedMessageTypes = selectedMessageTypes.filter(
                      t => selectedMessageType != t
                    );
                  }}
                >
                  <path
                    d="M12 4.25C7.71875 4.25 4.25 7.71875 4.25 12C4.25 16.2812
                    7.71875 19.75 12 19.75C16.2812 19.75 19.75 16.2812 19.75
                    12C19.75 7.71875 16.2812 4.25 12 4.25ZM12 18.75C8.28125
                    18.75 5.25 15.75 5.25 12C5.25 8.3125 8.25 5.25 12
                    5.25C15.6875 5.25 18.75 8.28125 18.75 12C18.75 15.7188
                    15.7188 18.75 12 18.75ZM14.9375 9.84375C15.0938 9.6875
                    15.0938 9.46875 14.9375 9.3125L14.6875 9.0625C14.5312
                    8.90625 14.3125 8.90625 14.1562 9.0625L12 11.2188L9.8125
                    9.0625C9.6875 8.90625 9.4375 8.90625 9.28125 9.0625L9.03125
                    9.3125C8.875 9.46875 8.875 9.6875 9.03125 9.84375L11.1875
                    12L9.03125 14.1875C8.875 14.3125 8.875 14.5625 9.03125
                    14.7188L9.28125 14.9688C9.4375 15.125 9.6875 15.125 9.8125
                    14.9688L12 12.8125L14.1562 14.9688C14.3125 15.125 14.5312
                    15.125 14.6875 14.9688L14.9375 14.7188C15.0938 14.5625
                    15.0938 14.3125 14.9375 14.1875L12.7812 12L14.9375 9.84375Z"
                  />
                </svg>
              </div>
            {/each}
          </div>

          <div class="MessageOverlay-input">
            <span class="MessageOverlay-inputLabel">Message Type</span>
            <span class="MessageOverlay-inputLabelSub">(Optional)</span>

            <Input
              fill
              placeholder="Choose Fleet Message Type"
              onInput={handleMessageTypeInput}
            />
            <div
              uk-dropdown="pos: bottom-justify; mode: click"
              class="Dropdown"
            >
              <div class="Dropdown-header">Select Message Type</div>
              <div class="Dropdown-content">
                {#each inputMessageType ? messageTypes.filter(type => type
                        .toLowerCase()
                        .includes(inputMessageType.toLowerCase())) : messageTypes as t}
                  <div
                    class="Dropdown-selection clickable"
                    on:click={() => {
                      if (selectedMessageTypes.includes(t)) {
                        selectedMessageTypes = selectedMessageTypes.filter(
                          type => type !== t
                        );
                      } else {
                        selectedMessageTypes.push(t);
                        selectedMessageTypes = selectedMessageTypes;
                      }
                    }}
                  >
                    <div class="Dropdown-selection-check">
                      {#if selectedMessageTypes.includes(t)}
                        <svg
                          width="16"
                          height="12"
                          viewBox="0 0 16 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.5938 0.625L5.375 8.84375L2.375 5.8125C2.21875
                            5.6875 1.96875 5.6875 1.84375 5.8125L0.9375
                            6.71875C0.8125 6.84375 0.8125 7.09375 0.9375
                            7.25L5.125 11.4062C5.28125 11.5625 5.5 11.5625
                            5.65625 11.4062L15.0312 2.03125C15.1562 1.90625
                            15.1562 1.65625 15.0312 1.5L14.125 0.625C14 0.46875
                            13.75 0.46875 13.5938 0.625Z"
                            fill="#2B8AF7"
                          />
                        </svg>
                      {/if}
                    </div>
                    {t}
                  </div>
                {/each}
              </div>
            </div>
          </div>

          {#if attachments.length > 0}
            <div class="MessageOverlay-attachments">
              <MessageAttachments
                isDisplay={false}
                {removeAttachment}
                {attachments}
              />
            </div>
          {/if}

          <div class="MessageOverlay-rte">
            <RichText
              id={uuid()}
              {handleInput}
              {addAttachment}
              hideSend={true}
            />
          </div>

          <div class=" MessageOverlay-buttons">
            <div
              class="MessageOverlay-button"
              on:click={() => {
                clearOverlayData();
              }}
            >
              <Button primary outline>Cancel</Button>
            </div>

            <div on:click={send}>
              <Button
                primary
                disabled={canSubmit && teamsToMessage.length > 0 ? false : true}
              >
                Send Message
              </Button>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}

{#if displayPreviewOverlay}
  <OverlayPreview
    user={_.find(contactsList, { id: slug })}
    {clearOverlayData}
  />
{/if}

<style src="./Messages.scss">
</style>
