<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

defineProps<{
    title: string;
    description?: string;
    active?: 'dashboard' | 'courses' | 'services' | 'requests' | 'earnings';
}>();
</script>

<template>
    <Head :title="title" />
    <section class="mx-auto w-full max-w-7xl space-y-6 px-5 py-8 sm:px-8">
        <div>
            <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
            <p
                v-if="description"
                class="text-muted-foreground mt-2 text-sm leading-6"
            >
                {{ description }}
            </p>
        </div>
        <Alert
            ><AlertTitle>Instructor workspace preview</AlertTitle
            ><AlertDescription
                >Course drafts, services and workspace settings are saved in
                this tab. Request scenarios reset on navigation. Nothing is
                uploaded, transmitted, charged or published to the
                platform.</AlertDescription
            ></Alert
        >
        <slot />
    </section>
</template>
