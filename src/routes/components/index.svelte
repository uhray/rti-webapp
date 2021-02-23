<script>
  import SearchBar from '../../components/searchbar/SearchBar.svelte';
  import Checkbox from '../../components/checkbox/Checkbox.svelte';
</script>

<svelte:head>
  <title>Components</title>
</svelte:head>

<h1>Components Page</h1>

<h3>Search Bar</h3>
<SearchBar />
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
