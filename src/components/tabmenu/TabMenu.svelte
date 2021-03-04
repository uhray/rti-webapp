<script>
  export let type = undefined;
  export let tabs = undefined;
</script>

<style src="./TabMenu.scss">

</style>

<!-- HTML -->
<section class="TabMenu">
  {#if type === 'default'}
    <ul uk-tab>
      {#each tabs as tab}
        <li>
          <a class="TabMenu-linkText">{tab}</a>
        </li>
      {/each}
    </ul>
  {/if}
</section>

<!-- ==== -->
