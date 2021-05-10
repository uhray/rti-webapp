<script>
  import Button from '../../components/button/Button.svelte';
  import SearchBar from '../../components/searchbar/SearchBar.svelte';
  import TabMenu from '../../components/tabmenu/TabMenu.svelte';
  import Dropdown from '../../components/Dropdown/Dropdown.svelte';

  export let role;
  export let handleSort;
  export let selectedTab;
  export let handleTab;
  export let search;
  export let handleSearch;

  let dropdownOpts = [
    {
      header: 'Name',
      opts: [
        { text: 'A-Z', value: 'aToZ', selected: true },
        { text: 'Z-A', value: 'zToA', selected: false },
      ],
    },
    {
      header: 'Date Created',
      opts: [
        { text: 'Newest first', value: 'new', selected: false },
        { text: 'Oldest first', value: 'old', selected: false },
      ],
    },
  ];

  function handleSelect(dOpts, v) {
    dropdownOpts = dOpts;

    handleSort(v);
  }
</script>

<style lang="scss">
  .Header {
    background: #f8f9fc;
    .Header-container {
      position: relative;
      height: 175px;
      width: 100%;
      background: #f8f9fc;
    }
    .Header-content {
      background: #f8f9fc;
      box-sizing: border-box;
      width: 100%;
      padding: 95px 30px 5px 30px;

      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
    }
    .Header-tabs {
      background: #f8f9fc;
      padding: 32px 0 0 30px;
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
        max-width: 350px;
      }
    }
  }
</style>

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
          <SearchBar {search} {handleSearch} fill />
        </div>
        <!-- Show This On Both Tabs -->
        <div>
          <Button height="40px" outline icon="sortup" fill>Sort By</Button>
          <Dropdown data={dropdownOpts} {handleSelect} />
        </div>
        <div style="margin-left: 5px;" />
        <!-- Show This On User Tab -->
        <div>
          <Button height="40px" width="100px" outline icon="filter">
            Filter
          </Button>
        </div>
        <div style="margin-left: 5px;" />
        <!-- Show this On Admin Tab -->
        <div>
          <Button height="40px" width="100px" primary>Add Admin</Button>
        </div>
      </div>
    </div>
    <div class="Header-tabs">
      <TabMenu
        type="default"
        tabs={role === 'ADMIN' ? ['Users', 'Managers', 'Admins'] : ['Users', 'Managers']}
        {selectedTab}
        {handleTab} />
    </div>
  </div>
</div>
