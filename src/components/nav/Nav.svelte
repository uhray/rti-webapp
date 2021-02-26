<script>
  import NavItem from '../navitem/NavItem.svelte';
  export let segment;

  const items = [
    { icon: 'dashboard', text: 'Dashboard' },
    { icon: 'orders', text: 'Orders' },
    { icon: 'automation', text: 'Workflow Automation' },
    { icon: 'macros', text: 'Driver Macros' },
    { icon: 'chat', text: 'Chat' },
    { icon: 'notifications', text: 'Notifications' },
  ];
</script>

<style src="./Nav.scss">

</style>

<nav class="Nav">
  {#each items as item}
    <NavItem icon={item.icon}>{item.text}</NavItem>
  {/each}
  <a href="">home</a>

  <a rel="prefetch" href="components">components</a>
</nav>
