<script>
  import NavItem from '../navitem/NavItem.svelte';
  export let segment;
  export let isOpen = 'Nav';

  const items = [
    { icon: 'orders', text: 'Orders' },
    { icon: 'macros', text: 'Driver Macros' },
    { icon: 'chat', text: 'Messages' },
    { text: 'line' },
    { icon: 'users', text: 'User Management' },
    { icon: 'settings', text: 'Settings' },
    { text: 'line' },
    { icon: 'home', text: 'Home', link: '' },
    { icon: 'components', text: 'Components', link: 'components' },
  ];

  function menuToggle() {
    isOpen = !isOpen;
  }
</script>

<style src="./Nav.scss">

</style>

<nav class={isOpen ? 'Nav' : 'Nav-closed'}>

  <div class="collapse" on:click={menuToggle}>
    <svg
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="Icon-defaultSpacing">
      <path
        d="M0 7.66797C0 7.96875 0.164062 8.37891 0.382812 8.59766L6.15234
        14.3672C6.67188 14.8867 7.51953 14.8867 8.01172 14.3672L13.5898
        8.78906C14.1094 8.29688 14.1094 7.44922 13.5898 6.92969L7.82031
        1.16016C7.60156 0.941406 7.19141 0.75 6.89062 0.75H1.3125C0.574219 0.75
        0 1.35156 0 2.0625V7.66797ZM3.0625 2.5C3.77344 2.5 4.375 3.10156 4.375
        3.8125C4.375 4.55078 3.77344 5.125 3.0625 5.125C2.32422 5.125 1.75
        4.55078 1.75 3.8125C1.75 3.10156 2.32422 2.5 3.0625 2.5Z"
        fill="#fff" />
    </svg>
    <span>Collapse</span>
  </div>

  {#each items as item}
    {#if item.text == 'line'}
      <div class="line" />
    {:else}
      <a rel="prefetch" href={item.link}>
        <NavItem {isOpen} icon={item.icon}>
          <span>{item.text}</span>
        </NavItem>
      </a>
    {/if}
  {/each}
</nav>
