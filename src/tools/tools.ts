import moment from 'moment';

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
