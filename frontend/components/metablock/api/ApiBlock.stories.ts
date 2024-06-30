import type { Meta, StoryObj } from '@storybook/vue3'
import ApiBlock from './ApiBlock.vue'

const meta: Meta<typeof ApiBlock> = {
  title: 'Components/ApiBlock',
  component: ApiBlock,
  argTypes: {
    endpoint: { control: 'text', description: 'The API endpoint to call' },
    method: {
      control: 'select',
      options: ['GET', 'POST', 'PUT', 'DELETE'],
      description: 'HTTP method to use for the API call',
    },
    collapse: {
      control: 'boolean',
      description: 'Enable or disable collapsible sections',
    },
  },
  args: {
    endpoint: '/api/sample-endpoint',
    method: 'GET',
    collapse: true,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'ApiBlock is a component for making API calls and displaying the response. It supports collapsible sections for better organization.',
      },
    },
  },
} satisfies Meta<typeof ApiBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args:{
    title: 'Sample API Endpoint',
  },
  parameters: {
    docs: {
      storyDescription: 'The default state of the ApiBlock component.',
    },
  },
}

export const GetRequest: Story = {
  args: {
    endpoint: '/api/users',
    method: 'GET',
    title: 'Get all users',
  },
  parameters: {
    docs: {
      storyDescription: 'A GET request example.',
    },
  },
}

export const PostRequest: Story = {
  args: {
    endpoint: '/api/users',
    method: 'POST',
    title: "Update all users' information",
  },
  parameters: {
    docs: {
      storyDescription: 'A POST request example, typically used for creating resources.',
    },
  },
}

export const Collapsible: Story = {
  args: {
    endpoint: '/api/settings',
    method: 'GET',
    collapse: true,
    title: 'Settings API endpoint',
    sampleRequest: `
    curl -X GET https://api.example.com/sample-endpoint \
      -H "Content-Type: application/json" \
      -d '{
        "status": "success",
        "data": {
          "id": 12345,
          "name": "Sample Data",
          "description": "This is a sample data description.",
          "items": [
            {
              "item_id": 1,
              "item_name": "Item One",
              "item_value": "Value One"
            },
            {
              "item_id": 2,
              "item_name": "Item Two",
              "item_value": "Value Two"
            }
          ],
          "metadata": {
            "created_at": "2024-06-30T12:00:00Z",
            "updated_at": "2024-06-30T12:00:00Z",
            "version": 1.0
          }
        },
        "message": "Request was successful"
      }'`,
  },
  parameters: {
    docs: {
      storyDescription: 'An example with collapsible sections enabled.',
    },
  },
}