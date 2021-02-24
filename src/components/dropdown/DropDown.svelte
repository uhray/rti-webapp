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
      class="uk-button uk-button-small uk-flex uk-button-default DropDown-button"
      type="button"
      >{text}
      <span class="DropDown-chevIcon"><Icon type="chevron-down" /></span
      ></button
    >
    <div class="uk-width-large" uk-dropdown>
      <div uk-dropdown-grid class="uk-child-width-1-2@m" uk-grid>
        <div>
          <ul class="uk-nav uk-dropdown-nav">
            {#if choices.length > 0}
              <li class="uk-active"><a>{choiceHeader}</a></li>
              {#each choices as choice}
                <li><a onclick={console.log('clicked')}>{choice}</a></li>
              {/each}
            {:else}
              <li class="uk-active"><a>Choices</a></li>
              <li><a onclick={console.log('clicked')}>A Choice</a></li>
              <li>
                <a onclick={console.log('clicked')}>Another Choice</a>
              </li>
              <li>
                <a onclick={console.log('clicked')}>A Third Choice</a>
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
