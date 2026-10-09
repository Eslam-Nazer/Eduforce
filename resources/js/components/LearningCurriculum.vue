<script setup lang="ts">
import { ref, watch } from 'vue';
import { CheckCircle, Circle, CirclePlay } from '@lucide/vue';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { CourseModule } from '@/types/course';

const props = defineProps<{
    modules: CourseModule[];
    currentId: string;
    completedIds: string[];
    playing: boolean;
}>();
const emit = defineEmits<{ select: [lessonId: string]; exam: [] }>();
const openModules = ref<string[]>([
    props.modules.find((module) =>
        module.lessons.some((lesson) => lesson.id === props.currentId),
    )?.id ??
        props.modules[0]?.id ??
        '',
]);
watch(
    () => props.currentId,
    (id) => {
        const module = props.modules.find((item) =>
            item.lessons.some((lesson) => lesson.id === id),
        );
        if (module && !openModules.value.includes(module.id))
            openModules.value.push(module.id);
    },
);
</script>

<template>
    <Card class="border-slate-200 bg-white shadow-sm">
        <CardHeader
            ><div class="flex flex-wrap items-center justify-between gap-3">
                <CardTitle class="text-lg">Course Curriculum</CardTitle
                ><Button
                    variant="link"
                    class="h-auto p-0 text-xs text-teal-800"
                    @click="openModules = []"
                    >Collapse All</Button
                >
            </div>
            <p class="text-xs text-slate-500">
                {{ modules.length }} modules · All lessons available
            </p></CardHeader
        >
        <CardContent class="px-3 sm:px-4">
            <Accordion v-model="openModules" type="multiple" class="space-y-3">
                <AccordionItem
                    v-for="(module, index) in modules"
                    :key="module.id"
                    :value="module.id"
                    class="rounded-lg border-0 bg-slate-50 px-3"
                >
                    <AccordionTrigger class="hover:no-underline"
                        ><div>
                            <p class="text-xs text-teal-800">
                                MODULE {{ index + 1 }}
                            </p>
                            <h3 class="mt-1 text-sm font-semibold">
                                {{ module.title }}
                            </h3>
                            <p class="mt-1 text-xs font-normal text-slate-500">
                                {{
                                    module.lessons.filter(
                                        (lesson) => lesson.kind === 'video',
                                    ).length
                                }}
                                videos
                            </p>
                        </div></AccordionTrigger
                    >
                    <AccordionContent class="space-y-2">
                        <Button
                            v-for="lesson in module.lessons"
                            :key="lesson.id"
                            variant="ghost"
                            :aria-current="
                                lesson.id === currentId ? 'true' : undefined
                            "
                            class="h-auto min-h-14 w-full justify-start gap-3 px-2 py-3 text-left whitespace-normal"
                            :class="
                                lesson.id === currentId
                                    ? 'bg-teal-100 text-teal-900 hover:bg-teal-100'
                                    : 'hover:bg-white'
                            "
                            @click="
                                lesson.kind === 'exam'
                                    ? emit('exam')
                                    : emit('select', lesson.id)
                            "
                        >
                            <CirclePlay
                                v-if="lesson.id === currentId"
                                class="size-4 shrink-0 text-teal-700"
                                aria-hidden="true"
                            />
                            <CheckCircle
                                v-else-if="completedIds.includes(lesson.id)"
                                class="size-4 shrink-0 text-teal-700"
                                aria-hidden="true"
                            />
                            <Circle
                                v-else
                                class="size-4 shrink-0 text-slate-400"
                                aria-hidden="true"
                            />
                            <span class="min-w-0 flex-1"
                                ><span class="block text-xs leading-5"
                                    >{{ lesson.id }} {{ lesson.title }}</span
                                ><span
                                    class="mt-1 block text-[11px] font-normal"
                                    >{{ lesson.duration
                                    }}<span v-if="lesson.id === currentId">
                                        ·
                                        {{
                                            playing
                                                ? 'Playing now'
                                                : 'Current lesson'
                                        }}</span
                                    ><span
                                        v-if="completedIds.includes(lesson.id)"
                                    >
                                        · Completed</span
                                    ></span
                                ></span
                            >
                            <span
                                v-if="lesson.id === currentId"
                                class="equalizer flex h-5 shrink-0 items-center gap-0.5"
                                :class="{ 'is-playing': playing }"
                                aria-hidden="true"
                                ><span /><span /><span
                            /></span>
                        </Button>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
</template>

<style scoped>
.equalizer span {
    width: 3px;
    height: 8px;
    border-radius: 2px;
    background: #0f766e;
}
.equalizer span:nth-child(2) {
    height: 16px;
}
.equalizer span:nth-child(3) {
    height: 11px;
}
.equalizer.is-playing span {
    animation: equalize 0.8s ease-in-out infinite alternate;
}
.equalizer.is-playing span:nth-child(2) {
    animation-delay: -0.3s;
}
.equalizer.is-playing span:nth-child(3) {
    animation-delay: -0.6s;
}
@keyframes equalize {
    from {
        transform: scaleY(0.35);
    }
    to {
        transform: scaleY(1);
    }
}
@media (prefers-reduced-motion: reduce) {
    .equalizer.is-playing span {
        animation: none;
    }
}
</style>
