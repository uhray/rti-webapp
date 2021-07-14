<script>
  import NavItem from '../navitem/NavItem.svelte';
  import Logo from '../../../static/images/rti.png';
  import { notificationsStore, userStore } from '../../store';
  import { flatMap } from 'lodash';
  import { clearNotifications } from '../../tools/crudApi';
  export let segment;
  export let isOpen = true;
  export let user = undefined;
  export let role;

  let items = [];
  let counts = $notificationsStore.counts;

  function clickOrders() {
    if (counts.orders !== 0) {
      const counts = clearNotifications('order');
      notificationsStore.setCounts(counts);
    }
  }

  $: {
    user = $userStore;
    counts = $notificationsStore.counts;

    if (user && user.user) role = user.user.role;

    items = flatMap([
      {
        icon: 'orders',
        text: 'Orders',
        link: 'orders',
        amount: counts && counts.orders ? counts.orders : 0,
        onClick: clickOrders,
      },
      {
        icon: 'message',
        text: 'Messages',
        link: 'messages',
        amount: counts && counts.posts ? counts.posts : 0,
      },
      // { icon: 'macro', text: 'Driver Macros', link: 'macros', amount: 3 },
      // {
      //   icon: 'maintenance',
      //   text: 'Maintenance',
      //   link: 'maintenance',
      // },
      // {
      //   icon: 'vehicle-fill',
      //   text: 'Equipment',
      //   link: 'equipment',
      // },
      { text: 'line' },
      { icon: 'users', text: 'User Management', link: 'users' },
      role === 'ADMIN'
        ? { icon: 'users', text: 'Teams Management', link: 'teams' }
        : [],
      role === 'ADMIN'
        ? { icon: 'settings', text: 'Settings', link: 'settings' }
        : [],
      // { text: 'line' },
      // { icon: 'home', text: 'Home', link: '' },
      // { icon: 'components', text: 'Components', link: 'components' },
      // { text: 'Account', link: 'account' },
    ]);
  }

  function menuToggle() {
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
      <a rel="prefetch" href={item.link} on:click={item.onClick}>
        <NavItem
          isActive={segment == item.link ? true : false}
          {isOpen}
          icon={item.icon}
          amount={item.amount}
        >
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
