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
const DashboardController = () => import('#controllers/dashboard_controller')
const ProjectsController = () => import('#controllers/projects_controller')

router.get('/github/redirect', [AuthController, 'redirectToGithubProvider'])
router
  .group(() => {
    router.on('/login').renderInertia('login').as('login')
    router.get('/github/callback', [AuthController, 'login'])
  })
  .use(middleware.guest())

// Auth routes
router
  .group(() => {
    router.get('/', [DashboardController, 'index']).as('dashboard')
    router.get('/logout', [AuthController, 'logout'])
    // Projects routes
    router.get('/projects', [ProjectsController, 'index']).as('projects.index')
    router.post('/projects', [ProjectsController, 'store']).as('projects.store')
  })
  .use(middleware.auth())
