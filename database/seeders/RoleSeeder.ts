import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'


export default class extends BaseSeeder {
  public async run() {
    await Role.updateOrCreateMany('name', [
      { name: 'Admin' },
      { name: 'User' },
    ])
  }
}
