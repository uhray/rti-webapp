<script>
  import SignUp from '../../components/forms/signup/SignUp.svelte';
  import Icon from '../../components/icon/Icon.svelte';
</script>

<!-- html -->

<div class="sign-logo">
  <Icon type="rti-logo" />
</div>
<br />
<div class="uk-flex content-container">
  <div class="uk-width-2-3">
    <SignUp />
  </div>
  <div class="uk-width-1-3 uk-margin-remove uk-padding-remove">
    <div class="image-container">
      <img src="/images/signintruck.png" alt="truckin" class="truck-image" />
    </div>
  </div>
</div>

<div class="copy-write uk-flex">
  <Icon type="copywrite" />
  <span class="copy-write-text">Copyright 2021</span>
</div>

<!-- scss -->
<style lang="scss">
  .image-container {
    margin: 0px;
    padding: 0px;
    height: 100vh;
    top: 0;
    position: absolute;
    border: none;
    background: rgba(17, 19, 26, 0.6);
    z-index: 100;
  }
  .truck-image {
    margin: 0px;
    padding: 0px;
    height: 100vh;
    width: 100%;
    object-fit: cover;
    border: none;
  }
  .sign-logo {
    position: absolute;
    top: 0;
    left: 0;
    margin: 10px;
  }
  .copy-write {
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 15px;
  }
  .copy-write-text {
    margin-top: auto;
    margin-bottom: 3px;
    margin-left: 3px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: #595f76;
  }
</style>
