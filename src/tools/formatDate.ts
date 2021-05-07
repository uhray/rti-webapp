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
