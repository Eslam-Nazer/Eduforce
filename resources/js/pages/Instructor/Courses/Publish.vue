<script setup lang="ts">
import { computed, ref } from "vue";
import { router } from "@inertiajs/vue3";
import CourseBuilderLayout from "@/layouts/CourseBuilderLayout.vue";
import CoursePublicationChecklist from "@/components/CoursePublicationChecklist.vue";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
    courseReadiness,
    useInstructorWorkspace,
} from "@/composables/useInstructorWorkspace";
const props = defineProps<{ courseId: string }>();
const { course, contactEnabled, notice, save, publish } =
    useInstructorWorkspace(props.courseId);
const checks = computed(() =>
    course.value ? courseReadiness(course.value) : [],
);
const ready = computed(
    () => checks.value.length > 0 && checks.value.every((check) => check.ready),
);
const videos = computed(
    () =>
        course.value?.modules
            .flatMap((module) => module.lessons)
            .filter((lesson) => lesson.kind === "video") ?? [],
);
const confirmOpen = ref(false);
const previewOpen = ref(false);
function navigate(step: string) {
    if (save()) router.visit(`/instructor/courses/${props.courseId}/${step}`);
}
</script>
<template>
    <CourseBuilderLayout
        :course="course"
        step="publish"
        :notice="notice"
        @navigate="navigate"
        ><template v-if="course"
            ><div>
                <h2 class="text-2xl font-bold">Review & Publish Course</h2>
                <p class="mt-2 text-sm leading-6 text-slate-500">
                    Review the draft before choosing to publish. Approved
                    instructors publish their own courses.
                </p>
            </div>
            <div
                v-if="course.status === 'Published'"
                role="status"
                class="rounded-lg border border-teal-200 bg-teal-50 p-5 text-sm leading-6 text-teal-900"
            >
                <strong>Published in the local preview.</strong><br />This
                status is saved in this tab. The platform catalogue has not
                changed.
            </div>
            <div
                class="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]"
            >
                <div class="space-y-6">
                    <CoursePublicationChecklist
                        :checks="checks"
                        @edit="navigate"
                    /><Card class="bg-white"
                        ><CardContent class="space-y-3 p-5"
                            ><h2 class="font-semibold">
                                Student contact & completion
                            </h2>
                            <p class="text-sm text-slate-500">
                                Instructor contact:
                                {{ contactEnabled ? "enabled" : "disabled" }}.
                            </p>
                            <p class="text-sm leading-6 text-slate-500">
                                {{
                                    course.examEnabled
                                        ? `Complete all ${videos.length} videos and pass the final exam at ${course.passingScore}% or above.`
                                        : `Complete all ${videos.length} videos. No final exam is required.`
                                }}
                            </p>
                            <p class="text-xs leading-5 text-slate-500">
                                Course refund eligibility: within 14 days from
                                purchase and no more than 3 completed videos.
                            </p></CardContent
                        ></Card
                    >
                </div>
                <aside class="space-y-5">
                    <Card class="overflow-hidden bg-white"
                        ><div
                            class="flex aspect-video items-center justify-center bg-slate-100 p-5 text-center text-xs text-slate-500"
                        >
                            {{ course.coverName || "Cover image missing" }}
                        </div>
                        <CardContent class="space-y-3 p-5"
                            ><Badge variant="secondary">{{
                                course.category
                            }}</Badge>
                            <h2 class="text-lg font-semibold">
                                {{ course.title || "Untitled course" }}
                            </h2>
                            <p class="text-sm leading-6 text-slate-500">
                                {{ course.summary }}
                            </p>
                            <p class="text-xs text-slate-500">
                                Ahmed Mansour ·
                                {{ course.modules.length }} modules ·
                                {{ videos.length }} videos
                            </p>
                            <p class="text-2xl font-bold">
                                {{ course.price.toLocaleString("en-US") }}
                                {{ course.currency }}
                            </p></CardContent
                        ></Card
                    ><Button
                        variant="outline"
                        class="w-full"
                        @click="previewOpen = true"
                        >Preview as student</Button
                    ><Button
                        :disabled="!ready || course.status === 'Published'"
                        class="h-11 w-full bg-teal-700 text-white hover:bg-teal-800"
                        @click="confirmOpen = true"
                        >{{
                            course.status === "Published"
                                ? "Published locally"
                                : "Publish local preview"
                        }}</Button
                    >
                    <p v-if="!ready" class="text-xs leading-5 text-amber-800">
                        Complete the checks marked “Needs attention” before
                        publication.
                    </p>
                    <Button as-child variant="ghost" class="w-full"
                        ><a href="/instructor/courses"
                            >Back to courses</a
                        ></Button
                    >
                </aside>
            </div>
            <Sheet v-model:open="previewOpen"
                ><SheetContent
                    class="overflow-y-auto bg-white text-slate-900 sm:max-w-xl"
                    ><SheetHeader
                        ><SheetTitle>{{
                            course.title || "Untitled course"
                        }}</SheetTitle
                        ><SheetDescription
                            >Student-facing preview of this local course
                            draft.</SheetDescription
                        ></SheetHeader
                    >
                    <div class="space-y-5 p-4">
                        <p class="text-sm leading-6">
                            {{ course.description }}
                        </p>
                        <p class="text-xl font-bold">
                            {{ course.price }} {{ course.currency }}
                        </p>
                        <div>
                            <h3 class="font-semibold">What you will learn</h3>
                            <ul class="mt-3 list-disc space-y-2 pl-5 text-sm">
                                <li
                                    v-for="(
                                        outcome, index
                                    ) in course.outcomes.filter(Boolean)"
                                    :key="index"
                                >
                                    {{ outcome }}
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 class="font-semibold">Curriculum</h3>
                            <div
                                v-for="module in course.modules"
                                :key="module.id"
                                class="mt-4 rounded-lg border p-4"
                            >
                                <p class="font-semibold">{{ module.title }}</p>
                                <ul
                                    class="mt-2 space-y-2 text-sm text-slate-500"
                                >
                                    <li
                                        v-for="lesson in module.lessons"
                                        :key="lesson.id"
                                    >
                                        {{ lesson.title }} ·
                                        {{
                                            lesson.kind === "video"
                                                ? "Video"
                                                : "File"
                                        }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <p class="text-xs leading-5 text-slate-500">
                            {{
                                course.examEnabled
                                    ? `Final exam enabled · passing score ${course.passingScore}% · unlimited attempts.`
                                    : "No final exam."
                            }}
                        </p>
                    </div></SheetContent
                ></Sheet
            ><AlertDialog v-model:open="confirmOpen"
                ><AlertDialogContent
                    ><AlertDialogHeader
                        ><AlertDialogTitle
                            >Publish this course locally?</AlertDialogTitle
                        ><AlertDialogDescription
                            >The course will appear as Published in this tab’s
                            instructor preview. This does not publish it to the
                            live catalogue.</AlertDialogDescription
                        ></AlertDialogHeader
                    ><AlertDialogFooter
                        ><AlertDialogCancel>Keep draft</AlertDialogCancel
                        ><AlertDialogAction :disabled="!ready" @click="publish"
                            >Publish local preview</AlertDialogAction
                        ></AlertDialogFooter
                    ></AlertDialogContent
                ></AlertDialog
            ></template
        ></CourseBuilderLayout
    >
</template>
