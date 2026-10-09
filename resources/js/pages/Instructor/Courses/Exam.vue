<script setup lang="ts">
import { ref } from "vue";
import { router } from "@inertiajs/vue3";
import CourseBuilderLayout from "@/layouts/CourseBuilderLayout.vue";
import InstructorExamQuestionEditor from "@/components/InstructorExamQuestionEditor.vue";
import CertificatePreview from "@/components/CertificatePreview.vue";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
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
    newPreviewId,
    useInstructorWorkspace,
} from "@/composables/useInstructorWorkspace";
import type { InstructorQuestion } from "@/types/instructor-workspace";
const props = defineProps<{ courseId: string }>();
const { course, contactEnabled, notice, save } = useInstructorWorkspace(
    props.courseId,
);
const kind = ref<InstructorQuestion["kind"]>("multiple-choice");
const certificateOpen = ref(false);
const removalId = ref("");
const confirmOpen = ref(false);
function navigate(step: string) {
    if (save()) router.visit(`/instructor/courses/${props.courseId}/${step}`);
}
function addQuestion() {
    const options =
        kind.value === "true-false"
            ? [
                  { id: newPreviewId(), text: "True" },
                  { id: newPreviewId(), text: "False" },
              ]
            : [
                  { id: newPreviewId(), text: "" },
                  { id: newPreviewId(), text: "" },
              ];
    course.value?.questions.push({
        id: newPreviewId(),
        kind: kind.value,
        prompt: "",
        options,
        correctOptionId: "",
    });
}
function move(index: number, offset: number) {
    const questions = course.value?.questions;
    if (!questions || index + offset < 0 || index + offset >= questions.length)
        return;
    const [question] = questions.splice(index, 1);
    questions.splice(index + offset, 0, question);
}
function remove(id: string) {
    removalId.value = id;
    confirmOpen.value = true;
}
function confirmRemove() {
    if (course.value)
        course.value.questions = course.value.questions.filter(
            (question) => question.id !== removalId.value,
        );
}
</script>
<template>
    <CourseBuilderLayout
        :course="course"
        step="exam"
        :notice="notice"
        @navigate="navigate"
        ><template v-if="course"
            ><Card class="bg-white"
                ><CardContent class="space-y-5 p-5 sm:p-6"
                    ><div class="flex items-start justify-between gap-4">
                        <div>
                            <h2 class="text-xl font-semibold">
                                Final course exam
                            </h2>
                            <p
                                class="mt-2 max-w-3xl text-sm leading-6 text-slate-500"
                            >
                                When enabled, learners must pass this exam and
                                complete all videos to earn a certificate. When
                                disabled, completing all videos is sufficient.
                            </p>
                        </div>
                        <Switch
                            v-model="course.examEnabled"
                            aria-label="Enable final course exam"
                        />
                    </div>
                    <div
                        v-if="course.examEnabled"
                        class="grid gap-5 rounded-lg bg-slate-50 p-4 sm:grid-cols-2"
                    >
                        <div class="space-y-2">
                            <Label for="passing-score">Passing score (%)</Label
                            ><Input
                                id="passing-score"
                                :model-value="course.passingScore"
                                type="number"
                                min="1"
                                max="100"
                                step="1"
                                @update:model-value="
                                    course.passingScore = Number($event)
                                "
                            />
                        </div>
                        <div>
                            <h3 class="text-sm font-semibold">
                                Attempts & scoring
                            </h3>
                            <p class="mt-2 text-sm leading-6 text-slate-500">
                                Unlimited attempts. Questions use equal weight
                                in this preview.
                            </p>
                        </div>
                    </div></CardContent
                ></Card
            >
            <section v-if="course.examEnabled" class="space-y-5">
                <div class="flex flex-wrap items-center justify-between gap-3">
                    <h2 class="text-lg font-semibold">
                        Exam questions ({{ course.questions.length }})
                    </h2>
                    <div class="flex gap-3">
                        <Select v-model="kind"
                            ><SelectTrigger
                                aria-label="New question type"
                                class="w-44"
                                ><SelectValue /></SelectTrigger
                            ><SelectContent
                                ><SelectItem value="multiple-choice"
                                    >Multiple choice</SelectItem
                                ><SelectItem value="true-false"
                                    >True / False</SelectItem
                                ></SelectContent
                            ></Select
                        ><Button
                            class="bg-teal-700 text-white hover:bg-teal-800"
                            @click="addQuestion"
                            >Add question</Button
                        >
                    </div>
                </div>
                <InstructorExamQuestionEditor
                    v-for="(question, index) in course.questions"
                    :key="question.id"
                    v-model:question="course.questions[index]"
                    :index="index"
                    :count="course.questions.length"
                    @move="move(index, $event)"
                    @remove="remove(question.id)"
                />
                <p
                    v-if="!course.questions.length"
                    class="rounded-lg border bg-white p-6 text-sm text-slate-500"
                >
                    Add at least one complete question when the exam is enabled.
                </p>
            </section>
            <p
                v-else
                class="rounded-lg border bg-white p-5 text-sm text-slate-500"
            >
                Final exam disabled. Existing question drafts are kept if you
                enable it again.
            </p>
            <Card class="bg-white"
                ><CardContent class="flex items-start justify-between gap-4 p-5"
                    ><div>
                        <h2 class="font-semibold">Student contact</h2>
                        <p class="mt-2 text-sm leading-6 text-slate-500">
                            Allow text messages to this instructor. This is an
                            instructor-wide local setting, shared across the
                            course builder previews.
                        </p>
                    </div>
                    <Switch
                        v-model="contactEnabled"
                        aria-label="Enable student contact" /></CardContent></Card
            ><Card class="bg-white"
                ><CardContent class="space-y-3 p-5"
                    ><h2 class="font-semibold">Platform certificate</h2>
                    <p class="text-sm leading-6 text-slate-500">
                        The fixed platform template is used for course
                        completion.
                    </p>
                    <Button variant="outline" @click="certificateOpen = true"
                        >Preview certificate template</Button
                    ></CardContent
                ></Card
            >
            <div class="flex flex-wrap justify-between gap-3">
                <Button variant="outline" @click="navigate('curriculum')"
                    >Back to curriculum</Button
                >
                <div class="flex flex-wrap gap-3">
                    <Button variant="outline" @click="save"
                        >Save local draft</Button
                    ><Button
                        class="bg-teal-700 text-white hover:bg-teal-800"
                        @click="navigate('publish')"
                        >Save & continue to preview</Button
                    >
                </div>
            </div>
            <Sheet v-model:open="certificateOpen"
                ><SheetContent
                    class="overflow-y-auto bg-white text-slate-900 sm:max-w-2xl"
                    ><SheetHeader
                        ><SheetTitle>Certificate template</SheetTitle
                        ><SheetDescription
                            >Illustrative completion certificate. No credential
                            is issued here.</SheetDescription
                        ></SheetHeader
                    >
                    <div class="p-4">
                        <CertificatePreview
                            learner="Sample Learner"
                            :course="course.title"
                            instructor="Ahmed Mansour"
                            :video-count="
                                course.modules
                                    .flatMap((module) => module.lessons)
                                    .filter((lesson) => lesson.kind === 'video')
                                    .length
                            "
                            :score="course.examEnabled ? 100 : null"
                            preview-date="9 October 2026 · illustrative"
                        /></div></SheetContent></Sheet
            ><AlertDialog v-model:open="confirmOpen"
                ><AlertDialogContent
                    ><AlertDialogHeader
                        ><AlertDialogTitle
                            >Remove this question?</AlertDialogTitle
                        ><AlertDialogDescription
                            >This edits the local exam
                            draft.</AlertDialogDescription
                        ></AlertDialogHeader
                    ><AlertDialogFooter
                        ><AlertDialogCancel>Cancel</AlertDialogCancel
                        ><AlertDialogAction @click="confirmRemove"
                            >Remove question</AlertDialogAction
                        ></AlertDialogFooter
                    ></AlertDialogContent
                ></AlertDialog
            ></template
        ></CourseBuilderLayout
    >
</template>
