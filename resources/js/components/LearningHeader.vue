<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
const page = usePage();
</script>

<template>
    <nav
        aria-label="Learning navigation"
        class="flex flex-wrap gap-2 border-b px-5 py-3 sm:px-8"
    >
        <Button
            as-child
            :variant="
                page.component === 'Learning/Player' ? 'secondary' : 'ghost'
            "
            ><Link
                href="/my-courses/full-stack"
                :aria-current="
                    page.component === 'Learning/Player' ? 'page' : undefined
                "
                >Course lessons</Link
            ></Button
        >
        <Button
            as-child
            :variant="
                page.component !== 'Learning/Player' ? 'secondary' : 'ghost'
            "
            ><Link
                href="/my-courses/full-stack/exam"
                :aria-current="
                    page.component !== 'Learning/Player' ? 'page' : undefined
                "
                >Course exam</Link
            ></Button
        >
    </nav>
</template>
