<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { onMounted, watch } from 'vue';
import { toast } from 'vue-sonner';
import { Toaster } from '@/components/ui/sonner';
import 'vue-sonner/style.css';

const page = usePage();

onMounted(() => {
    watch(
        () => page.flash,
        (flash) => {
            if (typeof flash.success === 'string' && flash.success) {
                toast.success(flash.success);
            }
            if (typeof flash.info === 'string' && flash.info) {
                toast.info(flash.info);
            }
            if (typeof flash.error === 'string' && flash.error) {
                toast.error(flash.error);
            }
        },
        { immediate: true },
    );
});
</script>

<template>
    <Toaster position="top-right" rich-colors close-button />
</template>
