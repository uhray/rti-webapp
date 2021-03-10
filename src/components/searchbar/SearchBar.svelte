<script>
  export let fill = undefined;
  export let alternate = false;
</script>

<style src="./SearchBar.scss">

</style>

<!-- HTML -->
<section class="SearchBar">
  <form class="uk-search uk-search-default SearchBar-formContainer" {fill}>
    <span uk-search-icon />
    <input
      class={`uk-search-input ${alternate ? 'SearchBar-alternate' : 'SearchBar-default'}`}
      type="search"
      placeholder="Fleet Search..." />
  </form>
</section>

<!-- ==== -->
