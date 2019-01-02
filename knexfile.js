'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://gusfrzkk:a8QqBrf606TjkszcEJpHE4sMlMlgFVTu@baasu.db.elephantsql.com:5432/gusfrzkk',
    debug: true, // http://knexjs.org/#Installation-debug
    pool: { min: 1, max: 2 }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
