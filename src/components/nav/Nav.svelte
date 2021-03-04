<script>
  import Icon from '../icon/Icon.svelte';
  import NavItem from '../navitem/NavItem.svelte';
  import Logo from '../../../static/images/rti.png';
  export let segment;
  export let isOpen = true;

  const items = [
    { icon: 'orders', text: 'Orders', link: 'orders' },
    { icon: 'macro', text: 'Driver Macros', link: 'macros', amount: 3 },
    { icon: 'message', text: 'Messages', amount: 999 },
    { text: 'line' },
    { icon: 'users', text: 'User Management' },
    { icon: 'settings', text: 'Settings', link: 'settings' },
    { text: 'line' },
    { icon: 'home', text: 'Home', link: '' },
    { icon: 'components', text: 'Components', link: 'components' },
    { text: 'Account', link: 'account' },
  ];

  function menuToggle() {
    console.log('TOGGLE MENU');
    isOpen = !isOpen;
  }
</script>

<nav class={isOpen ? 'Nav' : 'Nav-closed'}>
  <div class="collapse" on:click={menuToggle}>
    <NavItem {isOpen} icon={isOpen ? 'arrow-left' : 'arrow-right'}>
      <span>Collapse</span>
    </NavItem>
  </div>

  <div class="linefull" />

  {#each items as item}
    {#if item.text == 'line'}
      <div class="line" />
    {:else}
      <a rel="prefetch" href={item.link}>
        <NavItem {isOpen} icon={item.icon} amount={item.amount}>
          <span>{item.text}</span>
        </NavItem>
      </a>
    {/if}
  {/each}

  <div class="Nav-footer">
    <div class="Nav-footer-logo">
      <img src={Logo} alt="Riverside Trucking" />
    </div>
    <div class="Nav-footer-text">
      Riverside
      <br />
      Transport Inc.
    </div>
  </div>
</nav>

<style src="./Nav.scss">
</style>
