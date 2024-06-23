import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async index({ auth, inertia }: HttpContext) {
    if (!auth.isAuthenticated) {
      return 'not yet logged in'
    } else {
      const user: User | null = await User.findBy('username', auth.user?.username)
      return inertia.render('dashboard', { user })
    }
  }
}
