<script>
  import Header from './Header.svelte';
  import Input from '../../../components/input/Input.svelte';
  import Icon from '../../../components/icon/Icon.svelte';
  import RichText from '../../../components/richtext/RichText.svelte';
  import Card from '../../../components/card/Card.svelte';
  import Button from '../../../components/button/Button.svelte';
  import DropDown from '../../../components/dropdown/DropDown.svelte';
</script>

<Header />
<section class="NewMacro">
  <h3>Macro Information</h3>
  <div class="uk-flex">
    <Input label="Title" placeholder="Enter Macro Title" />
    <DropDown
      type="logo"
      label="Icon"
      text="Text"
      choices={['choice', 'anotherchoice']}
    />
  </div>
  <br />
  <RichText label="Helper Note (Optional)" />

  <h3>Macro Configurations</h3>
  <Card type="card-gray-bg">
    <h6 class="NewMacro-cardTitle">Form Fields</h6>
    <Card type="input-card">
      <div class="uk-flex uk-width-1-1">
        <div class="uk-width-2-3 input-space">
          <Input placeholder="Enter Field Name" fill />
        </div>
        <div style="margin-left: 4px;" />
        <div class="uk-width-1-4 input-space">
          <Input placeholder="Enter Field Type" fill icon="caretdown" />
        </div>
        <div class="NewMacro-deleteIcon">
          <Icon type="close-red" />
        </div>
      </div>
    </Card>
    <div class="uk-flex NewMacro-addSection">
      <Icon type="add-circle" color="#2b8af7" />
      <a class="NewMacro-linkText">Add New</a>
    </div>
  </Card>
  <br />
  <Card type="card-gray-bg">
    <h6 class="NewMacro-cardTitle">Recipient</h6>
    <Card type="input-card">
      <div class="uk-flex uk-width-1-1">
        <div class="uk-width-2-3 input-space">
          <Input
            placeholder="Type or Select Recipients"
            fill
            icon="caretdown"
          />
        </div>
      </div>
    </Card>
  </Card>
  <br />
  <Card type="card-gray-bg">
    <h6 class="NewMacro-cardTitle">Add Statuses</h6>
    <Card type="input-card">
      <div class="uk-flex">
        <p class="NewMacro-toggleText">
          Status<span> (Off/On)</span>
        </p>
        <Icon type="toggle-disabled" />
      </div>
      <p class="NewMacro-toggleP">
        Switch the toggle on if you’d like to assign personal statuses to the
        macro submissions.
      </p>
    </Card>
  </Card>
  <br />

  <div>
    <Button primary>Add Macro</Button>
    <Button outline>Cancel</Button>
  </div>
</section>

<style lang="scss">
  .NewMacro {
    padding: 2em;
    .NewMacro-cardTitle {
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
    .NewMacro-deleteIcon {
      margin: auto 4px auto auto;
    }
    .NewMacro-linkText {
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
    .NewMacro-toggleText {
      font-family: Poppins;
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 14px;
      color: #15224b;
      margin: auto 4px auto 4px;
    }
    .NewMacro-toggleP {
      font-family: Poppins;
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 22px;
      color: #15224b;
      margin: auto 4px auto 4px;
    }
    .NewMacro-addSection {
      margin: 10px 4px 0px 4px;
    }
    .input-space {
      margin: 2px 0px auto 3px;
    }
  }
</style>
