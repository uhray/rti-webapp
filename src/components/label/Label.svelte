<script>
  import Icon from '../icon/Icon.svelte';
  export let type = undefined;
  export let text = undefined;
</script>

<!-- HTML -->
<section class="Label">
  <!-- Labels Regular -->
  {#if type === 'active'}
    <div class="Label-divs Label-active">
      <p class="Label-regText">{text}</p>
    </div>
  {/if}
  {#if type === 'success'}
    <div class="Label-divs Label-success">
      <p class="Label-regText">{text}</p>
    </div>
  {/if}
  {#if type === 'disabled'}
    <div class="Label-divs Label-disabled">
      <p class="Label-blackText">{text}</p>
    </div>
  {/if}
  {#if type === 'warning'}
    <div class="Label-divs Label-warning">
      <p class="Label-regText">{text}</p>
    </div>
  {/if}
  {#if type === 'danger'}
    <div class="Label-divs Label-danger">
      <p class="Label-regText">{text}</p>
    </div>
  {/if}
  {#if type === 'default'}
    <div class="Label-divs Label-default">
      <p class="Label-regText">{text}</p>
    </div>
  {/if}
  <!-- Labels with Icons -->
  {#if type === 'dis-icon-default'}
    <div class="uk-flex Label-divsIcons Label-disabled">
      <Icon type="rocket" />
      <p class="Label-blackText">{text}</p>
      <Icon type="rocket" />
    </div>
  {/if}
  {#if type === 'dis-icon-blue'}
    <div class="Label-divsIcons Label-disabled">
      <Icon type="rocket" />
      <p class="Label-blueText">{text}</p>
      <Icon type="rocket" />
    </div>
  {/if}
</section>

<!-- ==== -->
<style src="./Label.scss">
</style>
