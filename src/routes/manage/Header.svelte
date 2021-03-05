<script>
  import Button from '../../components/button/Button.svelte';
  import SearchBar from '../../components/searchbar/SearchBar.svelte';
  import TabMenu from '../../components/tabmenu/TabMenu.svelte';
</script>

<svelte:head>
  <title>User Management</title>
</svelte:head>

<div class="Header">
  <div class="Header-container">
    <div class="Header-content">
      <div class="Header-titles">
        <h2 class="Header-title">User Management</h2>
        <p class="Header-subtitle">Here you can manage your active users.</p>
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
        <Button height="40px" primary fill>Add Admin</Button>
      </div>
    </div>
    <div class="uk-width-2-3 Header-tabs">
      <TabMenu type="default" tabs={['Users', 'Admins']} />
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
      padding: 70px 30px 5px 30px;

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
