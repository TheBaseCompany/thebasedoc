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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { useToast } from '~/components/ui/toast/use-toast'


defineProps<{ user: User, projects: Project[] }>()
defineOptions({ layout: AppLayout })

const createProjectForm: any = reactive({
  name: null,
})

const { toast } = useToast()

function submit() {
  router.post('/projects', createProjectForm, {
    preserveState: true,
    onSuccess: () => {
      toast({
        title: 'Project created',
        description: `Your project \"${createProjectForm.name}\" has been created successfully`,
      })
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Error creating project',
        description: error.name.join(', '), // error.name is an array of strings
        status: 'error',
      })
    },
  })
}

</script>

<template>
  <div class="font-bold text-blue-500">Hello {{ user.username }}</div>
  <Popover>
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

  <div v-for="project in projects">
    {{ project.name }}
  </div>
</template>
