<script>
  import Card from '../card/Card.svelte';
  export let hex = undefined;
</script>

<!-- html -->
<section class="ColorPicker">
  <Card type="card-gray-border" nospace>
    <div class="uk-flex ColorPicker-container">
      <div
        class="uk-width-1-4 ColorPicker-colorBox"
        style={`background-color: #${hex}`}
      />
      <div class="uk-width-3-4 ColorPicker-hexBox">
        <p class="ColorPicker-hexText">#{hex}</p>
      </div>
    </div>
  </Card>
</section>

<style src="./ColorPicker.scss"></style>
