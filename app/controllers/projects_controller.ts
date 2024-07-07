// app/controllers/projects_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'
import User from '#models/user'
import inertia from '@adonisjs/inertia/client'

export default class ProjectsController {
  // Method to list all projects
  async index({ auth, response }: HttpContext) {
    // Assuming `auth.user.id` holds the ID of the authenticated user
    const userId = auth.user?.id
    if (!userId) {
      return response.status(401).json({ message: 'Unauthorized' })
    }
    const projects = await Project.query().where('ownerId', userId)
    return response.json(projects)
  }

  // Method to create a new project
  async store({ auth, request, response, inertia }: HttpContext) {
    // Extract the authenticated user's ID
    const userId = auth.user?.id
    if (!userId) {
      return response.status(401).json({ message: 'Unauthorized' })
    }

    const user = await User.findOrFail(userId)

    // Get the project data from the request, excluding the ownerId
    const projectData = request.only(['name', 'description'])

    // Assign the project to the authenticated user
    user.related('projects').create({ ...projectData })

    return response.redirect().toRoute('/')
  }
}
