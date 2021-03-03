<script lang="ts">
  import Button from '../button/Button.svelte';
  import SearchBar from '../searchbar/SearchBar.svelte';
  import TabMenu from '../tabmenu/TabMenu.svelte';
  export let segment = undefined;
</script>

<section class="HeadSection">
  {#if segment === 'settings'}
    <div class="HeadSection-container">
      <div class="HeadSection-content uk-flex">
        <div>
          <h2 class="HeadSection-header">App Settings</h2>
          <p class="HeadSection-subHeader">
            Change and customize the appearance of the driver’s application.
          </p>
        </div>
        <div class="HeadSection-buttonGroup uk-flex">
          <Button outline>Cancel</Button>
          <div style="margin-left: 4px;" />
          <Button primary>Save</Button>
        </div>
      </div>
    </div>
  {/if}
  {#if segment === 'manage'}
    <div class="HeadSection-container">
      <div class="HeadSection-content with-tabs uk-flex">
        <div>
          <h2 class="HeadSection-header">User Manangement</h2>
          <p class="HeadSection-subHeader">
            Here you can manage your active users.
          </p>
          <TabMenu type="default" tabs={['Users', 'Admins']} />
        </div>
        <div class="HeadSection-buttonGroup uk-flex">
          <!-- FIXME: Search Bar width and button icon displaying underneath -->
          <SearchBar />

          <Button outline icon="filter">Filter</Button>
          <div style="margin-left: 4px;" />
          <Button outline icon="sortup">Search</Button>
        </div>
      </div>
    </div>
  {/if}
  {#if segment === 'components'}
    <div class="HeadSection-container">
      <div class="HeadSection-content">
        <h2 class="HeadSection-header">Hopefully the Comp Page</h2>
      </div>
    </div>
  {/if}
</section>

<style src="./HeadSection.scss"></style>
