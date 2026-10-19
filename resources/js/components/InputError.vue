<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    message?: string | string[] | null;
}>();

const messages = computed(() =>
    (Array.isArray(props.message) ? props.message : [props.message]).filter(
        (message): message is string => !!message?.trim(),
    ),
);
</script>

<template>
    <div v-if="messages.length" role="alert" class="text-sm text-red-700">
        <p v-for="(message, index) in messages" :key="index">
            {{ message }}
        </p>
    </div>
</template>
