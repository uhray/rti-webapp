require('dotenv').config();

import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV, RANDOM } = process.env;
const isDev = NODE_ENV === 'development';

polka() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev: isDev }),
    sapper.middleware({
      session: () => ({
        NODE_ENV,
        PORT,
        RANDOM,
      }),
    })
  )
  .listen(PORT || 3001, err => {
    if (err) console.log('error', err);
  });
