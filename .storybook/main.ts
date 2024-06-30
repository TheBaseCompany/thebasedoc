import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx', 
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../frontend/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
    },
  },
  async viteFinal(config, { configType }) {
    // Function to recursively remove the plugin-containing arrays
    const removePluginArrays = (plugins) => {
      return plugins.reduce((acc, plugin) => {
        if (Array.isArray(plugin)) {
          // Check if the array contains the 'vite-plugin-adonis:config' plugin
          if (!plugin.some(item => item.name === 'vite-plugin-adonis:config')) {
            acc.push(removePluginArrays(plugin)); // Recursively process nested arrays
          }
        } else if (plugin.name !== 'vite-plugin-adonis:config') {
          acc.push(plugin);
        }
        return acc;
      }, []);
    };

    // Create a new array for the plugins without the unwanted plugin arrays
    const filteredPlugins = removePluginArrays(config.plugins);

    // Assign the filtered plugins back to config.plugins
    config.plugins = filteredPlugins;

    // Return the customized config
    return config;
  },
}
export default config
