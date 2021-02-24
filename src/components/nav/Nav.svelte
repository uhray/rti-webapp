<script>
  export let segment;
</script>

<nav class="Nav">
  <ul>
    <li>
      <a aria-current={segment === undefined ? 'page' : undefined} href="."
        >home</a
      >
    </li>
    <li>
      <a
        rel="prefetch"
        aria-current={segment === 'blog' ? 'page' : undefined}
        href="components">components</a
      >
    </li>
  </ul>
</nav>

<style src="./Nav.scss">
</style>
