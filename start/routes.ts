/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'



Route.resource('users', 'UsersController').apiOnly()

Route.post('login', async ({ request, response, auth }) => {
  const name = request.input('name')
  const lastname = request.input('lastname')
  const password = request.input('password')

  const user = await User.query().where('name', name).where('lastname', lastname).first()

  if (!user) {
    return response.notFound({ message: 'Usuario no encontrado' })
  }

  if (await Hash.verify(user.password, password)) {
    const token = await auth.use('api').generate(user)
    return response.ok({ message: 'Login exitoso', token, user })
  } else {
    return response.forbidden({ message: 'Credenciales inválidas' })
  }
})

Route.get('autenticate', async ({ auth, response }) => {
  try {
    await auth.use('api').authenticate()

    const user = auth.user

    return response.ok({ user })
  } catch {
    return response.unauthorized({ message: 'No autorizado' })
  }
}).middleware('auth:api')


