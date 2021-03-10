<script>
  import Header from './Header.svelte';
  import SearchBar from '../../components/searchbar/SearchBar.svelte';
  import MessagesHeader from '../../components/messagesheader/MessagesHeader.svelte';
</script>

<style lang="scss">
  .Messages {
    height: calc(100vh - 58px);
    padding: 0;

    display: flex;
    flex-flow: row nowrap;

    .Messages-Nav {
      width: 250px;
      border: 1px solid rgba(166, 173, 196, 0.5);
      border-left: 0;
      border-bottom: 0;

      .Messages-Nav-Search {
        box-sizing: border-box;
        height: 60px;
        border-bottom: 1px solid rgba(166, 173, 196, 0.5);
        padding: 10px;
      }
    }
    .Messages-main {
      width: 100%;
      border-top: 1px solid rgba(166, 173, 196, 0.5);

      .Messages-main-header {
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
  <div class="Messages-Nav">
    <div class="Messages-Nav-Search">
      <SearchBar />
    </div>
  </div>
  <div class="Messages-main">
    <div class="Messages-main-header">
      <MessagesHeader name={'Ralph Edwards'} tag={'RALED'} vehicle={'1XY001'} />
    </div>
  </div>
</div>
