import vine from '@vinejs/vine'

// Validiate the project creation action
export const createProjectValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(255),
  })
)
