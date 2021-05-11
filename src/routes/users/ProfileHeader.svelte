<script>
  import NavLabel from '../../components/navlabel/NavLabel.svelte';

  export let name = '';
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
      padding: 60px 30px 5px 30px;

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
    <NavLabel page="USER MANAGEMENT" subpage={name.toUpperCase()} />
    <div class="Header-content">
      <div class="Header-titles">
        <h2 class="Header-title">{name}</h2>
      </div>
    </div>
  </div>
</div>
