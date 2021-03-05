<script>
  import Button from '../../components/button/Button.svelte';
  import SearchBar from '../../components/searchbar/SearchBar.svelte';
</script>

<svelte:head>
  <title />
</svelte:head>

<div class="Header">
  <div class="Header-container">
    <div class="Header-content">
      <div class="Header-titles">
        <h2 class="Header-title">Driver Macros</h2>
        <p class="Header-subtitle">
          Manage and add new custom macros to the app.
        </p>
      </div>

      <div class="Header-actions uk-flex">
        <div class="uk-width-1-1 Header-actions-search">
          <SearchBar fill />
        </div>
        <Button height="40px" outline icon="sortup" fill>Sort By</Button>
        <div style="margin-left: 4px;" />
        <a style="text-decoration: none" href="/macros/new"
          ><Button height="40px" primary fill>New Macro</Button></a
        >
      </div>
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
