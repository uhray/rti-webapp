<script>
  export let contacts = undefined;
  import Icon from '../icon/Icon.svelte';
  import { colors } from '../../theme/variables.js';

  const collapse = () => {
    console.log('collapsing/expanding');
  };
</script>

<style src="./ContactList.scss">

</style>

<div class="ContactList">
  {#each contacts as contact}
    <div class="ContactList-group">
      <div class="uk-flex uk-flex-middle">
        <div class="ContactList-group-icon" on:click={collapse}>
          <Icon type="caretdown" color={colors.darkblue} />
        </div>
        <div class="ContactList-group-text">{contact.name}</div>
      </div>
      <Icon type="message" />
    </div>
  {/each}
</div>
