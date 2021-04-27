import set from 'lodash/set';
import merge from 'lodash/merge';
import { goto } from '@sapper/app';
import { userStore } from '../store';

const tools: any = {};

export default tools;

export const crudApi = (tools.fetch = function (src, fetchOpts, opts) {
  fetchOpts = merge(
    {
      method: 'GET',
      rawData: false,
    },
    fetchOpts || {}
  );

  // query params
  const qs = fetchOpts.qs || {};
  src += '?' + serialize(qs);
  delete fetchOpts.qs;

  // raw data
  const rawData = fetchOpts.rawData;
  delete fetchOpts.rawData;

  if (fetchOpts.method !== 'GET') {
    set(fetchOpts, 'headers.Content-Type', 'application/json');
  }

  if (fetchOpts.body && typeof fetchOpts.body === 'object') {
    fetchOpts.body = JSON.stringify(fetchOpts.body);
  }

  return ((opts && opts.fetch) || window['fetch'])(src, fetchOpts || {})
    .then(res => res.json())
    .then(res => {
      if (res && res.error) return Promise.reject(res.error);
      else {
        return rawData ? res : res && res.data;
      }
    });
});

export const userLogin = async data => {
  // console.log(data);
  const res = await tools.fetch(options().turnkeyUrl + '/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  // console.log('crud', res);
  return res;
};

export const auth = async () => {
  const res = await tools.fetch(options().baseUrl + '/users/me', {
    headers: { 'Turnkey-Auth': localStorage.getItem('turnkey') || '' },
  });
  // console.log(res);
  return res;
};

export const userSignup = async data => {
  const res = await tools.fetch(options().baseUrl + '/users', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  console.log('signup res', res);
  return res;
};

export const userLogout = async () => {
  localStorage.removeItem('turnkey');
  window.location.pathname = '/signin';
};

export const getContacts = async () => {
  const res = await tools.fetch(options().baseUrl + '/users/contacts', {
    headers: { 'Turnkey-Auth': localStorage.getItem('turnkey') || '' },
  });
  // console.log(res);
  return res;
};

export const getPosts = async query => {
  const res = await tools.fetch(options().baseUrl + '/posts', {
    qs: query,
    headers: { 'Turnkey-Auth': localStorage.getItem('turnkey') || '' },
  });
  // console.log(res);
  return res;
};

export const addPost = async data => {
  const res = await tools.fetch(options().baseUrl + '/posts', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Turnkey-Auth': localStorage.getItem('turnkey') || '' },
  });
  // console.log(res);
  return res;
};

export const editPost = async (postId, data) => {
  const res = await tools.fetch(options().baseUrl + '/posts/' + postId, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Turnkey-Auth': localStorage.getItem('turnkey') || '' },
  });

  return res;
};

export const getOrders = async query => {
  const res = await tools.fetch(options().baseUrl + '/orders', {
    qs: query,
    headers: { 'Turnkey-Auth': localStorage.getItem('turnkey') || '' },
  });
  // console.log(res);
  return res;
};

export function serialize(obj, prefix?) {
  var str = [],
    p,
    k,
    v;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      k = prefix ? prefix + '[' + p + ']' : p;
      v = obj[p];
      if (v instanceof Date) v = JSON.stringify(v);
      str.push(
        typeof v == 'object'
          ? serialize(v, k)
          : encodeURIComponent(k) + '=' + encodeURIComponent(v)
      );
    }
  }
  return str.join('&');
}

export function logEvent(event, metadata) {
  // facebook events
  try {
    window['fbq']('trackCustom', event, metadata || {});
  } catch (e) {}

  // cdllife cpix events
  try {
    window['cpix']('event', event, metadata || {});
  } catch (e) {}
}

export function registerPopState(fn, name) {
  history.pushState({}, name);

  const onPopState = () => {
      deregister();
      fn();
    },
    ret = {
      trigger: () => {
        deregister();
        history.back();
        setTimeout(() => {
          fn();
        }, 10);
      },
      deregister: () => {
        deregister();
      },
    };

  window.addEventListener('popstate', onPopState);

  function deregister() {
    window.removeEventListener('popstate', onPopState);
    ret.trigger = () => {};
  }

  return ret;
}

export function changePageIfDifferent(url, page) {
  try {
    if (location.pathname + location.search !== url) {
      goto(url);
    }
  } catch (e) {
    // NOTE: we maybe should use page, but
    // this shouldn't ever happen from the backend anyway
    goto(url);
  }
}

const options = () => {
  return {
    baseUrl: 'http://localhost:5000/api/v1',
    turnkeyUrl: 'http://localhost:5000/turnkey',
    baseOptions: {
      headers: {
        'Content-Type': 'application/json',
        'Turnkey-Auth': localStorage.getItem('turnkey') || '',
      },
    },
  };
};
