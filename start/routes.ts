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

router
  .group(() => {
    router.get('/app', [DashboardController, 'index']).as('dashboard')
    router.get('/', [HomeController, 'index']).as('home')
  })
  .use(middleware.auth())

// Auth routes
router.group(() => {
  router.get('/github/redirect', [AuthController, 'redirectToGithubProvider'])
  router.get('/github/callback', [AuthController, 'login'])
  router.get('/logout', [AuthController, 'logout'])
})
