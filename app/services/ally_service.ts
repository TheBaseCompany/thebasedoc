import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class AllyService {
  static async getUser(ctx: HttpContext) {
    const gh = ctx.ally.use('github')

    if (gh.accessDenied()) {
      throw new Error('You have cancelled the login process')
    }

    if (gh.stateMisMatch()) {
      throw new Error('We are unable to verify the request. Please try again')
    }

    if (gh.hasError()) {
      throw new Error(gh.getError() ?? undefined)
    }

    const githubUser = await gh.user()

    let user = await User.findBy('email', githubUser.email)

    if (!user) {
      user = new User()
      user.username = githubUser.name
      user.email = githubUser.email
      user.password = await hash.make(String(githubUser.token))
      await user.save()
    }
    return user
  }
}
