<script>
  import Button from '../../components/button/Button.svelte';
  import SearchBar from '../../components/searchbar/SearchBar.svelte';
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
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
      align-items: center;
      position: relative;

      :first-child {
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
        <h2 class="Header-title">App Settings</h2>
        <p class="Header-subtitle">
          Change and customize the appearance of the driver's application.
        </p>
      </div>

      <div class="Header-actions">
        <div>
          <Button outline>Cancel</Button>
        </div>
        <div>
          <Button primary>Save</Button>
        </div>
      </div>
    </div>
  </div>
</div>
