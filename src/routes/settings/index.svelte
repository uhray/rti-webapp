<script>
  import Card from '../../components/card/Card.svelte';
</script>

<section>
  <!-- Upload Logo Section -->
  <h4>Upload your logo</h4>
  <p>Recommended file types: .jpeg, .png, .svg, .tiff</p>
  <div class="uk-flex">
    <div class="Settings-card">
      <Card
        type="card-gray-border"
        header="Some Header"
        content="Some Content"
      />
    </div>
    <div class="Settings-logoPreview">
      <!-- Logo Preview -->
      logopreview
    </div>
  </div>

  <!-- Change Theme Section -->
</section>

<style lang="scss">
  .Settings-card {
    width: 35%;
  }
  .Settings-logoPreview {
    width: 35%;
  }
</style>
