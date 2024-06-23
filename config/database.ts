import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

// Function to create a Turso-synced LibSQL client
// const createTursoClient = () => {
//   return createClient({
//     // url: "file:./database/libsql.db",
//     url: env.get('DB_URL'),
//     authToken: env.get('DB_TOKEN'),
//   })
// }

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
      useNullAsDefault: true,
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig
