<script>
  import Icon from '../icon/Icon.svelte';
  export let type = undefined;
  export let text = undefined;
  export let choiceHeader = undefined;
  export let choices = undefined;
  export let label = undefined;
  import { userLogout } from '../../tools/crudApi';
</script>

<!-- HTML -->
<section class="DropDown">
  {#if type === 'default'}
    <button
      class="uk-button-small uk-flex uk-button-default DropDown-button"
      type="button"
    >
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
            <li class="uk-flex DropDown-listItem" on:click|preventDefault={userLogout}>
              <Icon type="logout" />
              <a class="DropDown-choice">Log Out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  {/if}
  {#if type === 'logo'}
    {#if label}
      <label>{label}</label>
      <br />
    {/if}
    <button
      class="uk-button-small uk-flex uk-button-default DropDown-button logo"
      type="button"
    >
      <div class="DropDown-text forlogo">
        <Icon type="vehicle" />
      </div>
      <div class="DropDown-chevIcon forlogo">
        <Icon type="caretdown" color="#15224b" />
      </div>
    </button>
    <div class="DropDown-logoDrop" uk-dropdown="mode: click">
      <div class="uk-child-width-1-1" uk-grid>
        <div>
          <ul class="uk-nav uk-dropdown-nav">
            {#if choices.length > 0}
              {#each choices as choice}
                <li class="uk-flex DropDown-listItem forlogo">
                  <a><Icon type={choice} /></a>
                </li>
              {/each}
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
