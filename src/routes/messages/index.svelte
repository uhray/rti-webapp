<script context="module">
  import _ from 'lodash';
  import moment from 'moment';
  import { me, interval } from './data.js'; // #TODO: remove hardcoded me, get user data
  import tools, { getContacts } from '../../tools/crudApi.ts';
  import { userStore } from '../../store';

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

  let posts;
  let replies;
  let contactsList;
  let driversList;

  let sortedPosts = {};

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
      <ContactList slug="all" {driversList} />
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
