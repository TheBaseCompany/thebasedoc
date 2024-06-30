import type { Meta, StoryObj } from '@storybook/vue3'
import ApiBlock from './ApiBlock.vue'

const meta: Meta<typeof ApiBlock> = {
  title: 'Inertia/ApiBlock',
  component: ApiBlock,
  // Define argTypes for any props or events for ApiBlock if necessary
  argTypes: {
    // Example prop with control
    // propExample: { control: 'text' },
  },
  // Define default args for your component
  args: {
    // Example default arg
    // propExample: 'Default Value',
  },
  // Add any parameters or decorators if needed
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ApiBlock>

export default meta
type Story = StoryObj<typeof meta>

// Define stories for different states of your component
export const Default: Story = {
  // Define args for this specific story
  args: {
    // propExample: 'Value for Default',
  },
}

// Add more stories as needed for different states or variations of your component