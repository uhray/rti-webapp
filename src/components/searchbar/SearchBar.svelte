<script>
  export let fill = undefined;
  export let alternate = false;
  export let handleSearch = undefined;
  export let search = '';
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
      placeholder="Fleet Search..."
      value={search}
      on:input={e => {
        handleSearch(e.target.value);
      }} />
    {#if search}
      <span
        class="SearchBar-close clickable"
        uk-icon="close"
        on:click={() => handleSearch('')} />
    {/if}
  </form>
</section>

<!-- ==== -->
