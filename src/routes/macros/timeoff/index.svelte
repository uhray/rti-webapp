<script>
  import Header from './Header.svelte';
  import Table from '../../../components/table/Table.svelte';
  import TimeOff from '../../../components/modals/timeoff/TimeOff.svelte';
  import Input from '../../../components/input/Input.svelte';
  import Icon from '../../../components/icon/Icon.svelte';
  import RichText from '../../../components/richtext/RichText.svelte';
  import Card from '../../../components/card/Card.svelte';
  import Button from '../../../components/button/Button.svelte';
  import DropDown from '../../../components/dropdown/DropDown.svelte';
  import Label from '../../../components/label/Label.svelte';
  import { headers, data } from './data';
</script>

<style lang="scss">
  .MacroSubmissionsPage {
    padding: 2em;
  }
  .MacroSettingsPage {
    padding: 2em;
    .MacroSettingsPage-cardTitle {
      font-family: Poppins;
      font-style: normal;
      font-weight: 600;
      font-size: 13px;
      line-height: 13px;
      display: flex;
      align-items: center;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      color: #15224b;
    }
    .MacroSettingsPage-interCard {
      margin: 9px 0px;
    }
    .MacroSettingsPage-deleteIcon {
      margin: auto 4px auto auto;
    }
    .MacroSettingsPage-linkText {
      font-family: Poppins;
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 15px;
      text-align: center;
      text-transform: capitalize;
      color: #2b8af7;
      margin: auto 3px auto 3px;
    }
    .MacroSettingsPage-toggleText {
      font-family: Poppins;
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 14px;
      color: #15224b;
      margin: 5px 4px 5px 4px;
    }
    .MacroSettingsPage-toggleP {
      font-family: Poppins;
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 22px;
      color: #15224b;
      margin: auto 4px auto 4px;
    }
    .MacroSettingsPage-addSection {
      margin: 10px 4px 0px 4px;
    }
    .MacroSettingsPage-emailLabel {
      margin: 4px 4px 6px 4px;
    }
    .input-space {
      margin: 2px 0px auto 3px;
    }
    .Settings-buttons {
      margin: 2px 2px 2px 4px;
    }
  }
</style>

<Header />
<!-- This is the modal that shows on view -->
<TimeOff />
<section class="MacroSubmissionsPage">
  <Table expand height={75} {headers} {data} />
</section>
<section class="MacroSettingsPage">
  <h3>Macro Information</h3>
  <div class="uk-flex">
    <Input label="Title" value="Time Off" placeholder="Enter Macro Title" />
    <DropDown
      type="logo"
      label="Icon"
      text="Text"
      choices={['vehicle', 'archive', 'trailer']} />
  </div>
  <div class="MacroSettingsPage-interCard" />
  <RichText label="Helper Note (Optional)" />

  <h3>Macro Configurations</h3>
  <Card type="card-gray-bg">
    <h6 class="MacroSettingsPage-cardTitle">Form Fields</h6>
    <Card type="input-card">
      <div class="uk-flex uk-width-1-1">
        <div class="uk-width-2-3 input-space">
          <Input placeholder="Enter Field Name" value="Start Day" fill />
        </div>
        <div style="margin-left: 4px;" />
        <div class="uk-width-1-4 input-space">
          <Input
            placeholder="Enter Field Type"
            value="Date Picker"
            fill
            icon="caretdown" />
        </div>
        <div class="MacroSettingsPage-deleteIcon">
          <Icon type="close-red" />
        </div>
      </div>
    </Card>
    <div class="MacroSettingsPage-interCard" />
    <Card type="input-card">
      <div class="uk-flex uk-width-1-1">
        <div class="uk-width-2-3 input-space">
          <Input placeholder="Enter Field Name" value="End Day" fill />
        </div>
        <div style="margin-left: 4px;" />
        <div class="uk-width-1-4 input-space">
          <Input
            placeholder="Enter Field Type"
            value="Date Picker"
            fill
            icon="caretdown" />
        </div>
        <div class="MacroSettingsPage-deleteIcon">
          <Icon type="close-red" />
        </div>
      </div>
    </Card>
    <div class="uk-flex MacroSettingsPage-addSection">
      <Icon type="add-circle" color="#2b8af7" />
      <a class="MacroSettingsPage-linkText">Add New</a>
    </div>
  </Card>
  <div class="MacroSettingsPage-interCard" />
  <Card type="card-gray-bg">
    <h6 class="MacroSettingsPage-cardTitle">Recipient</h6>
    <Card type="input-card">
      <div class="uk-flex">
        <div class="MacroSettingsPage-emailLabel">
          <Label type="email-label" text="email@email.com" />
        </div>
        <div class="MacroSettingsPage-emailLabel">
          <Label type="email-label" text="email@email.com" />
        </div>
      </div>

      <div class="uk-flex uk-width-1-1">
        <div class="uk-width-2-3 input-space">
          <Input
            placeholder="Type or Select Recipients"
            fill
            icon="caretdown" />
        </div>
      </div>
    </Card>
  </Card>
  <div class="MacroSettingsPage-interCard" />
  <Card type="card-gray-bg">
    <h6 class="MacroSettingsPage-cardTitle">Add Statuses</h6>
    <Card type="input-card">
      <div class="uk-flex">
        <p class="MacroSettingsPage-toggleText">
          Status
          <span>(Off/On)</span>
        </p>
        <Icon type="toggle-active" />
      </div>
      <p class="MacroSettingsPage-toggleP">
        Switch the toggle on if you’d like to assign personal statuses to the
        macro submissions.
      </p>
    </Card>
    <div class="MacroSettingsPage-interCard" />
    <Card type="input-card">
      <div class="uk-flex">
        <Label type="status-label" statusColor="#ffba5e" text="Pending" />
        <Label type="status-label" statusColor="#5dca91" text="Approved" />
      </div>
      <p class="MacroSettingsPage-toggleText">Status Name</p>
      <div class="uk-width-2-3 input-space">
        <Input placeholder="Add Status" fill />
      </div>
      <div class="Settings-buttons">
        <Button secondary icon="add" iconColor="#ffffff">Add Status</Button>
      </div>
    </Card>
    <div class="MacroSettingsPage-interCard" />
    <Card type="input-card">
      <p class="MacroSettingsPage-toggleText">Default Status</p>
      <div class="uk-width-2-3 input-space">
        <Input
          placeholder="Select the default status for submissions"
          fill
          icon="caretdown" />
      </div>
    </Card>
  </Card>
  <div class="MacroSettingsPage-interCard" />

  <div>
    <Button primary>Save Changes</Button>
    <Button outline>Cancel</Button>
  </div>
</section>
