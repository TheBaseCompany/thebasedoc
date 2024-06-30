<script setup lang="ts">
import { ref } from 'vue'
// import LucideSpinner from '~icons/lucide/loader-2'
// import GitHubLogo from '~icons/radix-icons/github-logo'
import RiGithubFill from "vue-remix-icons/icons/ri-github-fill.vue"


import { cn } from '~/lib/utils'
import { Button } from './ui/button/index'
import { Label } from './ui/label/index'
import { router } from '@inertiajs/vue3'
// import { Link, router } from '@inertiajs/vue3'

async function onSubmit(event: Event) {
  // event.preventDefault()
  // isLoading.value = true

  // setTimeout(() => {
  //   isLoading.value = false
  // }, 3000)
}
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <!-- <form @submit="onSubmit"> -->
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label class="sr-only" for="email">
            Email
          </Label>
        </div>
        <a href="/github/redirect" class="no-underline z-50">
          <Button class="flex gap-2 w-full">
            <RiGithubFill class="h-4 w-4" />
            Sign In with Github
          </Button>
        </a>
      </div>
    <!-- </form> -->
  </div>
</template>