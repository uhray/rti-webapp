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

<h3>Cards</h3>
<h5>Default Card</h5>
<Card type="default" />
<br />
<h5>Feed Card</h5>
<Card type="feed" />
<br />
<h5>Feed Card with Image</h5>
<Card type="feed-image" />
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
<Icon type="box-arrow" />
<br />
<Icon type="thumbs-up" />
<br />
<Icon type="chat" />
<br />
<br />
<br />

<h3>Drop Down</h3>
<DropDown
  type="default"
  text="Dropdown"
  choiceHeader="Some Choices"
  choices={['A Choice', 'Another Choice', 'A Third Choice']}
/>
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

<ul class="uk-breadcrumb">
  <li>
    <a href="#">Home</a>
  </li>
  <li>
    <a href="#">Linked Category</a>
  </li>
  <li class="uk-disabled">
    <a>Disabled Category</a>
  </li>
  <li>
    <span>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </span>
  </li>
</ul>

<h3>Button</h3>
<Button disabled />
<Button />
<br />
<br />
