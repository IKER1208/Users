import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'

test.group('Operaciones CRUD', () => {
  test('crear algunos usuarios y verificar la cantidad de nuevos usuarios en la DB', async ({ client, assert }) => {
    await client.post('/users').json({ name: 'User11', lastname: 'Last11', age: 28, password: 'pass11', active: true, roleId: 2 })
    await client.post('/users').json({ name: 'User12', lastname: 'Last12', age: 32, password: 'pass12', active: true, roleId: 1 })
    const count = await Database.from('users').count('* as total')
    assert.equal(count[0].total, 12)
  })

  test('eliminar 2 usuarios en la DB y verificar la nueva cantidad', async ({ client, assert }) => {
    await client.delete(`/users/9`)
    await client.delete(`/users/10`)

    const count = await Database.from('users').count('* as total')
    assert.equal(count[0].total, 10)
  })

  test('actualizar la información de 1 usuario y verificar el cambio en la DB', async ({ client }) => {
    const response = await client.put(`/users/3`).json({ name: 'UpdatedName', age: 30 })

    response.assertBodyContains({ message: 'Actualización exitosa' })
  })
})
