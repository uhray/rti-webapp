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
import { opts as varOpts } from '../tools/opts';
import _ from 'lodash';

export function formatDate(d, canFormatDate = false) {
  let datetime = '';
  console.log('data',d);

  
  if (d) {
    d = new Date(d);
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
  if (!_.get(user, 'contactInfo.firstName')) {
    if (!_.get(user, 'username')) {
      return 'NO NAME FOUND';
    } else {
      return _.get(user, 'username');
    }
  } else if (
    _.get(user, 'contactInfo.firstName') &&
    !_.get(user, 'contactInfo.lastName')
  ) {
    return _.get(user, 'contactInfo.firstName');
  } else {
    return (
      _.get(user, 'contactInfo.firstName') +
      ' ' +
      _.get(user, 'contactInfo.lastName')
    );
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
    const p = await getPosts({
      allMessages: true,
      page: 0,
      perPage: varOpts.perPage,
    });
    const r = p.map(post => {
      return { id: post._id, display: false };
    });

    let localPosts: any = localStorage.getItem('errorAdminPosts');
    if (localPosts) {
      localPosts = JSON.parse('[' + localPosts + ']').reverse();
    } else {
      localPosts = [];
    }

    const posts = _.sortBy(
      _.uniqBy([...p, ...localPosts], '_id'),
      'sortDatetime'
    ).reverse();

    await postsStore.setPosts(posts);
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
