// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'root',
      database: 'eBookStore'
    },
    migrations: {
      directory: __dirname + "/db/migration"
    },
    seeds: {
      directory: __dirname + "/db/seeds"
    }
  }
};
