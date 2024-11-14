import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'roles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name').notNullable().unique()
      table.timestamp('created_at').nullable().defaultTo(null);
      table.timestamp('updated_at').nullable().defaultTo(null);

    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
