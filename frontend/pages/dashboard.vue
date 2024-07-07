<script setup lang="ts">
import { router } from '@inertiajs/vue3'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'

import { reactive } from 'vue'
import User from 'App/models/user'
import Button from '~/components/ui/button/Button.vue'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import AppLayout from '~/layouts/AppLayout.vue'
import Project from 'App/models/project'


defineProps<{ user: User, projects: Project[] }>()
defineOptions({ layout: AppLayout })

function handleLogout() {
  router.get('/logout')
}

const createProjectForm: Project = reactive({
  name: null,
})

async function submit() {
  await router.post('/projects', createProjectForm, {preserveState: true})
}


</script>

<template>
  <div class="font-bold text-blue-500">Hello {{ user.username }}</div>
  <Popover>
    <div v-for="project in projects">
      {{ project.name }}
    </div>
    <PopoverTrigger>
      <Button>Create Project</Button>
    </PopoverTrigger>
    <PopoverContent>
      <form @submit.prevent="submit" class="flex flex-col gap-4">
        <Label></Label>
        <div class="flex gap-2">
          <Input v-model="createProjectForm.name" placeholder="Project name" />
          <Button type="submit">
            Create
          </Button>
        </div>
      </form>
    </PopoverContent>
  </Popover>
</template>
