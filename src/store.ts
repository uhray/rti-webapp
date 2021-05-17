import { writable } from 'svelte/store';
import { getContacts, getPosts, getOrders } from './tools/crudApi';

const currentUser = writable({});
const posts = writable({});
const replies = writable({});
const contacts = writable({});
const orders = writable({});
const trucks = writable({});
const teams = writable({});
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

export const repliesStore = {
  subscribe: replies.subscribe,
  setReplies: r => replies.set({ replies: r }),
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

export const teamsStore = {
  subscribe: teams.subscribe,
  setTeams: t => teams.set({ teams: t }),
};

export const dataStore = {
  subscribe: data.subscribe,
  setPostsSlug: slug => data.set({ ...data, postsSlug: slug }),
};
