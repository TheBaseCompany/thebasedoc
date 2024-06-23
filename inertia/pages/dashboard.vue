<script setup lang="ts">
import User from '../../app/models/user';
defineProps<{ user: User }>()

</script>

<template>
    Hello {{ user.username }}
</template>