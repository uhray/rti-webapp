<script lang="ts">
  export let segment: string;
</script>

<section class="HeadSection">
  {#if segment === 'settings'}
    <div class="HeadSection-container">
      <div class="HeadSection-content">
        <h2 class="HeadSection-header">App Settings</h2>
        <p class="HeadSection-subHeader">
          A short sentence about some application settings
        </p>
      </div>
    </div>
  {/if}
  {#if segment === 'manage'}
    <div class="HeadSection-container">
      <div class="HeadSection-content">
        <h2 class="HeadSection-header">User Manangement</h2>
        <p class="HeadSection-subHeader">
          Here you can manage your active users.
        </p>
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
