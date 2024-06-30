// frontend/components/metablock/api/ApiList.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3'
import ApiList from './ApiList.vue'

const meta: Meta<typeof ApiList> = {
  title: 'Components/ApiList',
  component: ApiList,
  argTypes: {
    items: {
      control: 'object',
      description: 'List of API blocks to display',
    },
  },
  args: {
    items: [
      {
        endpoint: '/api/users',
        method: 'GET',
        title: 'Get all users',
        sampleRequest: `
          curl -X GET https://api.example.com/users \
          -H "Content-Type: application/json"
        `,
        sampleResponse: `
          {
            "status": "success",
            "data": [
              {
                "id": 1,
                "name": "John Doe",
                "email": "john@example.com"
              },
              {
                "id": 2,
                "name": "Jane Doe",
                "email": "jane@example.com"
              }
            ]
          }
        `,
        collapse: true,
      },
      {
        endpoint: '/api/users',
        method: 'POST',
        title: 'Create a new user',
        sampleRequest: `
          curl -X POST https://api.example.com/users \
          -H "Content-Type: application/json" \
          -d '{
            "name": "New User",
            "email": "newuser@example.com"
          }'
        `,
        sampleResponse: `
          {
            "status": "success",
            "data": {
              "id": 3,
              "name": "New User",
              "email": "newuser@example.com"
            },
            "message": "User created successfully"
          }
        `,
        collapse: true,
      },
    ],
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'ApiList is a component that displays a list of ApiBlock components. It is useful for documenting multiple API endpoints together.',
      },
    },
  },
} satisfies Meta<typeof ApiList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      storyDescription: 'The default state of the ApiList component with sample API blocks.',
    },
  },
}
