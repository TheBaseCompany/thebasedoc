<template>
  <div class="api-block" :class="{ collapsed: isCollapsed }">
    <div class="header" @click="toggleCollapse">
      <div class="method" v-if="method">{{ method }}</div>
      <div class="endpoint">{{ endpoint }}</div>
      <div class="title" v-if="title">{{ title }}</div>
    </div>
    <div class="description" v-if="description">{{ description }}</div>
    <div class="content">
      <div class="sample-request" v-if="sampleRequest">
        <h3>Sample Request</h3>
        <pre>{{ sampleRequest }}</pre>
      </div>
      <div class="sample-response" v-if="sampleResponse">
        <h3>Sample Response</h3>
        <pre>{{ sampleResponse }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  props: {
    method: {
      type: String,
      default: '',
    },
    endpoint: {
      type: String,
      required: true,
    },
    sampleRequest: {
      type: String,
      default: '',
    },
    sampleResponse: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    isCollapsed: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const isCollapsed = ref(false)

    const toggleCollapse = () => {
      isCollapsed.value = !isCollapsed.value
    }

    return {
      isCollapsed,
      toggleCollapse,
    }
  },
}
</script>
<style scoped>
.api-block {
  @apply border border-gray-300;
}

.api-block.collapsed .content {
  display: none;
}

.header {
  @apply cursor-pointer flex items-center mb-4 bg-black text-white p-2;
}

.method {
  @apply mr-4;
}

.endpoint {
  @apply font-bold;
}

.sample-request,
.sample-response {
  @apply mb-4;
}

.title {
  @apply text-gray-400 ml-4 text-sm;
}

.description {
  @apply mb-4;
}
</style>
