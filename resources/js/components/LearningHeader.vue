<script setup lang="ts">
import { BookOpen } from '@lucide/vue';
defineProps<{ active: 'lessons' | 'exam' }>();
</script>
<template>
    <header class="border-b border-slate-200 bg-white">
        <div
            class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8"
        >
            <a
                href="/my-courses"
                class="flex items-center gap-2 text-lg font-bold"
                ><BookOpen
                    class="size-5 text-teal-700"
                    aria-hidden="true"
                />Eduforce Learning</a
            >
            <nav
                aria-label="Learning navigation"
                class="flex flex-wrap items-center gap-4 text-sm"
            >
                <a
                    href="/my-courses/full-stack"
                    :aria-current="active === 'lessons' ? 'page' : undefined"
                    :class="
                        active === 'lessons'
                            ? 'font-semibold text-teal-800'
                            : 'text-slate-600'
                    "
                    >Course Lessons</a
                ><a
                    href="/my-courses/full-stack/exam"
                    :aria-current="active === 'exam' ? 'page' : undefined"
                    :class="
                        active === 'exam'
                            ? 'font-semibold text-teal-800'
                            : 'text-slate-600'
                    "
                    >Course Exam</a
                ><a href="/settings" class="font-medium">Kareem Tarek</a>
            </nav>
        </div>
    </header>
</template>
