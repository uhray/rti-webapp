import { writable } from 'svelte/store';

const currentUser = writable({});

export const userStore = {
    subscribe: currentUser.subscribe,
    setCurrent: (user: any) => currentUser.set({isLoggedIn:true,user}),
    userLogout: () => currentUser.set({isLoggedIn:false, user:null})
}