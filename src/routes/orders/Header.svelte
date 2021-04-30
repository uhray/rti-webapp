<script>
  import Button from '../../components/button/Button.svelte';
  import SearchBar from '../../components/searchbar/SearchBar.svelte';
  import Dropdown from '../../components/Dropdown/Dropdown.svelte';

  export let handleSort;

  let dropdownOpts = [
    {
      header: 'Date Created',
      opts: [
        { text: 'Newest first', value: 'new', selected: true },
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
    .Header-container {
      position: relative;
      height: 175px;
      width: 100%;
      background: #f8f9fc;
    }
    .Header-content {
      box-sizing: border-box;
      width: 100%;
      padding: 95px 30px 5px 30px;

      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
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

<svelte:head>
  <title>Orders</title>
</svelte:head>

<div class="Header">
  <div class="Header-container">
    <div class="Header-content">
      <div class="Header-titles">
        <h2 class="Header-title">Orders</h2>
        <p class="Header-subtitle">
          Here you can track your orders and its statuses.
        </p>
      </div>

      <div class="Header-actions">
        <div class="uk-width-1-1 Header-actions-search">
          <!-- #TODO: search -->
          <SearchBar fill />
        </div>

        <div>
          <Button height="40px" outline icon="sortup" fill>Sort By</Button>
          <Dropdown data={dropdownOpts} {handleSelect} />
        </div>

      </div>
    </div>
  </div>
</div>
