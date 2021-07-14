<script context="module">
  export async function preload(page, session) {
    const { PORT, ENV } = session;

    return { env: PORT, ENV };
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import Nav from '../components/nav/Nav.svelte';
  import TopNav from '../components/topnav/TopNav.svelte';
  import { userStore, postsStore, repliesStore, ordersStore } from '../store';
  import { auth, editUser } from '../tools/crudApi';
  import moment from 'moment';
  import { setData } from '../tools/tools';
  import _ from 'lodash';

  var io = require('socket.io-client');

  export let env;
  export let segment: string;
  let loading = true;
  let user = undefined;

  onMount(async () => {
    user = await auth();

    if (user.data) {
      userStore.setCurrent(user.data);
      await setData();
      initMessagesSockets();
    } else {
      console.error('Error: ', user.error);
      segment = 'signin';
    }
    loading = false;
  });

  $: {
    if ($userStore && $userStore.user) {
      const user = $userStore.user;
      localStorage.setItem('lastLogin', moment().toISOString());

      const lsLastLogin = localStorage.getItem('lastLogin');
      const dbLastLogin = user.lastLogin;

      if (
        lsLastLogin &&
        dbLastLogin &&
        moment(dbLastLogin).isSame(lsLastLogin, 'minute')
      ) {
      } else {
        const newUser = user;
        newUser.lastLogin = moment().toString();

        editUser(user._id, newUser).then(res => {
          userStore.setCurrent(res);
        });
      }
    }
  }

  function initMessagesSockets() {
    const userId = _.get(user, '_id') || _.get(user, 'data._id');

    if (!userId) {
      return;
    }

    let socket = io('http://localhost:8001', {
      transports: ['websocket'],
      pingTimeout: 60000,
      query: { userId: userId },
    });

    socket.connect();

    socket.on('connect_error', error => {
      console.error(error);
      // window.location.reload();
    });

    socket.on('connect', () => {
      socket.on('addPost', (post, initPostId) => {
        if (post.from !== userId) {
          postsStore.setPosts(_.uniqBy([post, ...$postsStore.posts], '_id'));
        } else {
          postsStore.setPosts(
            $postsStore.posts.map(p => (p._id === initPostId ? post : p))
          );
        }
        repliesStore.setReplies([
          ...$repliesStore.replies,
          { id: post._id, display: false },
        ]);
        // scrollToBottom();
      });

      socket.on('addOrderPost', (order: any, post: any) => {
        ordersStore.setOrders(_.uniqBy([...$ordersStore.orders, order], '_id'));
        postsStore.setPosts(_.uniqBy([post, ...$postsStore.posts], '_id'));
        repliesStore.setReplies([
          ...$repliesStore.replies,
          { id: post._id, display: false },
        ]);
      });

      socket.on('updatePost', post => {
        if (post) {
          postsStore.setPosts(
            $postsStore.posts.map(p => (p._id === post._id ? post : p))
          );
        }
      });
    });

    socket.on('disconnect', () => {
      console.log('socket disconnected');
    });

    return () => {
      socket.disconnect();
      socket.removeAllListeners();
    };
  }
</script>

{#if segment === 'signin' || segment === 'signup'}
  <div class="wrapper-forSignin">
    <main>
      <slot />
    </main>
  </div>
{:else}
  <div class="wrapper">
    <Nav {segment} />
    <main>
      {#if loading}
        <div class="loader">
          <div uk-spinner="ratio: 2" class="Loader-color" />
        </div>
      {:else}
        <TopNav user={$userStore} />
        <div class="main-content">
          <slot />
        </div>
      {/if}
    </main>
  </div>
{/if}

<style lang="scss" global>
  @import '../theme/theme.scss';

  .wrapper {
    min-height: 100vh;

    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .wrapper-forSignin {
    min-height: 100vh;

    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
  }

  main {
    position: relative;
    width: 100%;
    min-height: 100vh;
    height: inherit;
    background-color: white;
    box-sizing: border-box;

    .loader {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .main-content {
    height: 100%;
    // padding: 2em;
  }
</style>
