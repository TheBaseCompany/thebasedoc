/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const HomeController = () => import('#controllers/home_controller')
const DashboardController = () => import('#controllers/dashboard_controller')

router.get('/github/redirect', [AuthController, 'redirectToGithubProvider'])
router
  .group(() => {
    router.on('/login').renderInertia('login').as('login')
    router.get('/', [HomeController, 'index']).as('home')
    router.get('/github/callback', [AuthController, 'login'])
  })
  .use(middleware.guest())

// Auth routes
router
  .group(() => {
    router.get('/app', [DashboardController, 'index']).as('dashboard')
    router.get('/logout', [AuthController, 'logout'])
  })
  .use(middleware.auth())
