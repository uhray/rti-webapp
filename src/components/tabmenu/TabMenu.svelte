<script>
  import { createEventDispatcher } from 'svelte';
  export let type = undefined;
  export let tabs = undefined;
  export let nospace = false;

  const dispatch = createEventDispatcher();

  const switchTab = tab => {
    dispatch('toggle', {
      tab,
    });
  };
</script>

<section class="TabMenu">
  {#if type === 'default'}
    <ul class={nospace ? 'TabMenu-noSpace' : ''} uk-tab>
      {#each tabs as tab}
        <li>
          <a class="TabMenu-linkText" on:click={switchTab(tab)}>{tab}</a>
        </li>
      {/each}
    </ul>
  {/if}
</section>

<style src="./TabMenu.scss">
</style>
