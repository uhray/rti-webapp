<script>
  export let type;
  export let header;
  export let content;
</script>

<!-- HTML -->
<section class="Card">
  {#if type === 'card-gray-border'}
    <div class="uk-card Card-grayBorder">
      <div class="uk-card-body">
        <h3 class="uk-card-title Card-header">{header}</h3>
        <p class="Card-content">{content}</p>
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
<style src="./Card.scss">
</style>
