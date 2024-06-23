<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import User from '../../app/models/user';
import { Button  } from '~/components/ui/button';
import  UserAuthForm  from '~/components/UserAuthForm.vue';

defineProps<{ user: User }>()

function handleLogout() {
  router.get('/logout')
}
</script>

<template>
    <UserAuthForm />
    <div class="font-bold text-blue-500">
        Hello {{ user.username }}
    </div>
    <Button @click="handleLogout">Logout</Button>
</template>