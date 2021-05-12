<script>
  export let page = undefined;
  export let pageUrl = undefined;
  export let subpage = undefined;
</script>

<style src="./NavLabel.scss">

</style>

<section class="NavLabel">
  <p class="NavLabel-navHead">
    <a href={pageUrl}>{page}</a>
    /
    <span class="Header-navHead-name">{subpage}</span>
  </p>
</section>
