import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'


export default class UsersController {
    public async index({ response }: HttpContextContract) {
        const users = await User.all()
        return response.ok(users)
    }

    public async store({ request, response }: HttpContextContract) {
        const data = request.only(['name', 'lastname', 'age', 'password', 'active', 'roleId'])
        const user = await User.create(data)
        return response.created(user)
    }

    public async show({ params, response }: HttpContextContract) {
        const user = await User.find(params.id)
        if (user) {
            return response.ok(user)
        } else {
            return response.notFound({ message: null })
        }
    }

    public async update({ params, request, response }: HttpContextContract) {
        const user = await User.find(params.id)
        if (user) {
            user.merge(request.only(['name', 'lastname', 'age', 'password', 'active', 'roleId']))
            await user.save()
            return response.ok({ message: 'Actualización exitosa' })
        } else {
            return response.notFound({ message: 'Usuario no encontrado' })
        }
    }

    public async destroy({ params, response }: HttpContextContract) {
        const user = await User.find(params.id)
        if (user) {
            await user.delete()
            return response.ok({ message: 'Usuario eliminadop' })
        } else {
            return response.notFound({ message: 'Usuario no encontrado' })
        }
    }
}