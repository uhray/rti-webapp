<script>
  export let type = undefined;
  export let tabs = undefined;
  export let nospace = false;
</script>

<section class="TabMenu">
  {#if type === 'default'}
    <ul class={nospace ? 'TabMenu-noSpace' : ''} uk-tab>
      {#each tabs as tab}
        <li>
          <a class="TabMenu-linkText">{tab}</a>
        </li>
      {/each}
    </ul>
  {/if}
</section>

<style src="./TabMenu.scss">
</style>
