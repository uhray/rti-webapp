import moment from 'moment';
import {
  contactsStore,
  ordersStore,
  postsStore,
  repliesStore,
  teamsStore,
  trucksStore,
} from '../store';
import {
  getContacts,
  getOrders,
  getPosts,
  getTeams,
  getTrucks,
} from './crudApi';

export function formatDate(d, canFormatDate = false) {
  let datetime = '';

  d = new Date(d);

  if (d) {
    if (canFormatDate) {
      if (moment(new Date(d).toISOString()).isSame(moment(), 'day')) {
        datetime = 'Today ' + moment(d).format('h:mm A');
      } else if (
        moment(new Date(d).toISOString()).isSame(
          moment().subtract(1, 'days'),
          'day'
        )
      ) {
        datetime = 'Yesterday ' + moment(d).format('h:mm A');
      } else if (
        moment(new Date(d).toISOString()).isSameOrAfter(
          moment().subtract(7, 'days'),
          'day'
        )
      ) {
        datetime = moment(d).format('dddd h:mm A');
      } else if (
        moment(new Date(d).toISOString()).isSameOrAfter(
          moment().subtract(11, 'months'),
          'day'
        )
      ) {
        datetime = moment(d).format('MMM D h:mm A');
      } else {
        datetime = moment(d).format('MMM D YYYY h:mm A');
      }
    } else {
      datetime = moment(d).format('h:mm A');
    }
  }

  return datetime;
}

export function formatInitials(name) {
  if (name) {
    var names = name.split(' '),
      initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }

    return initials;
  }
  return;
}

export const getDisplayName = user => {
  if (!user.contactInfo?.firstName) {
    return user.username;
  } else if (user.contactInfo?.firstName && !user.contactInfo?.lastName) {
    return user.contactInfo.firstName;
  } else {
    return user.contactInfo.firstName + ' ' + user.contactInfo.lastName;
  }
};

export function capitalize(string) {
  if (string) {
    return string.replace(/\w\S*/g, w =>
      w.replace(/^\w/, c => c.toUpperCase())
    );
  }
}

export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function setData(opts?) {
  let grabPosts;
  let grabContacts;
  let grabOrders;
  let grabTrucks;
  let grabTeams;
  if (!opts) {
    grabPosts = true;
    grabContacts = true;
    grabOrders = true;
    grabTrucks = true;
    grabTeams = true;
  } else {
    grabPosts = opts.posts === true ? true : false;
    grabContacts = opts.contacts === true ? true : false;
    grabOrders = opts.orders === true ? true : false;
    grabTrucks = opts.trucks === true ? true : false;
    grabTeams = opts.teams === true ? true : false;
  }

  if (grabPosts) {
    const p = await getPosts({ allMessages: true });
    const r = p.map(post => {
      return { id: post._id, display: false };
    });
    await postsStore.setPosts(p);
    await repliesStore.setReplies(r);
  }
  if (grabContacts) {
    const c = await getContacts();
    await contactsStore.setContacts(c);
  }
  if (grabOrders) {
    const o = await getOrders({});
    await ordersStore.setOrders(o);
  }
  if (grabTrucks) {
    const t = await getTrucks({});
    await trucksStore.setTrucks(t);
  }
  if (grabTeams) {
    const m = await getTeams({ noAggregate: true });
    await teamsStore.setTeams(m);
  }
}
