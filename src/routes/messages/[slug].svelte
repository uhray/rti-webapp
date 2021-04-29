<script context="module">
  import { setContext } from 'svelte';
  export async function preload(page, session) {
    const { slug } = page.params;

    return { slug };
  }
</script>

<script>
  import { getContext, onMount } from 'svelte';
  import { getContacts, getPosts, getOrders } from '../../tools/crudApi.ts';
  import {
    userStore,
    postsStore,
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

  onMount(async () => {
    allPosts = $postsStore.posts;
    contacts = $contactsStore.contacts;
    orders = $ordersStore.orders;
    me = $userStore.user;
    dataStore.setPostsSlug(slug);

    sortDrivers();
    sortPosts();

    loading = false;
  });

  async function sortDrivers() {
    contactsList = contacts.contacts;
    driversList = contacts.drivers;

    driversList.forEach(d => {
      teamsList.push(d.name);
      d.subgroups.forEach(s => {
        driverClassList.push(s.name);
        s.contacts.forEach(c => {
          driverIds.push(c.id);
        });
      });
    });

    driverClassList = _.uniq(driverClassList);
  }

  async function sortPosts() {
    posts =
      slug === 'all'
        ? allPosts
        : allPosts.filter(
            p =>
              p.userId == slug ||
              p.truckId == _.find(contactsList, { id: slug }).truckId
          );
    posts = posts;
    replies = posts;
    posts.map(post => {
      return { id: post._id, display: false };
    });
  }

  function trigger(id) {
    posts =
      id === 'all'
        ? allPosts
        : allPosts.filter(
            p =>
              p.userId == id ||
              p.truckId == _.find(contactsList, { id: id }).truckId
          );
    posts = posts;
    replies = posts.map(post => {
      return { id: post._id, display: false };
    });
    dataStore.setPostsSlug(id);
  }
</script>

<Messages
  {posts}
  {replies}
  {me}
  {contactsList}
  {driversList}
  {teamsList}
  {driverClassList}
  {orders}
  {slug}
  {trigger}
  {loading} />
