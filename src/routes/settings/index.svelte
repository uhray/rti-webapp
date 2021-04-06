<script>
  import Card from '../../components/card/Card.svelte';
  import Icon from '../../components/icon/Icon.svelte';
  import Divider from '../../components/divider/Divider.svelte';
  import ColorPicker from '../../components/colorpicker/ColorPicker.svelte';
  import Input from '../../components/input/Input.svelte';

  import Header from './Header.svelte';
</script>

<style lang="scss">
  .SettingsPage {
    padding: 2em;

    .SettingsPage-card {
      width: 25%;
      @media only screen and (max-width: 800px) {
        width: 50% !important;
      }
    }

    .SettingsPage-logoPreview {
      width: 25%;
      margin-left: 10px;
    }
    .SettingsPage-title {
      font-family: Poppins;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      color: #15224b;
      margin-bottom: 7px;
    }
    .SettingsPage-text {
      font-family: Poppins;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;
      color: #15224b;
      margin-top: 5px;
      &.remove-margin {
        margin-top: 0px;
        margin-bottom: 3px;
      }
    }
    .SettingsPage-linkText {
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }
    .SettingsPage-icon {
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }
  }
</style>

<Header />

<section class="SettingsPage">
  <h4 class="SettingsPage-title">Company Name</h4>
  <p class="SettingsPage-text">Type your company name in the field below</p>
  <div class="uk-width-1-3">
    <Input fill placeholder="Company Name" icon="" />
  </div>
  <br />
  <div class="uk-width-2-3">
    <Divider />
  </div>
  <br />
  <!-- Upload Logo Section -->
  <h4 class="SettingsPage-title">Upload your logo</h4>
  <p class="SettingsPage-text">
    Recommended file types: .jpeg, .png, .svg, .tiff
  </p>
  <div class="uk-flex">
    <div class="SettingsPage-card">
      <Card type="card-gray-border">
        <div>
          <div class="SettingsPage-icon">
            <Icon type="image-placeholder" />
          </div>
          <div class="uk-width-1-1 SettingsPage-linkText">
            <a>Click to browse</a>
            <span>or drag and drop your files here</span>
          </div>
        </div>
      </Card>
    </div>
    <div class="SettingsPage-logoPreview">
      <!-- Logo Preview -->
      <img src="/images/rti_logo.png" alt="thelogoforrti" />
    </div>
  </div>
  <br />
  <div class="uk-width-2-3">
    <Divider />
  </div>
  <br />

  <!-- Change Theme Section -->
  <h4 class="SettingsPage-title">Appearance</h4>
  <p class="SettingsPage-text">
    Customize your main colors for the mobile app.
  </p>
  <div class="uk-flex">
    <div>
      <p class="SettingsPage-text remove-margin">Primary Color</p>
      <ColorPicker hex="243e93" />
    </div>
    <div style="margin-right: 10px;" />
    <div>
      <p class="SettingsPage-text remove-margin">Secondary Color</p>
      <ColorPicker hex="2b8af7" />
    </div>
  </div>
</section>
