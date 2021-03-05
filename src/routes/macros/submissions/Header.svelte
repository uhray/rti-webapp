<script>
  import NavLabel from '../../../components/navlabel/NavLabel.svelte';
  import SearchBar from '../../../components/searchbar/SearchBar.svelte';
  import TabMenu from '../../../components/tabmenu/TabMenu.svelte';
  import Button from '../../../components/button/Button.svelte';
</script>

<svelte:head>
  <title />
</svelte:head>

<div class="Header">
  <div class="Header-container">
    <NavLabel page="DRIVER MACROS" subpage="TIME OFF" />
    <div class="Header-content">
      <div class="Header-titles">
        <h2 class="Header-title">Time Off</h2>
        <p class="Header-subtitle" />
      </div>
      <div class="Header-actions">
        <div class="uk-width-1-1 Header-actions-search">
          <SearchBar fill />
        </div>
        <!-- Show This On Both Tabs -->
        <Button height="40px" outline icon="sortup" fill>Sort By</Button>
        <div style="margin-left: 5px;" />
        <!-- Show This On User Tab -->
        <Button height="40px" outline icon="filter" fill>Filter</Button>
        <div style="margin-left: 5px;" />
        <!-- Show this On Admin Tab -->
        <Button height="40px" primary fill>Delete</Button>
      </div>
    </div>
    <div class="uk-width-2-3 Header-tabs">
      <TabMenu type="default" tabs={['Submissions', 'Settings']} />
    </div>
  </div>
</div>

<style lang="scss">
  .Header {
    .Header-container {
      position: relative;
      height: 175px;
      width: 100%;
      background: #f8f9fc;
    }
    .Header-content {
      box-sizing: border-box;
      width: 98%;
      padding: 19px 30px 5px 30px;

      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
    }
    .Header-tabs {
      margin-left: 30px;
    }
    .Header-titles {
      width: 100%;

      .Header-title {
        font-family: Poppins;
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 34px;
        color: #15224b;
        margin: 5px;
        margin-bottom: 0px;
      }
      .Header-subtitle {
        font-family: Poppins;
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        line-height: 22px;
        color: #15224b;
        margin: 5px;
        margin-top: 0px;
      }
    }

    .Header-actions {
      width: 100%;

      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
      align-items: center;
      position: relative;

      .Header-actions-search {
        margin-right: 5px;
      }
    }
  }
</style>
