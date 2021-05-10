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
  <div class="uk-search uk-search-default SearchBar-formContainer" {fill}>
    <span uk-search-icon />
    <input
      class={`uk-search-input ${alternate ? 'SearchBar-alternate' : 'SearchBar-default'}`}
      placeholder="Search..."
      value={search}
      on:change={e => {
        e.preventDefault();
        handleSearch(e.target.value);
      }}
      on:submit|preventDefault|stopPropagation />
    {#if search}
      <span
        class="SearchBar-close clickable"
        uk-icon="close"
        on:click={() => handleSearch('')} />
    {/if}
  </div>
</section>

<!-- ==== -->
