import { test } from '@japa/runner'

test.group('Gestión de Usuarios', () => {
  test('probar creación de usuario', async ({ client, assert }) => {
    const response = await client.post('/users').json({
      name: 'John',
      lastname: 'Doe',
      age: 30,
      password: 'password123',
      active: true,
      roleId: 1,
    })
    response.assertStatus(201)
    assert.exists(response.body().id)
  })

  test('inicio de sesión de usuario correcto', async ({ client, assert }) => {
    const response = await client.post('/login').json({
      name: 'User1',
      lastname: 'Last1',
      password: 'password1',
    })
    response.assertStatus(200)
    assert.equal(response.body().message, 'Login exitoso')
    assert.exists(response.body().user)
  })

  test('inicio de sesión de usuario incorrecto (403)', async ({ client, assert }) => {
    const response = await client.post('/login').json({
      name: 'User1',
      lastname: 'Last1',
      password: 'wrongpassword',
    })
    response.assertStatus(403)
    assert.equal(response.body().message, 'Credenciales inválidas')
  })

  test('obtener información de un usuario autenticado', async ({ client, assert }) => {
    const loginResponse = await client.post('/login').json({
      name: 'User6',
      lastname: 'Last6',
      password: 'password6',
    })

    loginResponse.assertStatus(200)
    const token = loginResponse.body().token.token
    assert.isDefined(token, 'El token debería estar definido')

    const response = await client.get('/autenticate').header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    response.assertBodyContains({
      user: {
        id: 6,
        name: 'User6',
        lastname: 'Last6',
        age: 29,
        active: 1,
        role_id: 2,
      },
    })
  })
})
