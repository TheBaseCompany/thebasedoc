import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  async index({ inertia, response, auth }: HttpContext) {
    // if (!auth.isAuthenticated) {
    return inertia.render('home')
    // }
    // return response.redirect().toRoute('dashboard')
  }
}
