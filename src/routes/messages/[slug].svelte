<script context="module">
  export async function preload(page) {
    const { slug } = page.params;

    return { slug };
  }
</script>

<script>
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

    teamsList = [];

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
    if (me.role === 'ADMIN') {
      posts =
        id === 'all'
          ? allPosts.filter(
              p =>
                p.from === me._id ||
                p.userId === me._id ||
                p.postType === 'ALERT'
            )
          : allPosts.filter(
              p =>
                (p.from === me._id || p.userId === me._id) &&
                (p.userId === id || p.from === id)
            );
    } else {
      posts =
        id === 'all'
          ? allPosts
          : allPosts.filter(
              p =>
                p.userId == id ||
                p.truckId == _.find(contactsList, { id: id }).truckId
            );
    }
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
  {loading}
/>
