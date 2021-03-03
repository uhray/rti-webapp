<script>
  export let type = undefined;
  export let tabs = undefined;
</script>

<!-- HTML -->
<section class="TabMenu">
  {#if type === 'default'}
    <ul uk-tab>
      {#each tabs as tab}
        <li><a class="TabMenu-linkText">{tab}</a></li>
      {/each}
    </ul>
  {/if}
</section>

<!-- ==== -->
<style src="./TabMenu.scss">
</style>
