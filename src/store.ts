import { writable } from 'svelte/store';
import { getContacts, getPosts, getOrders } from './tools/crudApi';

const currentUser = writable({});
const posts = writable({});
const contacts = writable({});
const orders = writable({});
const trucks = writable({});
const data = writable({});

export const userStore = {
  subscribe: currentUser.subscribe,
  setCurrent: (user: any) => currentUser.set({ isLoggedIn: true, user }),
  userLogout: () => currentUser.set({ isLoggedIn: false, user: null }),
};

export const postsStore = {
  subscribe: posts.subscribe,
  setPosts: p => posts.set({ posts: p }),
};

export const contactsStore = {
  subscribe: contacts.subscribe,
  setContacts: c => contacts.set({ contacts: c }),
};

export const ordersStore = {
  subscribe: orders.subscribe,
  setOrders: o => orders.set({ orders: o }),
};

export const trucksStore = {
  subscribe: trucks.subscribe,
  setTrucks: t => trucks.set({ trucks: t }),
};

export const dataStore = {
  subscribe: data.subscribe,
  setPostsSlug: slug => data.set({ ...data, postsSlug: slug }),
};
