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
  import { userStore } from '../../store';
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
  let orders = [];
  let loading = true;

  onMount(async () => {
    const contacts = await getContacts();
    orders = await getOrders();

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

    me = $userStore.user;
    allPosts = await getPosts({ allMessages: true });

    posts =
      slug === 'all'
        ? allPosts
        : allPosts.filter(
            p =>
              p.userId == slug ||
              p.truckId == _.find(contactsList, { id: slug }).truckId
          );
    posts = posts;
    replies = posts.map(post => {
      return { id: post._id, display: false };
    });

    loading = false;
  });

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
