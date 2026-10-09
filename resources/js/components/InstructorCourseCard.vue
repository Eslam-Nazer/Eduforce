<script setup lang="ts">
import { computed } from "vue";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { courseReadiness } from "@/composables/useInstructorWorkspace";
import type { InstructorCourse } from "@/types/instructor-workspace";
const props = defineProps<{ course: InstructorCourse }>();
const emit = defineEmits<{ remove: [id: string] }>();
const videos = computed(
    () =>
        props.course.modules
            .flatMap((module) => module.lessons)
            .filter((lesson) => lesson.kind === "video").length,
);
const readiness = computed(() => {
    const checks = courseReadiness(props.course);
    return Math.round(
        (checks.filter((item) => item.ready).length / checks.length) * 100,
    );
});
</script>
<template>
    <Card class="border-slate-200 bg-white shadow-sm"
        ><CardContent class="grid gap-5 p-5 sm:grid-cols-[180px_minmax(0,1fr)]"
            ><div
                class="flex min-h-32 items-center justify-center rounded-lg bg-slate-100 p-5 text-center text-sm text-slate-400"
            >
                {{ course.coverName || "Cover image not selected" }}
            </div>
            <div class="min-w-0 space-y-3">
                <div class="flex flex-wrap justify-between gap-2">
                    <div class="flex gap-2">
                        <Badge
                            :class="
                                course.status === 'Published'
                                    ? 'bg-teal-50 text-teal-800'
                                    : 'bg-amber-50 text-amber-800'
                            "
                            >{{ course.status }}</Badge
                        ><Badge variant="outline">{{ course.category }}</Badge>
                    </div>
                    <p class="text-sm font-semibold">
                        {{ course.price.toLocaleString("en-US") }}
                        {{ course.currency }}
                    </p>
                </div>
                <h2 class="text-lg font-semibold">
                    {{ course.title || "Untitled course" }}
                </h2>
                <p class="text-xs text-slate-500">
                    {{ course.modules.length }} modules · {{ videos }} video
                    lessons ·
                    {{
                        course.examEnabled
                            ? "Final exam enabled"
                            : "No final exam"
                    }}
                </p>
                <div v-if="course.status === 'Draft'">
                    <p class="mb-2 text-xs text-slate-500">
                        Readiness checks: {{ readiness }}%
                    </p>
                    <Progress :model-value="readiness" class="h-1.5" />
                </div>
                <div class="flex flex-wrap gap-2">
                    <Button
                        as-child
                        class="bg-teal-700 text-white hover:bg-teal-800"
                        ><a :href="`/instructor/courses/${course.id}/basics`">{{
                            course.status === "Draft"
                                ? "Continue builder"
                                : "Edit content"
                        }}</a></Button
                    ><Button as-child variant="outline"
                        ><a :href="`/instructor/courses/${course.id}/publish`"
                            >Preview</a
                        ></Button
                    ><Button
                        v-if="course.status === 'Draft'"
                        variant="ghost"
                        class="text-red-700"
                        @click="emit('remove', course.id)"
                        >Delete draft</Button
                    >
                </div>
            </div></CardContent
        ></Card
    >
</template>
