<script context="module">
  import { setContext } from 'svelte';
  export async function preload(page, session) {
    const { slug } = page.params;

    return { slug };
  }
</script>

<script>
  import { onMount } from 'svelte';
  import {
    userStore,
    postsStore,
    repliesStore,
    contactsStore,
    ordersStore,
    dataStore,
  } from '../../store';
  import Messages from '../../components/Messages/Messages.svelte';

  export let slug;

  let allPosts = [];
  let posts = [];
  let replies = [];
  let me = {};
  let contactsList = [];
  let driversList = [];
  let driverIds = [];
  let teamsList = [];
  let driverClassList = [];
  let contacts = [];
  let orders = [];
  let loading = true;

  $: {
    allPosts = $postsStore.posts;
    contacts = $contactsStore.contacts;
    orders = $ordersStore.orders;
    me = $userStore.user;
    dataStore.setPostsSlug(slug);

    sortDrivers();
    trigger(slug);

    loading = false;
  }

  async function sortDrivers() {
    contactsList = contacts.users;
    driversList = contacts.teams;

    driversList.forEach(d => {
      teamsList.push(d.name);
      d.subgroups.forEach(s => {
        if (s.name) {
          driverClassList.push(s.name);
        } else {
          driverClassList.push('Unclassified');
        }
        s.contacts.forEach(c => {
          driverIds.push(c.id);
        });
      });
    });

    driverClassList = _.uniq(driverClassList);
  }

  async function sortPosts(id) {
    posts =
      id === 'all'
        ? allPosts
        : allPosts.filter(
            p =>
              p.userId == id ||
              p.truckId == _.find(contactsList, { id: id }).truckId
          );
    posts = posts;
  }

  function trigger(id) {
    sortPosts(id);
    dataStore.setPostsSlug(id);
  }
</script>

<Messages
  {posts}
  {me}
  {contactsList}
  {driversList}
  {teamsList}
  {driverClassList}
  {orders}
  {slug}
  {trigger}
  {loading} />
