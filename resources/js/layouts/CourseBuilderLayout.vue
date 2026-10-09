<script setup lang="ts">
import InstructorLayout from "./InstructorLayout.vue";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { InstructorCourse } from "@/types/instructor-workspace";
const props = defineProps<{
    course?: InstructorCourse;
    step: string;
    notice: string;
}>();
const emit = defineEmits<{ navigate: [step: string] }>();
const steps = [
    { id: "basics", title: "Basics & Pricing" },
    { id: "curriculum", title: "Curriculum" },
    { id: "exam", title: "Exam & Settings" },
    { id: "publish", title: "Preview & Publish" },
];
</script>
<template>
    <InstructorLayout
        title="Course Builder Studio"
        active="courses"
        description="Build your course, review its content and publish when you are ready."
    >
        <template v-if="props.course"
            ><div class="flex flex-wrap items-center justify-between gap-3">
                <p class="max-w-3xl text-lg font-semibold">
                    {{ course.title || "Untitled course" }}
                </p>
                <Badge variant="secondary"
                    >{{ course.status }} · local preview</Badge
                >
            </div>
            <nav
                aria-label="Course builder steps"
                class="grid gap-2 rounded-xl border border-slate-200 bg-white p-3 sm:grid-cols-4"
            >
                <Button
                    v-for="(item, index) in steps"
                    :key="item.id"
                    variant="ghost"
                    class="h-auto justify-start gap-3 p-3 text-left whitespace-normal"
                    :class="
                        step === item.id
                            ? 'bg-teal-50 text-teal-800'
                            : 'text-slate-500'
                    "
                    :aria-current="step === item.id ? 'step' : undefined"
                    @click="emit('navigate', item.id)"
                    ><span
                        class="flex size-7 shrink-0 items-center justify-center rounded-full"
                        :class="
                            step === item.id
                                ? 'bg-teal-700 text-white'
                                : 'bg-slate-100'
                        "
                        >{{ index + 1 }}</span
                    >{{ item.title }}</Button
                >
            </nav>
            <p v-if="notice" role="status" class="text-sm text-teal-800">
                {{ notice }}
            </p>
            <slot
        /></template>
        <div v-else class="rounded-xl border bg-white p-6">
            <p>Course not found in this local preview.</p>
            <Button as-child variant="outline" class="mt-4"
                ><a href="/instructor/courses">Back to courses</a></Button
            >
        </div>
    </InstructorLayout>
</template>
