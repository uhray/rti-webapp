<script context="module">
  export async function preload({ params }) {}
</script>

<script>
  import { beforeUpdate, afterUpdate, onMount } from 'svelte';
  import Header from './Header.svelte';
  import SearchBar from '../../components/searchbar/SearchBar.svelte';
  import MessagesHeader from '../../components/messagesheader/MessagesHeader.svelte';
  import ContactList from '../../components/contactlist/ContactList.svelte';
  import MessagesDisplay from '../../components/messagesdisplay/MessagesDisplay.svelte';
  import RichText from '../../components/richtext/RichText.svelte';
  import Icon from '../../components/icon/Icon.svelte';
  import Input from '../../components/input/Input.svelte';
  import DropDown from '../../components/dropdown/DropDown.svelte';
  import Button from '../../components/button/Button.svelte';
  import _ from 'lodash';
  import moment from 'moment';
  import { me, interval } from './data.js'; // #TODO: remove hardcoded me, get user data
  import tools, { getContacts, addPost } from '../../tools/crudApi.ts';
  import { userStore } from '../../store';

  let posts;
  let replies;
  let contactsList;
  let driversList;
  let sortedPosts = {};

  // OVERLAY VARIABLES
  let displayMessageOverlay = false;
  let teamsToMessage = [];
  const messageTypes = [
    'Safety',
    'Driver Logs',
    'Operations',
    'Dispatching',
    'Other',
  ];
  let selectedMessageTypes = [];
  let inputMessageType = undefined;
  let message = '';
  let canSubmit = false;

  beforeUpdate(async () => {
    sortedPosts = _.chain(posts)
      .map(p => {
        let newP = p;

        if (p.createdAt) {
          newP.date = moment(new Date(p.createdAt).toISOString()).format(
            'MMM D, YYYY'
          );
        }
        return newP;
      })
      .groupBy('date')
      .value();
  });

  onMount(async () => {
    posts = await tools.fetch(`http://localhost:5000/api/v1/posts/`, {});
    const contacts = await getContacts(
      `http://localhost:5000/api/v1/users/contacts`
    );

    contactsList = contacts.contacts;
    driversList = contacts.drivers;

    replies = posts.map(post => {
      return { id: post._id, display: false };
    });
  });

  const toggleReplies = id => {
    replies = replies.map(r => {
      if (r.id == id) {
        return { id: r.id, display: !r.display };
      } else {
        return r;
      }
    });

    replies = replies;
  };

  async function getData(url = '', data = {}) {
    const response = await fetch(url, {});
    return response.json();
  }

  async function refetch() {
    const id = me.id;

    getData('http://localhost:5000/api/v1/posts', {})
      .then(async json => {
        posts = json.data;
      })
      .catch(err => {
        console.log(err);
      });

    // #TODO: fetch to get user's contacts info instead of from ./data.js

    replies = await posts.map(post => {
      return _.find(replies, { id: post._id });
    });
  }

  function toggleMessageOverlay(team) {
    displayMessageOverlay = !displayMessageOverlay;
    teamsToMessage.push(team);
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

  async function send() {
    let payload = {
      from: $userStore.user._id,
      postType: 'ALERT',
      message: message,
      tags: selectedMessageTypes,
      teamIds: teamsToMessage.map(t => t.name),
    };

    const res = await addPost(payload);

    clearOverlayData();
  }

  function clearOverlayData() {
    canSubmit = false;
    teamsToMessage = [];
    selectedMessageTypes = [];
    message = '';
    inputMessageType = undefined;
    displayMessageOverlay = false;
  }

  // setInterval(async () => {
  //   await refetch();
  // }, interval || 1000);
</script>

<style lang="scss">
  .Messages {
    height: calc(100vh - 58px);
    max-height: calc(100vh - 58px);
    padding: 0;

    display: flex;
    flex-flow: row nowrap;

    .Messages-nav {
      width: 250px;
      max-width: 250px;
      min-width: 250px;
      border: 1px solid rgba(166, 173, 196, 0.5);
      border-left: 0;
      border-bottom: 0;

      .Messages-nav-search {
        box-sizing: border-box;
        height: 60px;
        border-bottom: 1px solid rgba(166, 173, 196, 0.5);
        padding: 10px;
      }

      .Messages-nav-contacts {
        box-sizing: border-box;
        padding: 10px 0;
        max-height: calc(100vh - 118px);
        overflow-y: auto;

        /* width */
        &::-webkit-scrollbar {
          width: 1px;
        }

        /* Track */
        &::-webkit-scrollbar-track {
          background: #fff;
        }

        /* Handle */
        &::-webkit-scrollbar-thumb {
          background: #a6adc4;
        }

        /* Handle on hover */
        &::-webkit-scrollbar-thumb:hover {
          background: #595f76;
        }
      }
    }
    .Messages-main {
      width: 100%;
      border-top: 1px solid rgba(166, 173, 196, 0.5);

      .Messages-main-header {
        display: flex;
        flex-flow: column;
        box-sizing: border-box;
        height: 60px;
        border-bottom: 1px solid rgba(166, 173, 196, 0.5);
        padding: 10px 30px 10px 30px;
      }

      .Messages-main-posts {
        position: relative;
        height: calc(100vh - 119px);
        max-height: calc(100vh - 119px);
      }
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

  .Dropdown {
    border-radius: 8px;
    padding: 8px;
    margin: 0;

    .Dropdown-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 33px;
      padding: 4px 20px 4px 15px;
      background: #f6f7fb;
      border-radius: 2px;
      font-family: Poppins;
      font-style: normal;
      font-weight: 600;
      font-size: 13px;
      line-height: 13px;

      letter-spacing: 0.02em;
      text-transform: uppercase;
      color: #15224b;
    }

    .Dropdown-content {
      margin: 8px;
    }
    .Dropdown-selection {
      height: 40px;
      font-size: 14px;
      font-weight: 400;

      display: flex;
      flex-flow: row nowrap;
      align-items: center;

      color: #15224b;

      .Dropdown-selection-check {
        margin: 0 8px;
        width: 16px;
      }
    }
  }
</style>

<svelte:head>
  <title>Messages</title>
</svelte:head>

<Header />

<div class="Messages">
  <div class="Messages-nav">
    <div class="Messages-nav-search">
      <SearchBar alternate />
    </div>
    <div class="Messages-nav-contacts">
      <ContactList slug="all" {driversList} {toggleMessageOverlay} />
    </div>
  </div>
  <div class="Messages-main">
    <div class="Messages-main-header">
      <MessagesHeader contact={undefined} />
    </div>
    <div class="Messages-main-posts">
      <!-- <MessagesDisplay
        {posts}
        {sortedPosts}
        {replies}
        {me}
        {toggleReplies}
        {refetch}
        contacts={contactsList} /> -->
    </div>
  </div>
</div>

{#if displayMessageOverlay}
  <div class="MessageOverlay">

    <div class="MessageOverlay-container">
      <div
        class="MessageOverlay-close clickable"
        on:click={() => {
          teamsToMessage = [];
          displayMessageOverlay = false;
        }}>
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.78906 6.5L11.8125 2.51562L12.6328 1.69531C12.75 1.57812 12.75
            1.38281 12.6328 1.22656L11.7734 0.367188C11.6172 0.25 11.4219 0.25
            11.3047 0.367188L6.5 5.21094L1.65625 0.367188C1.53906 0.25 1.34375
            0.25 1.1875 0.367188L0.328125 1.22656C0.210938 1.38281 0.210938
            1.57812 0.328125 1.69531L5.17188 6.5L0.328125 11.3438C0.210938
            11.4609 0.210938 11.6562 0.328125 11.8125L1.1875 12.6719C1.34375
            12.7891 1.53906 12.7891 1.65625 12.6719L6.5 7.82812L10.4844
            11.8516L11.3047 12.6719C11.4219 12.7891 11.6172 12.7891 11.7734
            12.6719L12.6328 11.8125C12.75 11.6562 12.75 11.4609 12.6328
            11.3438L7.78906 6.5Z"
            fill="#A6ADC4" />
        </svg>
      </div>
      <div class="MessageOverlay-title">Fleet Message</div>

      <div class="MessageOverlay-form">
        <div class="MessageOverlay-labels">
          {#each teamsToMessage as team}
            <div class="MessageOverlay-label uk-flex">
              {team.name}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={'#15224B'}
                xmlns="http://www.w3.org/2000/svg"
                class="clickable"
                on:click={() => {
                  teamsToMessage = teamsToMessage.filter(t => teamsToMessage._id != team._id);
                }}>
                <path
                  d="M12 4.25C7.71875 4.25 4.25 7.71875 4.25 12C4.25 16.2812
                  7.71875 19.75 12 19.75C16.2812 19.75 19.75 16.2812 19.75
                  12C19.75 7.71875 16.2812 4.25 12 4.25ZM12 18.75C8.28125 18.75
                  5.25 15.75 5.25 12C5.25 8.3125 8.25 5.25 12 5.25C15.6875 5.25
                  18.75 8.28125 18.75 12C18.75 15.7188 15.7188 18.75 12
                  18.75ZM14.9375 9.84375C15.0938 9.6875 15.0938 9.46875 14.9375
                  9.3125L14.6875 9.0625C14.5312 8.90625 14.3125 8.90625 14.1562
                  9.0625L12 11.2188L9.8125 9.0625C9.6875 8.90625 9.4375 8.90625
                  9.28125 9.0625L9.03125 9.3125C8.875 9.46875 8.875 9.6875
                  9.03125 9.84375L11.1875 12L9.03125 14.1875C8.875 14.3125 8.875
                  14.5625 9.03125 14.7188L9.28125 14.9688C9.4375 15.125 9.6875
                  15.125 9.8125 14.9688L12 12.8125L14.1562 14.9688C14.3125
                  15.125 14.5312 15.125 14.6875 14.9688L14.9375 14.7188C15.0938
                  14.5625 15.0938 14.3125 14.9375 14.1875L12.7812 12L14.9375
                  9.84375Z" />
              </svg>
            </div>
          {/each}
        </div>

        <div class="MessageOverlay-input">
          <Input fill placeholder="Type Or Select Recipients" />
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
                  selectedMessageTypes = selectedMessageTypes.filter(t => selectedMessageType != t);
                }}>
                <path
                  d="M12 4.25C7.71875 4.25 4.25 7.71875 4.25 12C4.25 16.2812
                  7.71875 19.75 12 19.75C16.2812 19.75 19.75 16.2812 19.75
                  12C19.75 7.71875 16.2812 4.25 12 4.25ZM12 18.75C8.28125 18.75
                  5.25 15.75 5.25 12C5.25 8.3125 8.25 5.25 12 5.25C15.6875 5.25
                  18.75 8.28125 18.75 12C18.75 15.7188 15.7188 18.75 12
                  18.75ZM14.9375 9.84375C15.0938 9.6875 15.0938 9.46875 14.9375
                  9.3125L14.6875 9.0625C14.5312 8.90625 14.3125 8.90625 14.1562
                  9.0625L12 11.2188L9.8125 9.0625C9.6875 8.90625 9.4375 8.90625
                  9.28125 9.0625L9.03125 9.3125C8.875 9.46875 8.875 9.6875
                  9.03125 9.84375L11.1875 12L9.03125 14.1875C8.875 14.3125 8.875
                  14.5625 9.03125 14.7188L9.28125 14.9688C9.4375 15.125 9.6875
                  15.125 9.8125 14.9688L12 12.8125L14.1562 14.9688C14.3125
                  15.125 14.5312 15.125 14.6875 14.9688L14.9375 14.7188C15.0938
                  14.5625 15.0938 14.3125 14.9375 14.1875L12.7812 12L14.9375
                  9.84375Z" />
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
            onInput={handleMessageTypeInput} />
          <div uk-dropdown="pos: bottom-justify; mode: click" class="Dropdown">
            <div class="Dropdown-header">Select Message Type</div>
            <div class="Dropdown-content">
              {#each inputMessageType ? messageTypes.filter(type =>
                    type.toLowerCase().includes(inputMessageType.toLowerCase())
                  ) : messageTypes as t}
                <div
                  class="Dropdown-selection clickable"
                  on:click={() => {
                    if (selectedMessageTypes.includes(t)) {
                      selectedMessageTypes = selectedMessageTypes.filter(type => type !== t);
                    } else {
                      selectedMessageTypes.push(t);
                      selectedMessageTypes = selectedMessageTypes;
                    }
                  }}>
                  <div class="Dropdown-selection-check">

                    {#if selectedMessageTypes.includes(t)}
                      <svg
                        width="16"
                        height="12"
                        viewBox="0 0 16 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M13.5938 0.625L5.375 8.84375L2.375 5.8125C2.21875
                          5.6875 1.96875 5.6875 1.84375 5.8125L0.9375
                          6.71875C0.8125 6.84375 0.8125 7.09375 0.9375
                          7.25L5.125 11.4062C5.28125 11.5625 5.5 11.5625 5.65625
                          11.4062L15.0312 2.03125C15.1562 1.90625 15.1562
                          1.65625 15.0312 1.5L14.125 0.625C14 0.46875 13.75
                          0.46875 13.5938 0.625Z"
                          fill="#2B8AF7" />
                      </svg>
                    {/if}
                  </div>
                  {t}
                </div>
              {/each}
            </div>
          </div>
        </div>

        <div class="MessageOverlay-rte">
          <RichText {handleInput} hideSend={true} />
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
            <Button primary disabled={!canSubmit ? true : false}>
              Send Message
            </Button>
          </div>
        </div>

      </div>
    </div>
  </div>
{/if}
