<script>
  import Icon from '../icon/Icon.svelte';
  import Divider from '../divider/Divider.svelte';
  import DropDown from '../dropdown/DropDown.svelte';
  import Button from '../button/Button.svelte';

  export let type;
  export let header;
  export let content;
  export let name;
  export let timeago;
  export let linkText;
  export let imageUrl;
</script>

<!-- HTML -->
<section class="Card">
  {#if type === 'default'}
    <div class="uk-card uk-card-default uk-flex Card-container">
      <div class="uk-card-body">
        <div class="uk-flex">
          <h3 class="uk-card-title Card-header">{header}</h3>
        </div>
        <p class="Card-content">{content}</p>
      </div>
    </div>
  {/if}
  {#if type === 'feed'}
    <div class="uk-card uk-card-default uk-flex Card-container">
      <div class="uk-card-body uk-width-1-1 Card-body">
        <div class="uk-flex">
          <Icon type="default-avatar" />
          <div>
            <h3 class="uk-card-title Card-header Card-headerFeed">{name}</h3>
            <h4 class="Card-subTitle Card-subTitleFeed">{timeago} min ago</h4>
          </div>
        </div>
        <p class="Card-content">{content}</p>
        <p class="Card-linkText">{linkText}</p>
        <Divider type="default" />
        <div class="uk-flex uk-width-1-1 Card-feedBottomSection">
          <div class="uk-position-bottom-left Card-iconGroup uk-flex">
            <Icon type="tag" />
            <DropDown
              type="default"
              text="Add Tag"
              choiceHeader="Tags"
              choices={['Flagged', 'Ok', 'Neat']}
            />
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
  {#if type === 'feed-action'}
    <div class="uk-card uk-card-default uk-flex Card-container">
      <div class="uk-card-body uk-width-1-1 Card-body">
        <div class="uk-flex">
          <Icon type="default-avatar" />
          <div>
            <h3 class="uk-card-title Card-header Card-headerFeed">{name}</h3>
            <h4 class="Card-subTitle Card-subTitleFeed">{timeago} min ago</h4>
          </div>
        </div>
        <p class="Card-content">{content}</p>
        <p class="Card-linkText">{linkText}</p>
        <Divider type="default" />
        <div class="uk-flex uk-width-1-1 Card-feedBottomSection">
          <div class="uk-position-bottom-left Card-iconGroup uk-flex">
            <Icon type="tag" />
            <DropDown
              type="default"
              text="Add Tag"
              choiceHeader="Tags"
              choices={['Flagged', 'Ok', 'Neat']}
            />
            <p class="uk-tex Card-subSectionText">Action</p>
            <DropDown
              type="default"
              text="Actions"
              choiceHeader="Actions"
              choices={['Dismiss', 'Delete', 'Allow']}
            />
          </div>
        </div>
      </div>
    </div>
  {/if}
  {#if type === 'news-wbuttons'}
    <div class="uk-card uk-card-default uk-flex Card-container">
      <div class="uk-card-body uk-width-1-1 Card-body">
        <div class="uk-flex">
          <Icon type="default-avatar" />
          <div>
            <h3 class="uk-card-title Card-header Card-headerFeed">{name}</h3>
            <h4 class="Card-subTitle Card-subTitleFeed">{timeago} min ago</h4>
          </div>
        </div>
        <p class="Card-content">{content}</p>
        <p class="Card-linkText">{linkText}</p>
        <Divider type="default" />
        <div class="Card-buttonGroup uk-align-right">
          <Button warning
            ><div class="uk-flex">
              <Icon type="slash-eye-white" />
              <span class="Card-buttonText">Hide</span>
            </div></Button
          >
          <Button success
            ><div class="uk-flex">
              <Icon type="white-check-circle" />
              <span class="Card-buttonText">Publish</span>
            </div></Button
          >
          <Button secondary>
            <span class="Card-buttonText">Push To Pending</span>
          </Button>
        </div>
      </div>
    </div>
  {/if}
  {#if type === 'news-image'}
    <div class="uk-card uk-card-default uk-flex Card-container">
      <div class="uk-card-body uk-width-1-1 Card-bodyImage">
        <div class="uk-flex Card-setSideSpacing">
          <Icon type="default-avatar" />
          <div>
            <h3 class="uk-card-title Card-header Card-headerFeed">{name}</h3>
            <h4 class="Card-subTitle Card-subTitleFeed">{timeago} min ago</h4>
          </div>
          <div class="uk-align-right Card-headerIcon">
            <!-- icon goes here, aligned right -->
            <Icon type="ellipse-dots" />
          </div>
        </div>
        <Divider type="default" />
        <!-- Header Section -->
        <div class="uk-width-1-1 Card-setSideSpacing">
          <h2 class="Card-newsHeader">
            {header}
          </h2>
        </div>
        <div class="uk-flex Card-newsSubHeader Card-setSideSpacing">
          <div class="Card-newsSubSpacing">
            <Icon type="default-avatar-small" />
          </div>
          <div class="Card-newsSubSpacing">
            <span class="Card-news{name}Text">{name}</span>
          </div>
          <div class="Card-newsSubSpacing">
            <Icon type="dot" />
          </div>
          <div class="Card-newsSubSpacing">
            <span class="Card-subTitle Card-subTitleFeed">{timeago} min</span>
          </div>
        </div>
        <div class="uk-width-1-1">
          <img src={imageUrl} alt="some doughnuts" class="Card-image" />
        </div>
        <div class="Card-newsSubContent Card-setSideSpacing">
          <p class="Card-newsSubContentText">
            {content}
          </p>
        </div>
        <div class="uk-flex uk-child-width-1-2 Card-tabGroup">
          <div class="Card-tabGroupRedDark">
            <Icon type="slash-eye-white" />
          </div>
          <div class="Card-tabGroupGreenDark">
            <Icon type="white-check-circle" />
          </div>
        </div>
      </div>
    </div>
  {/if}
  {#if type === 'feed-image'}
    <div class="uk-child-width-1-1">
      <div class="uk-card uk-card-default uk-flex Card-container">
        <div class="uk-card-body uk-width-1-1 Card-bodyImage">
          <div class="uk-flex Card-setSideSpacing ">
            <Icon type="default-avatar" />
            <div>
              <h3 class="uk-card-title Card-header Card-headerFeed">{name}</h3>
              <h4 class="Card-subTitle Card-subTitleFeed">{timeago} min ago</h4>
            </div>
          </div>
          <p class="Card-content Card-setSideSpacing ">{content}</p>
          <p class="Card-linkText Card-setSideSpacing ">{linkText}</p>
          <br />
          <img src={imageUrl} alt="some doughnuts" class="Card-image" />
          <br />
          <div class="uk-flex Card-imageIconGroup">
            <div class="uk-width-1-4">
              <Icon type="box-arrow" />
            </div>
            <div class="uk-width-1-4" />
            <div class="uk-width-1-2 uk-flex">
              <div class="uk-flex uk-width-1-2">
                <Icon type="thumbs-up" />
                <span class="Card-imageIconGroupText">300</span>
              </div>
              <div class="uk-flex uk-width-1-2">
                <Icon type="chat" />
                <span class="Card-imageIconGroupText">190</span>
              </div>
            </div>
          </div>
          <Divider type="for-tabs" />
          <div class="uk-flex uk-child-width-1-4 Card-tabGroup">
            <div class="Card-tabGroupNormal">
              <Icon type="tag" />
            </div>
            <div class="Card-tabGroupNormal">
              <Icon type="slash-eye" />
            </div>
            <div class="Card-tabGroupRed">
              <Icon type="trashcan" />
            </div>
            <div class="Card-tabGroupGreen">
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
