<script>
  import Icon from '../icon/Icon.svelte';
  export let type = undefined;
  export let text = undefined;
  export let size = 'default';
</script>

<!-- HTML -->
<section class="Label">
  <!-- Labels Regular -->
  {#if type === 'active'}
    <div
      class={size === 'small'
        ? 'Label-divs Label-active Label-small'
        : 'Label-divs Label-active'}
    >
      <p class="Label-regText">{text}</p>
    </div>
  {/if}
  {#if type === 'success'}
    <div
      class={size === 'small'
        ? 'Label-divs Label-success Label-small'
        : 'Label-divs Label-success'}
    >
      <p class="Label-regText">{text}</p>
    </div>
  {/if}
  {#if type === 'disabled'}
    <div
      class={size === 'small'
        ? 'Label-divs Label-disabled Label-small'
        : 'Label-divs Label-disabled'}
    >
      <p class="Label-blackText">{text}</p>
    </div>
  {/if}
  {#if type === 'warning'}
    <div
      class={size === 'small'
        ? 'Label-divs Label-warning Label-small'
        : 'Label-divs Label-warning'}
    >
      <p class="Label-regText">{text}</p>
    </div>
  {/if}
  {#if type === 'danger'}
    <div
      class={size === 'small'
        ? 'Label-divs Label-danger Label-small'
        : 'Label-divs Label-danger'}
    >
      <p class="Label-regText">{text}</p>
    </div>
  {/if}
  {#if type === 'default'}
    <div
      class={size === 'small'
        ? 'Label-divs Label-default Label-small'
        : 'Label-divs Label-default'}
    >
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
  {#if type === 'email-label'}
    <div class="Label-divsIcons Label-disabled">
      <p class="Label-emailText">{text}</p>
      <Icon type="close" />
    </div>
  {/if}
</section>

<!-- ==== -->
<style src="./Label.scss">
</style>
