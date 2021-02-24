<script>
  import Icon from '../icon/Icon.svelte';
  import Divider from '../divider/Divider.svelte';
</script>

<!-- HTML -->
<section class="Card">
  {#if $$props.type === 'default'}
    <div class="uk-card uk-card-default uk-flex Card-container">
      <div class="uk-card-body">
        <div class="uk-flex">
          <h3 class="uk-card-title Card-header">Card</h3>
        </div>
        <p class="Card-content">Content</p>
      </div>
    </div>
  {/if}
  {#if $$props.type === 'feed'}
    <div class="uk-card uk-card-default uk-flex Card-container">
      <div class="uk-card-body uk-width-1-1 Card-body">
        <div class="uk-flex">
          <Icon type="default-avatar" />
          <div>
            <h3 class="uk-card-title Card-header Card-headerFeed">Name</h3>
            <h4 class="Card-subTitle Card-subTitleFeed">Timeago</h4>
          </div>
        </div>
        <p class="Card-content">Post Content</p>
        <p class="Card-reportScore">Report Score: 13</p>
        <Divider type="default" />
        <div class="uk-flex uk-width-1-1 Card-feedBottomSection">
          <div class="uk-position-bottom-left Card-iconGroup uk-flex">
            <Icon type="tag" />
          </div>
          <div
            class="uk-position-bottom-right Card-iconGroup uk-flex Card-sectionIconGroup"
          >
            <div class="Card-subSectionIcon">
              <Icon type="slash-eye" />
            </div>
            <div class="Card-subSectionIcon">
              <Icon type="trashcan" />
            </div>
            <div class="Card-subSectionIcon">
              <Icon type="green-check-circle" />
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</section>

<!-- ==== -->
<style src="./Card.scss">
</style>
