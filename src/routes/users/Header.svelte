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
  export let handleFilter;
  export let handleAdd;
  export let sortOpts = [
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

  let filterOpts = [
    {
      header: 'By Status',
      opts: [
        { text: 'Show All', value: '', selected: true },
        { text: 'Show Active', value: 'active', selected: false },
        { text: 'Show Inactive', value: 'inactive', selected: false },
      ],
    },
  ];

  function handleSortSelect(dOpts, v) {
    sortOpts = dOpts;
    handleSort(v);
  }

  function handleFilterSelect(dOpts, v) {
    filterOpts = dOpts;
    handleFilter(v);
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

<div class="Header" id="Header">
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
          <Dropdown data={sortOpts} handleSelect={handleSortSelect} />
        </div>
        <div style="margin-left: 5px;" />
        <!-- Show This On User Tab -->

        {#if selectedTab === 'Users'}
          <div>
            <Button height="40px" width="100px" outline icon="filter">
              Filter
            </Button>
            <Dropdown data={filterOpts} handleSelect={handleFilterSelect} />
          </div>
          <div style="margin-left: 5px;" />
        {/if}

        {#if role === 'ADMIN' && selectedTab === 'Managers'}
          <div>
            <Button
              height="40px"
              width="100px"
              primary
              on:click={() => {
                handleAdd('MANAGER');
              }}>
              Add Manager
            </Button>
          </div>
        {/if}

        {#if role === 'ADMIN' && selectedTab === 'Admins'}
          <div>
            <Button
              height="40px"
              width="100px"
              primary
              on:click={() => {
                handleAdd('ADMIN');
              }}>
              Add Admin
            </Button>
          </div>
        {/if}
      </div>
    </div>
    <div class="Header-tabs" id="Header-tabs">
      <TabMenu
        type="default"
        tabs={role === 'ADMIN' ? ['Users', 'Managers', 'Admins'] : ['Users', 'Managers']}
        {selectedTab}
        {handleTab} />
    </div>
  </div>
</div>
