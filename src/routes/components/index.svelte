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
</script>

<svelte:head>
  <title>Components</title>
</svelte:head>

<h1>Components Page</h1>

<h3>Search Bar</h3>
<SearchBar />
<br />
<br />

<h3>Card</h3>
<Card type="default" />
<br />
<Card type="feed" />
<br />
<br />

<h3>Icons</h3>
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
<br />
<br />

<h3>Drop Down</h3>
<DropDown
  type="default"
  text="Dropdown"
  choiceHeader="Some Choices"
  choices={['A Choice', 'Another Choice', 'A Third Choice']} />
<br />
<br />

<h3>Dividers</h3>
<Divider type="default" />
<br />
<br />

<h3>Progress Bar</h3>
<ProgressBar />
<br />
<br />

<h3>Radio Group</h3>
<Radios numOfOpts={['A', 'B', 'C', 'D', 'E']} />
<br />
<br />

<h3>Checkbox</h3>
<Checkbox />
<br />
<br />

<h3>Button</h3>
<Button disabled>Disabled</Button>
<Button primary>Primary</Button>
<Button secondary>Secondary</Button>
<br />
<br />

<Button disabled outline>Disabled</Button>
<Button primary outline>Primary</Button>
<Button secondary outline>Secondary</Button>
<br />
<br />

<Button disabled large>Disabled</Button>
<Button primary large>Primary</Button>
<Button secondary large>Secondary</Button>
<br />
<br />

<Button disabled large outline>Disabled</Button>
<Button primary large outline>Primary</Button>
<Button secondary large outline>Secondary</Button>

<br />
<br />
