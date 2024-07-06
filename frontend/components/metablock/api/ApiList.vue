// frontend/components/metablock/api/ApiList.vue

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ApiBlock from './ApiBlock.vue'

type ApiBlockProps = {
  endpoint: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  sampleRequest: string
  title: string
  collapse?: boolean
}

export default defineComponent({
  components: {
    ApiBlock,
  },
  props: {
    items: {
      type: Array as PropType<ApiBlockProps[]>,
      required: true,
    },
  },
})
</script>

<template>
  <div class="api-list">
    <ApiBlock v-for="(item, index) in items" :key="index" v-bind="item" />
  </div>
</template>

<style scoped>
.api-list {
  @apply flex flex-col gap-0; /* Adjust the gap as needed */
}
</style>
