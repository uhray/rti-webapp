import { writable } from 'svelte/store';
import { getContacts, getPosts, getOrders } from './tools/crudApi';

const currentUser = writable({});
const posts = writable({});
const replies = writable({});
const contacts = writable({});
const orders = writable({});
const trucks = writable({});
const teams = writable({});
const notifications = writable({});
const data = writable({});

export const userStore = {
  isLoggedIn: false,
  user: {},
  subscribe: currentUser.subscribe,
  setCurrent: (user: any) => currentUser.set({ isLoggedIn: true, user }),
  userLogout: () => currentUser.set({ isLoggedIn: false, user: null }),
};

export const postsStore = {
  posts: [],
  subscribe: posts.subscribe,
  setPosts: p => posts.set({ posts: p }),
};

export const repliesStore = {
  replies: [],
  subscribe: replies.subscribe,
  setReplies: r => replies.set({ replies: r }),
};

export const contactsStore = {
  contacts: [],
  subscribe: contacts.subscribe,
  setContacts: c => contacts.set({ contacts: c }),
};

export const ordersStore = {
  orders: [],
  subscribe: orders.subscribe,
  setOrders: o => orders.set({ orders: o }),
};

export const trucksStore = {
  trucks: [],
  subscribe: trucks.subscribe,
  setTrucks: t => trucks.set({ trucks: t }),
};

export const teamsStore = {
  teams: [],
  subscribe: teams.subscribe,
  setTeams: t => teams.set({ teams: t }),
};

export const notificationsStore = {
  notifications: [],
  counts: { total: 0, orders: 0, posts: 0 },
  subscribe: notifications.subscribe,
  setNotifications: n =>
    notifications.set({ ...notificationsStore, notifications: n }),
  setCounts: n => notifications.set({ ...notificationsStore, counts: n }),
};

export const dataStore = {
  postsSlug: '',
  subscribe: data.subscribe,
  setPostsSlug: slug => data.set({ ...data, postsSlug: slug }),
};
