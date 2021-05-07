<script>
  export let type = undefined;
  export let tabs = undefined;
  export let nospace = false;
  export let selectedTab = undefined;
  export let handleTab = undefined;
</script>

<style src="./TabMenu.scss">

</style>

<section class="TabMenu">
  {#if type === 'default'}
    <ul class={nospace ? 'TabMenu-noSpace' : ''} uk-tab>
      {#each tabs as tab}
        <li>
          <a
            class="TabMenu-linkText"
            on:click={e => {
              e.preventDefault();
              handleTab(tab);
            }}>
            {tab}
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</section>
