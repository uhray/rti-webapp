<script>
  import Icon from '../icon/Icon.svelte';
  export let type;
  export let text;
  export let choiceHeader;
  export let choices;
</script>

<style src="./DropDown.scss">

</style>

<!-- HTML -->
<section class="DropDown">
  {#if type === 'default'}
    <button
      class="uk-button-small uk-flex uk-button-default DropDown-button"
      type="button">
      <span class="DropDown-text">{text}</span>
      <span class="DropDown-chevIcon">
        <Icon type="chev-down" />
      </span>
    </button>
    <div class="uk-width-medium" uk-dropdown="mode: click">
      <div class="uk-child-width-1-1" uk-grid>
        <div>
          <ul class="uk-nav uk-dropdown-nav">
            {#if choices.length > 0}
              <li class="uk-active DropDown-header">
                <a>{choiceHeader}</a>
              </li>
              {#each choices as choice}
                <li class="uk-flex DropDown-listItem">
                  <Icon type="rocket" />
                  <a class="DropDown-choice">{choice}</a>
                  <div class="DropDown-spacing">
                    <Icon type="rocket" />
                  </div>
                </li>
              {/each}
            {:else}
              <p>Add a choices array as prop</p>
            {/if}
          </ul>
        </div>
      </div>
    </div>
  {/if}
  {#if type === 'top-nav'}
    <slot />
    <div class="uk-width-medium DropDown-container" uk-dropdown="mode: click">
      <div class="uk-child-width-1-1" uk-grid>
        <div>
          <ul class="uk-nav uk-dropdown-nav">
            <li class="uk-flex DropDown-listItem">
              <Icon type="user" />
              <a class="DropDown-choice" href="account">View Profile</a>
            </li>
            <li class="uk-flex DropDown-listItem">
              <Icon type="logout" />
              <a class="DropDown-choice">Log Out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  {/if}
</section>

<!-- ==== -->
