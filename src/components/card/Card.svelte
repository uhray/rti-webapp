<script>
  export let type = undefined;
  export let header = undefined;
  export let content = undefined;
  export let nospace = undefined;
</script>

<style src="./Card.scss">

</style>

<!-- HTML -->
<section class="Card">
  {#if type === 'card-gray-border'}
    <div class="uk-card Card-grayBorder">
      <div class={nospace ? 'uk-card-body uk-padding-remove' : 'uk-card-body'}>
        {#if header}
          <h3 class="uk-card-title Card-header">{header}</h3>
        {/if}
        {#if content}
          <p class="Card-content">{content}</p>
        {/if}
        <slot />
      </div>
    </div>
  {/if}
  {#if type === 'card-gray-bg'}
    <div class="uk-card Card-grayBg">
      <div class="uk-card-body">
        <h3 class="uk-card-title Card-header">{header}</h3>
        <p class="Card-content">{content}</p>
      </div>
    </div>
  {/if}
  {#if type === 'card-default'}
    <div class="uk-card Card-default uk-width-1-2">
      <div class="uk-card-body">
        <h3 class="uk-card-title Card-header">{header}</h3>
        <p class="Card-content">{content}</p>
      </div>
    </div>
  {/if}
</section>

<!-- ==== -->
