import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddAvatarUrlToUsersTable extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Adding the avatarUrl column
      table.string('avatar_url', 255).nullable().after('email')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      // Removing the avatarUrl column if needed
      table.dropColumn('avatar_url')
    })
  }
}
