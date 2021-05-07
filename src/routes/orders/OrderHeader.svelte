<script>
  import Button from '../../components/button/Button.svelte';
  import SearchBar from '../../components/searchbar/SearchBar.svelte';
  import OrderStatusLabel from '../../components/OrderStatusLabel/OrderStatusLabel.svelte';
  export let order = {};
  export let toggleMessage = () => {};
</script>

<style lang="scss">
  .Header {
    a {
      text-decoration: none;
    }
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
      display: flex;
      flex-flow: row nowrap;
      align-items: center;

      :first-child {
        margin-right: 10px;
      }

      .Header-title {
        font-family: Poppins;
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 34px;
        color: #15224b;
        margin: 0px 15px 0 5px;
        // margin-bottom: 0px;
      }
    }

    .Header-actions {
      width: 100%;

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

  .Orders {
    padding: 2em;
  }
</style>

<svelte:head>
  <title>Orders</title>
</svelte:head>

<div class="Header">
  <div class="Header-container">
    <div class="Header-content">
      <div class="Header-titles">
        <h2 class="Header-title">Order #{order.orderId}</h2>
        <OrderStatusLabel status={order.status} />
      </div>

      <div class="Header-actions">
        <div
          on:click={() => {
            window.history.back();
          }}>
          <Button outline>Back</Button>
        </div>
        <div on:click={toggleMessage}>
          <Button primary>Send Message</Button>
        </div>
      </div>
    </div>
  </div>
</div>
