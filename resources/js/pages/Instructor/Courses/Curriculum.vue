<script setup lang="ts">
import { computed, ref } from "vue";
import { router } from "@inertiajs/vue3";
import CourseBuilderLayout from "@/layouts/CourseBuilderLayout.vue";
import CurriculumModuleEditor from "@/components/CurriculumModuleEditor.vue";
import CourseLessonEditor from "@/components/CourseLessonEditor.vue";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
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
    newPreviewId,
    useInstructorWorkspace,
} from "@/composables/useInstructorWorkspace";
import type { InstructorLesson } from "@/types/instructor-workspace";
const props = defineProps<{ courseId: string }>();
const { course, notice, save } = useInstructorWorkspace(props.courseId);
const lessons = computed(
    () => course.value?.modules.flatMap((module) => module.lessons) ?? [],
);
const videos = computed(() =>
    lessons.value.filter((lesson) => lesson.kind === "video"),
);
const runtime = computed(() =>
    Math.round(
        videos.value.reduce(
            (total, lesson) => total + lesson.durationSeconds,
            0,
        ) / 60,
    ),
);
const editorOpen = ref(false);
const moduleId = ref("");
const editing = ref<InstructorLesson>();
const editorKey = ref(0);
const confirmOpen = ref(false);
const pendingRemoval = ref<{ moduleId: string; lessonId?: string }>();
function navigate(step: string) {
    if (save()) router.visit(`/instructor/courses/${props.courseId}/${step}`);
}
function openEditor(id: string, lessonId?: string) {
    moduleId.value = id;
    editing.value = course.value?.modules
        .find((module) => module.id === id)
        ?.lessons.find((lesson) => lesson.id === lessonId);
    editorKey.value++;
    editorOpen.value = true;
}
function saveLesson(lesson: InstructorLesson) {
    const module = course.value?.modules.find(
        (item) => item.id === moduleId.value,
    );
    if (!module) return;
    const index = module.lessons.findIndex((item) => item.id === lesson.id);
    if (index >= 0) module.lessons[index] = lesson;
    else module.lessons.push(lesson);
    editorOpen.value = false;
}
function reorder<T>(items: T[], index: number, offset: number) {
    const target = index + offset;
    if (index >= 0 && target >= 0 && target < items.length) {
        const [item] = items.splice(index, 1);
        items.splice(target, 0, item);
    }
}
function remove(moduleId: string, lessonId?: string) {
    pendingRemoval.value = { moduleId, lessonId };
    confirmOpen.value = true;
}
function confirmRemove() {
    if (!course.value || !pendingRemoval.value) return;
    const pending = pendingRemoval.value;
    if (!pending.lessonId)
        course.value.modules = course.value.modules.filter(
            (module) => module.id !== pending.moduleId,
        );
    else {
        const module = course.value.modules.find(
            (item) => item.id === pending.moduleId,
        );
        if (module)
            module.lessons = module.lessons.filter(
                (lesson) => lesson.id !== pending.lessonId,
            );
    }
}
</script>
<template>
    <CourseBuilderLayout
        :course="course"
        step="curriculum"
        :notice="notice"
        @navigate="navigate"
        ><template v-if="course"
            ><div class="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 class="text-xl font-semibold">Curriculum Builder</h2>
                    <p class="mt-2 text-sm text-slate-500">
                        Ordered video lessons and downloadable resources.
                    </p>
                </div>
                <Button
                    class="bg-teal-700 text-white hover:bg-teal-800"
                    @click="
                        course.modules.push({
                            id: newPreviewId(),
                            title: 'New module',
                            lessons: [],
                        })
                    "
                    >Add module</Button
                >
            </div>
            <div
                class="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_280px]"
            >
                <div class="space-y-5">
                    <CurriculumModuleEditor
                        v-for="(module, index) in course.modules"
                        :key="module.id"
                        :module="module"
                        :index="index"
                        :count="course.modules.length"
                        @rename="module.title = $event"
                        @move="reorder(course.modules, index, $event)"
                        @remove="remove(module.id)"
                        @add="openEditor(module.id)"
                        @edit="openEditor(module.id, $event)"
                        @move-lesson="
                            (id, offset) =>
                                reorder(
                                    module.lessons,
                                    module.lessons.findIndex(
                                        (lesson) => lesson.id === id,
                                    ),
                                    offset,
                                )
                        "
                        @remove-lesson="remove(module.id, $event)"
                    />
                    <p
                        v-if="!course.modules.length"
                        class="rounded-lg border bg-white p-6 text-sm text-slate-500"
                    >
                        Start by adding a module.
                    </p>
                </div>
                <Card class="bg-white"
                    ><CardContent class="space-y-4 p-5"
                        ><h2 class="font-semibold">Curriculum summary</h2>
                        <dl class="space-y-3 text-sm">
                            <div class="flex justify-between">
                                <dt class="text-slate-500">Modules</dt>
                                <dd>{{ course.modules.length }}</dd>
                            </div>
                            <div class="flex justify-between">
                                <dt class="text-slate-500">Video lessons</dt>
                                <dd>{{ videos.length }}</dd>
                            </div>
                            <div class="flex justify-between">
                                <dt class="text-slate-500">Resource files</dt>
                                <dd>{{ lessons.length - videos.length }}</dd>
                            </div>
                            <div class="flex justify-between">
                                <dt class="text-slate-500">
                                    Estimated runtime
                                </dt>
                                <dd>{{ runtime }} min</dd>
                            </div>
                        </dl>
                        <p class="text-xs leading-5 text-slate-500">
                            Counts and duration come from your draft. Resources
                            do not count as completed videos.
                        </p></CardContent
                    ></Card
                >
            </div>
            <div class="flex flex-wrap justify-between gap-3">
                <Button variant="outline" @click="navigate('basics')"
                    >Back to basics</Button
                >
                <div class="flex flex-wrap gap-3">
                    <Button variant="outline" @click="save"
                        >Save local draft</Button
                    ><Button
                        class="bg-teal-700 text-white hover:bg-teal-800"
                        @click="navigate('exam')"
                        >Save & continue to exam</Button
                    >
                </div>
            </div>
            <Dialog v-model:open="editorOpen"
                ><DialogContent
                    class="max-h-[90vh] overflow-y-auto bg-white text-slate-900 sm:max-w-xl"
                    ><DialogHeader
                        ><DialogTitle>{{
                            editing
                                ? "Edit lesson / resource"
                                : "Add lesson / resource"
                        }}</DialogTitle
                        ><DialogDescription
                            >Save a filename reference and lesson details in the
                            local draft.</DialogDescription
                        ></DialogHeader
                    ><CourseLessonEditor
                        :key="editorKey"
                        :lesson="editing"
                        @save="saveLesson"
                        @cancel="editorOpen = false" /></DialogContent></Dialog
            ><AlertDialog v-model:open="confirmOpen"
                ><AlertDialogContent
                    ><AlertDialogHeader
                        ><AlertDialogTitle
                            >Remove this
                            {{
                                pendingRemoval?.lessonId
                                    ? "lesson or resource"
                                    : "module and its content"
                            }}?</AlertDialogTitle
                        ><AlertDialogDescription
                            >This edits the local draft. Save the draft to
                            retain the change.</AlertDialogDescription
                        ></AlertDialogHeader
                    ><AlertDialogFooter
                        ><AlertDialogCancel>Cancel</AlertDialogCancel
                        ><AlertDialogAction @click="confirmRemove"
                            >Remove</AlertDialogAction
                        ></AlertDialogFooter
                    ></AlertDialogContent
                ></AlertDialog
            ></template
        ></CourseBuilderLayout
    >
</template>
