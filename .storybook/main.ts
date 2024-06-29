import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  // viteFinal: (config) => {
  //     const vueDocgenIndex = config.plugins?.findIndex(({ name }) => name === 'storybook:vue-docgen-plugin')
  //     if (vueDocgenIndex !== -1) config.plugins?.splice(vueDocgenIndex, 1)
  //     return config 
  // },

  framework: {
    name: '@storybook/vue3-vite',
    options: {
    },
  },
}
export default config
