<script>
  export let type;
  export let tabs;
</script>

<!-- HTML -->
<section class="TabMenu">
  {#if type === 'default'}
    <ul uk-tab>
      {#each tabs as tab}
        <li><a class="TabMenu-linkText" href={tab.url}>{tab.name}</a></li>
      {/each}
    </ul>
  {/if}
</section>

<!-- ==== -->
<style src="./TabMenu.scss">
</style>
