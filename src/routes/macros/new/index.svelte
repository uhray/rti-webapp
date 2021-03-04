<script>
  import Header from './Header.svelte';
  import Input from '../../../components/input/Input.svelte';
  import RichText from '../../../components/richtext/RichText.svelte';
</script>

<Header />
<section class="NewMacro">
  <h3>Macro Information</h3>
  <Input label="Title" placeholder="Enter Macro Title" />
  <br />
  <RichText />

  <h3>Macro Configurations</h3>
  <!-- TODO: -->
  <!-- 1.) Form Fields -->
  <!-- This is a list of inputs, an input name and type, along with a delete icon -->
  <!-- A card will hold the list of inputs, and then an add new field section link -->
  <!-- 2.) Recipient Field -->
  <!-- Similar to Form Fields, but will only have one input, and it'll be a list of recipients -->
  <!-- 3.) Add Statuses Field -->
  <!-- For now , this will just hold a static toggle status -->

  <!-- Button Group -->
  <!-- TODO: -->
  <!-- 1.) Add Button Groups -->
  <!-- Add Macro, and Cancel -->
</section>

<style lang="scss">
  .NewMacro {
    padding: 2em;
  }
</style>
