import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, ENV } = process.env;
const isDev = ENV === 'dev' || ENV === 'local';

polka() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev: isDev }),
    sapper.middleware({
      session: () => ({
        ENV,
        PORT,
      }),
    })
  )
  .listen(PORT || 3000, err => {
    if (err) console.log('error', err);
  });
