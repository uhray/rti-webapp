<script context="module">
  export async function preload({ params }) {
    const { contactId } = params;

    return { slug: contactId };
  }
</script>

<script>
  import { onMount } from 'svelte';
  import { getContacts, getPosts, getOrders } from '../../tools/crudApi.ts';
  import { userStore } from '../../store';
  import Messages from '../../components/Messages/Messages.svelte';

  export let slug;

  let posts = [];
  let replies = [];
  let me = {};
  let contactsList = [];
  let driversList = [];
  let driverIds = [];
  let orders = [];

  onMount(async () => {
    const contacts = await getContacts();
    orders = await getOrders();

    contactsList = contacts.contacts;
    driversList = contacts.drivers;

    driversList.forEach(d => {
      d.subgroups.forEach(s => {
        s.contacts.forEach(c => {
          driverIds.push(c.id);
        });
      });
    });

    me = $userStore.user;
    posts = await getPosts({ driverId: slug });
    console.log('### POSTS ###', posts);
    replies = posts.map(post => {
      return { id: post._id, display: false };
    });
  });
</script>

<Messages {posts} {replies} {me} {contactsList} {driversList} {orders} />
