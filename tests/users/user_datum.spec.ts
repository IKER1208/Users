import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('Datos de Usuario', () => {
  test('obtener algunos datos del usuario con id 7', async ({ client }) => {
    const response = await client.get(`/users/7`)
    response.assertStatus(200)
    response.assertBodyContains({
      name: 'User7',
      lastname: 'Last7',
      age: 26,
      active: 0,
      role_id: 1,
    })
  })

  test('si el usuario no existe, debe retornar null, [], {} o longitud 0', async ({ client, assert }) => {
    const response = await client.get('/users/9999')
    response.assertStatus(404)
    assert.isNull(response.body().message)
  })

  test('verificar cantidad de usuarios en la base de datos, debería ser 11', async ({ assert }) => {
    const count = await Database.from('users').count('* as total')
    assert.equal(count[0].total, 11)
  })
})
