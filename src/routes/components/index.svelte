<script>
  import SearchBar from '../../components/searchbar/SearchBar.svelte';
  import Checkbox from '../../components/checkbox/Checkbox.svelte';
  import ProgressBar from '../../components/progressbar/ProgressBar.svelte';
  import Radios from '../../components/radios/Radios.svelte';
  import Button from '../../components/button/Button.svelte';
  import Divider from '../../components/divider/Divider.svelte';
  import Icon from '../../components/icon/Icon.svelte';
  import DropDown from '../../components/UK-DropDown/DropDown.svelte';
  import Input from '../../components/input/Input.svelte';
  import Error from '../../components/error/Error.svelte';
  import Label from '../../components/label/Label.svelte';
  import TabMenu from '../../components/tabmenu/TabMenu.svelte';
  import ToolTip from '../../components/tooltip/ToolTip.svelte';
  import RichText from '../../components/richtext/RichText.svelte';
  import Card from '../../components/card/Card.svelte';

  let error = false;
  let errorMessage = 'test';
  const errorTest = () => {
    error = !error;
  };
  const onInput = e => {
    errorMessage = e.target.value;
  };

  // custom header to inject html
</script>

<style lang="scss">
  .Components {
    padding: 2em;
  }
</style>

<svelte:head>
  <title>Components</title>
</svelte:head>

<div class="Components">
  <h1>Components Page</h1>

  <h2>Labels</h2>
  <Label status="active" text="Active" />
  <br />
  <Label status="success" text="Success" />
  <br />
  <Label status="disabled" text="Disabled" />
  <br />
  <Label status="warning" text="Warning" />
  <br />
  <Label status="danger" text="Danger" />
  <br />
  <Label status="default" text="Default" />
  <br />
  <Label status="disabled" text="disabled" iconLeft="rocket" />
  <br />
  <Label status="dis-icon-default" text="disabled" />

  <br />
  <Label
    status="disabled"
    text="All Messages"
    iconLeft="message"
    iconColor="#243E93" />

  <Label status="disabled" text="Macros" iconLeft="macro-outline" />
  <Label status="disabled" text="Orders" iconLeft="orders-outline" />
  <Label status="disabled" iconLeft="overflow" />

  <h2>Table</h2>

  <!------------------ VERTICAL SCROLLING ---------------------------
can set height based of vh units ( height={100} -> height: 100vh )
defaults to [height: 100%] with no scrolling if no height value
------------------------------------------------------------------>
  <!-- <Table {headers} data={tableDataSmall} /> -->
  <br />
  <!-- <Table {headers} data={tableData} height={50} /> -->

  <h2>Divider</h2>
  <Divider />

  <h2>Progress Bar</h2>
  <ProgressBar progress="35" />

  <h2>Tool Tip</h2>
  <ToolTip text="Tool tip text will go here, rendered through a prop." />

  <h2>Search Bars</h2>
  <SearchBar />

  <h2>Inputs and Plain Textareas</h2>
  <Input
    fill
    placeholder="Hello there!"
    error="APOCALYPTIC ERROR TIME"
    invalid
    label="Test"
    icon="rocket" />
  <Input placeholder="Test 2" invalid label="No Error Message Test" />
  <div style={'display: flex; flex-flow:row nowrap'}>
    <Input label="Test 3" invalid={error} error={errorMessage} icon="upload" />
    <button on:click={errorTest}>Error Test</button>
    <Input label="Error Message For Test 3" {onInput} />
    {errorMessage}
  </div>
  <Input label="Test 4" icon="upload" />
  <Input label="Test 5" icon="upload" />

  <h2>Rich Text Text Area</h2>
  <RichText />

  <h2>Drop Downs</h2>
  <DropDown
    type="default"
    text="Drop Down"
    choiceHeader="Choice Header"
    choices={['Choice One', 'Choice Two']} />

  <h2>Cards</h2>
  <Card
    type="card-gray-border"
    header="Lorem"
    content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quo
    praesentium, voluptatibus ipsa sit eos dolorem iure veritatis deleniti vero
    laborum iusto qui, incidunt nam repudiandae expedita architecto vel
    recusandae!" />
  <br />
  <Card
    type="card-gray-bg"
    header="Lorem"
    content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quo
    praesentium, voluptatibus ipsa sit eos dolorem iure veritatis deleniti vero
    laborum iusto qui, incidunt nam repudiandae expedita architecto vel
    recusandae!" />
  <br />
  <Card
    type="card-default"
    header="Lorem"
    content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quo
    praesentium, voluptatibus ipsa sit eos dolorem iure veritatis deleniti vero
    laborum iusto qui, incidunt nam repudiandae expedita architecto vel
    recusandae!" />

  <h2>Tab Menu</h2>
  <TabMenu
    type="default"
    tabs={['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']} />

  <h2>Error Messages</h2>
  <Error type="email-validation-error" />
  <Error type="password-validation-error" />
  <Error
    type="default-error"
    text="This error takes a text prop, and can say anything" />

  <h2>Radios</h2>
  <Radios options={['A', 'B', 'C']} />

  <h2>Icons</h2>
  <div class="uk-flex">
    <div style="margin: 5px;">
      <Icon type="notification" />
    </div>
    <div style="margin: 5px;">
      <Icon type="account" />
    </div>
    <div style="margin: 5px;">
      <Icon type="message" />
    </div>
    <div style="margin: 5px;">
      <Icon type="settings" />
    </div>
    <div style="margin: 5px;">
      <Icon type="users" />
    </div>
    <div style="margin: 5px;">
      <Icon type="dashboard" />
    </div>
    <div style="margin: 5px;">
      <Icon type="orders" />
    </div>
    <div style="margin: 5px;">
      <Icon type="macro" />
    </div>
    <div style="margin: 5px;">
      <Icon type="automation" />
    </div>
    <div style="margin: 5px;">
      <Icon type="clock" />
    </div>
    <div style="margin: 5px;">
      <Icon type="sortup" />
    </div>
    <div style="margin: 5px;">
      <Icon type="sortdown" />
    </div>
    <div style="margin: 5px;">
      <Icon type="edit" />
    </div>
    <div style="margin: 5px;">
      <Icon type="delete" />
    </div>
    <div style="margin: 5px;">
      <Icon type="show" />
    </div>
    <div style="margin: 5px;">
      <Icon type="hide" />
    </div>
    <div style="margin: 5px;">
      <Icon type="search-default" />
    </div>
    <div style="margin: 5px;">
      <Icon type="search-active" />
    </div>
  </div>
  <div class="uk-flex">
    <div style="margin: 5px;">
      <Icon type="toggle-disabled" />
    </div>
    <div style="margin: 5px;">
      <Icon type="toggle-active" />
    </div>
    <div style="margin: 5px;">
      <Icon type="filter" />
    </div>
    <div style="margin: 5px;">
      <Icon type="add" />
    </div>
    <div style="margin: 5px;">
      <Icon type="check" />
    </div>
    <div style="margin: 5px;">
      <Icon type="caretup" />
    </div>
    <div style="margin: 5px;">
      <Icon type="caretdown" />
    </div>
    <div style="margin: 5px;">
      <Icon type="caretright" />
    </div>
    <div style="margin: 5px;">
      <Icon type="arrow-right" />
    </div>
    <div style="margin: 5px;">
      <Icon type="arrow-left" />
    </div>
    <div style="margin: 5px;">
      <Icon type="location-start" />
    </div>
    <div style="margin: 5px;">
      <Icon type="location-end" />
    </div>
    <div style="margin: 5px;">
      <Icon type="user" />
    </div>
    <div style="margin: 5px;">
      <Icon type="overflow" />
    </div>
    <div style="margin: 5px;">
      <Icon type="file" />
    </div>
    <div style="margin: 5px;">
      <Icon type="trailer" />
    </div>
    <div style="margin: 5px;">
      <Icon type="vehicle" />
    </div>
    <div style="margin: 5px;">
      <Icon type="calendar" />
    </div>
    <div style="margin: 5px;">
      <Icon type="reload" />
    </div>
    <div style="margin: 5px;">
      <Icon type="path" />
    </div>
  </div>
  <div class="uk-flex">
    <div style="margin: 5px;">
      <Icon type="chev-right" />
    </div>
    <div style="margin: 5px;">
      <Icon type="chev-up" />
    </div>
    <div style="margin: 5px;">
      <Icon type="chev-down" />
    </div>
    <div style="margin: 5px;">
      <Icon type="chev-left" />
    </div>
    <div style="margin: 5px;">
      <Icon type="table" />
    </div>
    <div style="margin: 5px;">
      <Icon type="columns" />
    </div>
    <div style="margin: 5px;">
      <Icon type="close" />
    </div>
    <div style="margin: 5px;">
      <Icon type="logout" />
    </div>
    <div style="margin: 5px;">
      <Icon type="send-default" />
    </div>
    <div style="margin: 5px;">
      <Icon type="send-active" />
    </div>
    <div style="margin: 5px;">
      <Icon type="indicator" />
    </div>
    <div style="margin: 5px;">
      <Icon type="goto" />
    </div>
    <div style="margin: 5px;">
      <Icon type="archive" />
    </div>
    <div style="margin: 5px;">
      <Icon type="reply" />
    </div>
    <div style="margin: 5px;">
      <Icon type="loading" />
    </div>
  </div>

  <div class="uk-flex">
    <div style="margin: 5px;">
      <Icon type="bold-disabled" />
    </div>
    <div style="margin: 5px;">
      <Icon type="bold-default" />
    </div>
    <div style="margin: 5px;">
      <Icon type="bold-hover" />
    </div>
    <div style="margin: 5px;">
      <Icon type="bold-active" />
    </div>
  </div>
  <div class="uk-flex">
    <div style="margin: 5px;">
      <Icon type="italic-disabled" />
    </div>
    <div style="margin: 5px;">
      <Icon type="italic-default" />
    </div>
    <div style="margin: 5px;">
      <Icon type="italic-hover" />
    </div>
    <div style="margin: 5px;">
      <Icon type="italic-active" />
    </div>
  </div>
  <div class="uk-flex">
    <div style="margin: 5px;">
      <Icon type="strike-disabled" />
    </div>
    <div style="margin: 5px;">
      <Icon type="strike-default" />
    </div>
    <div style="margin: 5px;">
      <Icon type="strike-hover" />
    </div>
    <div style="margin: 5px;">
      <Icon type="strike-active" />
    </div>
  </div>
  <div class="uk-flex">
    <div style="margin: 5px;">
      <Icon type="link-disabled" />
    </div>
    <div style="margin: 5px;">
      <Icon type="link-default" />
    </div>
    <div style="margin: 5px;">
      <Icon type="link-hover" />
    </div>
    <div style="margin: 5px;">
      <Icon type="link-active" />
    </div>
  </div>
  <div class="uk-flex">
    <div style="margin: 5px;">
      <Icon type="list-disabled" />
    </div>
    <div style="margin: 5px;">
      <Icon type="list-default" />
    </div>
    <div style="margin: 5px;">
      <Icon type="list-hover" />
    </div>
    <div style="margin: 5px;">
      <Icon type="list-active" />
    </div>
  </div>
  <div class="uk-flex">
    <div style="margin: 5px;">
      <Icon type="attach-default" />
    </div>
    <div style="margin: 5px;">
      <Icon type="attach-hover" />
    </div>
    <div style="margin: 5px;">
      <Icon type="attach-active" />
    </div>
    <div style="margin: 5px; border: 5px solid green">
      <Icon type="upload" />
    </div>
  </div>

  <h2>Checkbox</h2>
  <Checkbox primary />
  <Checkbox secondary />
  <Checkbox disabled />

  <!-- ===================================================== -->
  <h2>Button</h2>
  <Button disabled>Disabled</Button>
  <Button primary>Primary</Button>
  <Button secondary>Secondary</Button>
  <Button warning>Warning</Button>
  <Button success>Success</Button>
  <br />
  <br />

  <Button disabled outline>Disabled</Button>
  <Button primary outline>Primary</Button>
  <Button secondary outline>Secondary</Button>
  <Button warning outline>Warning</Button>
  <Button success outline>Success</Button>
  <br />
  <br />

  <Button disabled large>Disabled</Button>
  <Button primary large>Primary</Button>
  <Button secondary large>Secondary</Button>
  <br />
  <Button warning large>Warning</Button>
  <Button success large>Success</Button>
  <br />
  <br />

  <Button disabled large outline>Disabled</Button>
  <Button primary large outline>Primary</Button>
  <Button secondary large outline>Secondary</Button>
  <br />
  <Button warning large outline>Warning</Button>
  <Button success large outline>Success</Button>

  <br />
  <br />
</div>

<!-- ===================================================== -->
