import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'libsql',
  connections: {
    libsql: {
      client: 'libsql',
      connection: ['staging', 'production'].includes(env.get('DB_MODE'))
        ? {
            filename: env.get('DB_URL'),
          }
        : {
            filename: 'file:./database/libsql.db',
          },
      pool: {
        min: 0,
        idleTimeoutMillis: 5 * 1000,
      },
      useNullAsDefault: true,
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig
