<script context="module">
  import _ from 'lodash';
  import moment from 'moment';
  import { contacts } from './data.js';
  import tools from '../../tools/crudApi.ts';
  export async function preload(page, session) {
    const { contactId } = page.params;

    const id = '602bfa394a8a148e8a348f14';
    const res = await tools.fetch(
      `http://localhost:5000/api/v1/posts/manager/${contactId}`,
      {},
      { fetch: this.fetch }
    );

    // #TODO: fetch to get user's contacts info instead of from ./data.js

    const posts = res;

    const replies = posts.map(post => {
      return { id: post._id, display: false };
    });

    let contactsList = [];

    contacts.map(group => {
      group.subgroups.map(s => {
        s.contacts.map(c => {
          contactsList.push({ name: c.name, id: c.id, pic: c.picture });
        });
      });
    });

    let contact = _.find(contactsList, { id: contactId });

    return {
      posts,
      replies,
      contact,
      contacts,
      contactsList,
      slug: contactId,
    };
  }
</script>

<script>
  import { beforeUpdate, afterUpdate } from 'svelte';
  import Header from './Header.svelte';
  import SearchBar from '../../components/searchbar/SearchBar.svelte';
  import MessagesHeader from '../../components/messagesheader/MessagesHeader.svelte';
  import ContactList from '../../components/contactlist/ContactList.svelte';
  import MessagesDisplay from '../../components/messagesdisplay/MessagesDisplay.svelte';

  export let slug;
  export let posts;
  export let replies;
  export let contact;
  export let contacts;
  export let contactsList;
  let sortedPosts = {};

  // #TODO: remove hardcoded me, get user data
  let me = {
    id: '602bfa394a8a148e8a348f14',
    name: 'Hugo Oliveira',
    pic: 'https://i.kym-cdn.com/photos/images/original/001/475/112/f36.jpg',
  };

  beforeUpdate(() => {
    sortedPosts = _.chain(posts)
      .map(p => {
        let newP = p;
        newP.date = moment(new Date(p.createdAt).toISOString()).format(
          'MMM D, YYYY'
        );
        return newP;
      })
      .groupBy('date')
      .value();
  });
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
        max-width: 1200px;
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
      <ContactList {slug} {contacts} />
    </div>
  </div>
  <div class="Messages-main">
    <div class="Messages-main-header">
      <MessagesHeader {contact} tag={'RALED'} vehicle={'1XY001'} />
    </div>
    <div class="Messages-main-posts">
      <MessagesDisplay
        {posts}
        {sortedPosts}
        {replies}
        {me}
        contacts={contactsList} />

    </div>
  </div>
</div>
