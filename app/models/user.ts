import { DateTime } from 'luxon'
// import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Project from './project.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
// import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
// import hash from '@adonisjs/core/services/hash'

// const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
//   uids: ['email'],
//   passwordColumnName: 'password',
// })

// export default class User extends compose(BaseModel, AuthFinder) {
export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare username: string

  @column()
  declare email: string

  @column()
  declare avatarUrl: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Project, {
    foreignKey: 'ownerId',
  })
  declare projects: HasMany<typeof Project>
}
