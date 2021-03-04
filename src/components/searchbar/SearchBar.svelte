<script>
  export let fill = undefined;
</script>

<style src="./SearchBar.scss">

</style>

<!-- HTML -->
<section class="SearchBar">
  <form class="uk-search uk-search-default SearchBar-formContainer" {fill}>
    <span uk-search-icon />
    <input
      class="uk-search-input SearchBar-defaultSearch"
      type="search"
      placeholder="Search..." />
  </form>
</section>

<!-- ==== -->
