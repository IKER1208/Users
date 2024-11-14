import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Role from 'App/Models/Role'
import Hash from '@ioc:Adonis/Core/Hash'

export default class extends BaseSeeder {
  public async run() {
    await User.query().delete()

    const adminRole = await Role.firstOrCreate({ name: 'Admin' })
    const userRole = await Role.firstOrCreate({ name: 'User' })

    await User.createMany([
      {
        name: 'User1',
        lastname: 'Last1',
        age: 25,
        password: await Hash.make('password1'),
        active: true,
        roleId: adminRole.id,
      },
      {
        name: 'User2',
        lastname: 'Last2',
        age: 30,
        password: await Hash.make('password2'),
        active: true,
        roleId: userRole.id,
      },
      {
        name: 'User3',
        lastname: 'Last3',
        age: 28,
        password: await Hash.make('password3'),
        active: false,
        roleId: userRole.id,
      },
      {
        name: 'User4',
        lastname: 'Last4',
        age: 22,
        password: await Hash.make('password4'),
        active: true,
        roleId: adminRole.id,
      },
      {
        name: 'User5',
        lastname: 'Last5',
        age: 35,
        password: await Hash.make('password5'),
        active: false,
        roleId: adminRole.id,
      },
      {
        name: 'User6',
        lastname: 'Last6',
        age: 29,
        password: await Hash.make('password6'),
        active: true,
        roleId: userRole.id,
      },
      {
        name: 'User7',
        lastname: 'Last7',
        age: 26,
        password: await Hash.make('password7'),
        active: false,
        roleId: adminRole.id,
      },
      {
        name: 'User8',
        lastname: 'Last8',
        age: 24,
        password: await Hash.make('password8'),
        active: true,
        roleId: userRole.id,
      },
      {
        name: 'User9',
        lastname: 'Last9',
        age: 33,
        password: await Hash.make('password9'),
        active: false,
        roleId: adminRole.id,
      },
      {
        name: 'User10',
        lastname: 'Last10',
        age: 27,
        password: await Hash.make('password10'),
        active: true,
        roleId: userRole.id,
      },
    ])
  }
}
