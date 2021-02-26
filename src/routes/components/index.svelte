<script>
  import SearchBar from '../../components/searchbar/SearchBar.svelte';
  import Checkbox from '../../components/checkbox/Checkbox.svelte';
  import ProgressBar from '../../components/progressbar/ProgressBar.svelte';
  import Radios from '../../components/radios/Radios.svelte';
  import Button from '../../components/button/Button.svelte';
  import Card from '../../components/card/Card.svelte';
  import Divider from '../../components/divider/Divider.svelte';
  import Icon from '../../components/icon/Icon.svelte';
  import DropDown from '../../components/dropdown/DropDown.svelte';
  import Input from '../../components/input/Input.svelte';
  import Error from '../../components/error/Error.svelte';
  import Table from '../../components/table/Table.svelte';
  import Status from '../../components/status/Status.svelte';
  import TabMenu from '../../components/tabmenu/TabMenu.svelte';
</script>

<svelte:head>
  <title>Components</title>
</svelte:head>

<h1>Components Page</h1>

<!-- ===================================================== -->
<h2>Search Bar</h2>
<SearchBar />
<br />
<br />

<!-- ===================================================== -->
<h2>Tab Menu</h2>
<h5>Default Tabs</h5>
<TabMenu
  type="default"
  tabs={[{ name: 'First', url: 'components' }, { name: 'Second', url: 'components' }, { name: 'Third', url: 'components' }]} />
<br />
<br />

<!-- ===================================================== -->
<h2>Inputs</h2>
<h5>Default Input</h5>
<Input type="default" />
<br />
<Input type="selector" options={['Option 1', 'Option 2']} />
<br />
<Input type="textarea" rows={4} placeholder="placeholder.." />
<br />
<br />

<!-- ===================================================== -->
<h2>Cards</h2>
<h5>Default Card - (type="default")</h5>
<Card type="default" />
<br />
<h5>Feed Card (type="feed")</h5>
<Card type="feed" />
<br />
<h5>Feed Card with Action Dropdown (type="feed-action")</h5>
<Card type="feed-action" />
<br />
<h5>News Card with Buttons (type="news-wbuttons")</h5>
<Card type="news-wbuttons" />
<br />
<h5>Feed Card with Image (type="feed-image")</h5>
<div class="uk-flex uk-child-width-1-3">
  <Card type="feed-image" />
</div>
<br />
<h5>News Card with Image (type="news-image")</h5>
<div class="uk-flex uk-child-width-1-3">
  <Card type="news-image" />
</div>
<br />
<br />

<!-- ===================================================== -->
<h2>Tool Tips</h2>
<p>This is just a modifier from uk that can be added to anything.</p>
<p>uk-tooltip="See? A Tool Tip. Wow." Add this as an attribute to anything.</p>
<p>Hover over text below to see example.</p>
<div class="uk-width-1-4" style="border: 1px solid black;">
  <h4
    uk-tooltip="See? A Tool Tip. Wow."
    style="margin: auto; padding: auto; text-align: center;">
    Hover Over Me!
  </h4>
</div>
<br />
<br />

<!-- ===================================================== -->
<h2>Error Messages</h2>
<h4>Valiation Error</h4>
<Error type="validation-error" text="time" />
<br />

<br />
<br />

<!-- ===================================================== -->
<h2>Tables</h2>
<h4>Default Table</h4>
<Table type="default" />
<br />
<br />

<!-- ===================================================== -->
<h2>Status Labels</h2>
<Status type="success" text="Active" />
<br />
<Status type="warning" text="Expired" />
<br />
<Status type="caution" text="Pending" />
<br />
<Status type="default" text="Draft" />
<br />
<br />

<!-- ===================================================== -->
<h2>Icons</h2>
<div class="uk-width-1-4">
  <Icon type="default-avatar" />
  <br />
  <Icon type="tag" />
  <br />
  <Icon type="slash-eye" />
  <br />
  <Icon type="trashcan" />
  <br />
  <Icon type="green-check-circle" />
  <br />
  <Icon type="list-inactive" />
  <br />
  <Icon type="list-active" />
  <br />
  <Icon type="drawer-inactive" />
  <br />
  <Icon type="drawer-active" />
  <br />
  <Icon type="box-arrow" />
  <br />
  <Icon type="thumbs-up" />
  <br />
  <Icon type="chat" />
  <br />
  <Icon type="warning" />
  <br />
</div>

<br />
<br />

<!-- ===================================================== -->
<h2>Drop Down</h2>
<DropDown
  type="default"
  text="Dropdown"
  choiceHeader="Some Choices"
  choices={['A Choice', 'Another Choice', 'A Third Choice']} />
<br />
<br />

<!-- ===================================================== -->
<h2>Dividers</h2>
<Divider type="default" />
<br />
<br />

<!-- ===================================================== -->
<h2>Progress Bar</h2>
<ProgressBar />
<br />
<br />

<!-- ===================================================== -->
<h2>Radio Group</h2>
<Radios options={['A', 'B', 'C', 'D', 'E']} />
<br />
<br />

<!-- ===================================================== -->
<h2>Checkbox</h2>
<Checkbox primary />
<Checkbox secondary />
<Checkbox disabled />
<br />
<br />

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

<!-- ===================================================== -->
