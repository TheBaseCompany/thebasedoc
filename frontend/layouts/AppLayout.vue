<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3'
import User from 'App/models/user'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

function handleLogout() {
  router.get('/logout')
}

defineProps<{
  user?: User
}>()

</script>

<template>
  <div class="bg-white flex flex-row">
    <div class="font-bold">The Base Doc</div>
    <div>
      <!-- <img v-if="user" :src="user.avatarUrl" class="w-8 h-8 rounded-full" /> -->
      <DropdownMenu>
        <DropdownMenuTrigger>

          <Avatar>
            <AvatarImage :src="user?.avatarUrl" alt="@radix-vue" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Hi {{ user?.fullName }}!</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="handleLogout">Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
  <div class="container">
    <slot />
  </div>
</template>
