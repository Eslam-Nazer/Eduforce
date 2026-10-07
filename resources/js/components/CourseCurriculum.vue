<script setup lang="ts">
import { computed } from 'vue';
import { Download, LockKeyhole } from '@lucide/vue';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { CourseModule } from '@/types';

const props = defineProps<{ modules: CourseModule[] }>();
const videoCount = computed(
    () =>
        props.modules
            .flatMap((module) => module.lessons)
            .filter((lesson) => lesson.kind === 'video').length,
);
</script>

<template>
    <Card class="border-0 bg-white shadow-sm">
        <CardContent class="px-6">
            <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
                <h2
                    class="border-l-4 border-teal-700 pl-3 text-xl font-semibold"
                >
                    Course curriculum
                </h2>
                <p class="text-xs text-slate-500">
                    {{ modules.length }} Modules • {{ videoCount }} Video
                    lessons
                </p>
            </div>
            <Accordion
                type="multiple"
                :default-value="modules.slice(0, 1).map((module) => module.id)"
                class="space-y-3"
            >
                <AccordionItem
                    v-for="(module, index) in modules"
                    :key="module.id"
                    :value="module.id"
                    class="rounded-xl border-0 bg-slate-50 px-4"
                >
                    <AccordionTrigger class="text-left hover:no-underline">
                        <div>
                            <p class="mb-1 text-xs font-normal text-slate-500">
                                <span class="font-medium text-teal-800"
                                    >MODULE {{ index + 1 }}</span
                                >
                                • {{ module.lessons.length }} items,
                                {{ module.duration }}
                            </p>
                            <h3 class="text-sm font-semibold">
                                {{ module.title }}
                            </h3>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent class="space-y-2">
                        <div
                            v-for="lesson in module.lessons"
                            :key="lesson.id"
                            class="flex items-center gap-3 rounded-lg bg-white p-3 text-xs"
                        >
                            <LockKeyhole
                                class="size-4 shrink-0 text-slate-400"
                                aria-hidden="true"
                            /><span class="flex-1 leading-5"
                                >{{ lesson.id }} {{ lesson.title }}</span
                            ><span class="text-slate-500">{{
                                lesson.duration
                            }}</span>
                        </div>
                        <div
                            class="flex flex-wrap items-center gap-2 rounded-lg bg-teal-50 p-3 text-xs"
                        >
                            <Download
                                class="size-4 text-teal-700"
                                aria-hidden="true"
                            /><span class="min-w-0 flex-1 break-words">{{
                                module.resource
                            }}</span
                            ><Badge
                                variant="secondary"
                                class="bg-white text-teal-800"
                                >Locked Asset</Badge
                            >
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
</template>
