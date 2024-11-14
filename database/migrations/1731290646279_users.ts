import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    const exists = await this.schema.hasTable(this.tableName)
    if (!exists) {
      this.schema.createTable(this.tableName, (table) => {
        table.increments('id')
        table.string('name').notNullable().unique()
        table.string('lastname').notNullable()
        table.integer('age').notNullable()
        table.string('password').notNullable()
        table.boolean('active').defaultTo(1)
        table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE')
        table.timestamp('created_at').nullable().defaultTo(null)
        table.timestamp('updated_at').nullable().defaultTo(null)
      })
    }
  }

  public async down() {
    const exists = await this.schema.hasTable(this.tableName)
    if (exists) {
      this.schema.dropTable(this.tableName)
    }
  }
}
