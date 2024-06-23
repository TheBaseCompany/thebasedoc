import AllyService from '#services/ally_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login(ctx: HttpContext) {
    /**
     * Step 1: Get credentials from the request body
     */
    const user = await AllyService.getUser(ctx)

    /**
     * Step 3: Login user
     */
    await ctx.auth.use('web').login(user)

    /**
     * Step 4: Send them to a protected route
     */
    ctx.response.redirect('/app')
  }

  async redirectToGithubProvider({ ally }: HttpContext) {
    return ally.use('github').redirect()
  }

  async logout(ctx: HttpContext) {
    await ctx.auth.use('web').logout()
    return ctx.response.redirect().toRoute('/')
  }
}
