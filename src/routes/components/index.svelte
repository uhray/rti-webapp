<script>
  import SearchBar from '../../components/searchbar/SearchBar.svelte';
  import Checkbox from '../../components/checkbox/Checkbox.svelte';
  import ProgressBar from '../../components/progressbar/ProgressBar.svelte';
  import Radios from '../../components/radios/Radios.svelte';
</script>

<svelte:head>
  <title>Components</title>
</svelte:head>

<div>
  <h1>Components Page</h1>

  <h3>Search Bar</h3>
  <SearchBar />
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
</div>
