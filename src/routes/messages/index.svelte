<script context="module">
  import tools from '../../tools/crudApi.ts';
  export async function preload({ params }) {
    const id = '602bfa394a8a148e8a348f14';
    const res = await tools.fetch(
      `http://localhost:5000/api/v1/posts/manager`,
      {},
      { fetch: this.fetch }
    );
    const data = res;
    return { allPosts: data };
  }
</script>

<script>
  export let allPosts;
  export let posts;
  import { contacts } from './data.js';
  import Header from './Header.svelte';
  import SearchBar from '../../components/searchbar/SearchBar.svelte';
  import MessagesHeader from '../../components/messagesheader/MessagesHeader.svelte';
  import ContactList from '../../components/contactlist/ContactList.svelte';
  import MessagesDisplay from '../../components/messagesdisplay/MessagesDisplay.svelte';

  const getMessages = async id => {
    console.log(id);
    const res = await tools.fetch(
      `http://localhost:5000/api/v1/posts/manager/${id}`
    );
    console.log(res);
    const data = res;
    console.log(data);
    posts = data;

    logPosts();
  };

  const logPosts = () => {
    console.log('\n##### ALL POSTS #####');
    console.table(allPosts);
    console.log('\n##### POSTS #####');
    console.table(posts);
  };

  logPosts();
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
        padding: 10px;
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
      <ContactList {contacts} {getMessages} />
    </div>
  </div>
  <div class="Messages-main">
    <div class="Messages-main-header">
      <MessagesHeader name={'Ralph Edwards'} tag={'RALED'} vehicle={'1XY001'} />
      <MessagesDisplay />
    </div>
  </div>
</div>
