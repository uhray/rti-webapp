<script>
  import Icon from '../icon/Icon.svelte';
  export let type;
  export let text;
  export let choiceHeader;
  export let choices;
</script>

<!-- HTML -->
<section class="DropDown">
  {#if type === 'default'}
    <button
      class="uk-button-small uk-flex uk-button-default DropDown-button"
      type="button"
      ><span class="DropDown-text">{text}</span>
      <span class="DropDown-chevIcon"><Icon type="chev-down" /></span></button
    >
    <div class="uk-width-large" uk-dropdown="mode: click">
      <div class="uk-child-width-1-2@m" uk-grid>
        <div>
          <ul class="uk-nav uk-dropdown-nav">
            {#if choices.length > 0}
              <li class="uk-active"><a>{choiceHeader}</a></li>
              {#each choices as choice}
                <li><a>{choice}</a></li>
              {/each}
            {:else}
              <li class="uk-active"><a>Choices</a></li>
              <li><a>A Choice</a></li>
              <li>
                <a>Another Choice</a>
              </li>
              <li>
                <a>A Third Choice</a>
              </li>
            {/if}
          </ul>
        </div>
      </div>
    </div>
  {/if}
</section>

<!-- ==== -->
<style src="./DropDown.scss">
</style>
