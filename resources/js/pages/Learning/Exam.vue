<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import { ArrowLeft, ArrowRight, Info } from '@lucide/vue';
import LearningHeader from '@/components/LearningHeader.vue';
import ExamQuestion from '@/components/ExamQuestion.vue';
import ExamNavigator from '@/components/ExamNavigator.vue';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { sampleCourseTitle, sampleInstructor } from '@/data/sample-course';
import { sampleExam } from '@/data/sample-exam';
import { useLearningPreview } from '@/composables/useLearningPreview';
const { submitAttempt, storageAvailable } = useLearningPreview();

const currentIndex = ref(0);
const answers = ref<Record<string, string>>({});
const confirmationOpen = ref(false);
const notice = ref('');
const questions = sampleExam.questions;
const currentQuestion = computed(() => questions[currentIndex.value]!);
const currentAnswer = computed({
    get: () => answers.value[currentQuestion.value.id] ?? '',
    set: (value: string) => {
        answers.value[currentQuestion.value.id] = value;
        notice.value = '';
    },
});
const answeredCount = computed(
    () =>
        questions.filter((question) =>
            question.options.some(
                (option) => option.id === answers.value[question.id],
            ),
        ).length,
);
function selectQuestion(index: number) {
    if (index >= 0 && index < questions.length) currentIndex.value = index;
}
function requestSubmit() {
    if (!storageAvailable.value) {
        notice.value =
            'Session storage is unavailable. Enable it before submitting this preview.';
        return;
    }
    if (answeredCount.value !== questions.length) {
        notice.value = `Answer all questions before submitting. ${questions.length - answeredCount.value} remaining.`;
        currentIndex.value = questions.findIndex(
            (question) => !answers.value[question.id],
        );
        return;
    }
    confirmationOpen.value = true;
}
function submit() {
    if (answeredCount.value !== questions.length) return;
    confirmationOpen.value = false;
    if (submitAttempt(answers.value))
        router.visit('/my-courses/full-stack/exam/results');
    else
        notice.value =
            'Your browser could not save this attempt. Enable session storage and try again.';
}
</script>

<template>
    <Head title="Course Exam" />
    <div class="course-exam min-h-screen bg-slate-50 text-slate-900">
        <LearningHeader active="exam" />
        <main class="mx-auto max-w-7xl space-y-6 px-5 py-8 sm:px-8">
            <a
                href="/my-courses/full-stack"
                class="inline-flex items-center gap-2 text-sm text-teal-800"
                ><ArrowLeft class="size-4" aria-hidden="true" />Back to Course
                Player</a
            >
            <div>
                <Badge variant="secondary" class="bg-teal-50 text-teal-800"
                    >Sample exam · In Progress</Badge
                >
                <h1 class="mt-3 text-2xl leading-9 font-bold sm:text-3xl">
                    Course Exam
                </h1>
                <p class="mt-2 text-lg font-semibold">
                    {{ sampleCourseTitle }}
                </p>
                <p class="mt-2 text-sm text-slate-500">
                    Instructor: {{ sampleInstructor }} ·
                    {{ questions.length }} questions ·
                    {{ sampleExam.passingScore }}% to pass · Unlimited attempts
                </p>
            </div>
            <Alert class="border-teal-100 bg-teal-50"
                ><Info class="size-4" /><AlertTitle
                    >Course completion requirements</AlertTitle
                ><AlertDescription
                    >Complete all 23 videos and pass this instructor-enabled
                    exam to finish the course and receive your platform
                    certificate. Submitted attempts are saved in this browser
                    tab session; unfinished answers reset on
                    reload.</AlertDescription
                ></Alert
            >
            <div>
                <Alert
                    v-if="notice"
                    role="status"
                    class="border-amber-200 bg-amber-50"
                    ><AlertTitle>Exam notice</AlertTitle
                    ><AlertDescription>{{ notice }}</AlertDescription></Alert
                >
                <div
                    class="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]"
                >
                    <div class="min-w-0 space-y-5">
                        <ExamQuestion
                            :key="currentQuestion.id"
                            v-model="currentAnswer"
                            :question="currentQuestion"
                            :number="currentIndex + 1"
                            :total="questions.length"
                        />
                        <div class="flex flex-wrap justify-between gap-3">
                            <Button
                                variant="outline"
                                class="h-11"
                                :disabled="currentIndex === 0"
                                @click="selectQuestion(currentIndex - 1)"
                                ><ArrowLeft
                                    class="size-4"
                                    aria-hidden="true"
                                />Previous Question</Button
                            ><Button
                                v-if="currentIndex < questions.length - 1"
                                variant="outline"
                                class="h-11"
                                @click="selectQuestion(currentIndex + 1)"
                                >Next Question<ArrowRight
                                    class="size-4"
                                    aria-hidden="true"
                            /></Button>
                        </div>
                        <Button
                            class="h-11 w-full bg-teal-700 text-white hover:bg-teal-800 sm:w-auto"
                            @click="requestSubmit"
                            >Submit Exam</Button
                        >
                    </div>
                    <aside class="space-y-5">
                        <ExamNavigator
                            :question-ids="
                                questions.map((question) => question.id)
                            "
                            :answers="answers"
                            :current-id="currentQuestion.id"
                            :answered-count="answeredCount"
                            @select="selectQuestion"
                        /><Card class="border-slate-200 bg-white shadow-sm"
                            ><CardHeader
                                ><CardTitle class="text-lg"
                                    >Assessment Rules</CardTitle
                                ></CardHeader
                            ><CardContent
                                ><ul
                                    class="list-disc space-y-3 pl-4 text-sm leading-6 text-slate-500"
                                >
                                    <li>
                                        True/false and single-answer multiple
                                        choice only.
                                    </li>
                                    <li>
                                        Each sample question has equal weight.
                                    </li>
                                    <li>
                                        You can change any answer before
                                        confirming submission.
                                    </li>
                                    <li>
                                        Answer all questions before submitting.
                                    </li>
                                    <li>
                                        No time limit in this preview. Attempts
                                        are unlimited.
                                    </li>
                                </ul></CardContent
                            ></Card
                        >
                    </aside>
                </div>
            </div>
        </main>
        <AlertDialog v-model:open="confirmationOpen"
            ><AlertDialogContent class="bg-white text-slate-900"
                ><AlertDialogHeader
                    ><AlertDialogTitle>Submit your exam?</AlertDialogTitle
                    ><AlertDialogDescription
                        >You have answered {{ answeredCount }} of
                        {{ questions.length }} questions. The passing score is
                        {{ sampleExam.passingScore }}%. Confirm to finish this
                        local attempt, or return to review your
                        answers.</AlertDialogDescription
                    ></AlertDialogHeader
                ><AlertDialogFooter
                    ><AlertDialogCancel>Return to Exam</AlertDialogCancel
                    ><AlertDialogAction
                        class="bg-teal-700 text-white hover:bg-teal-800"
                        @click="submit"
                        >Confirm &amp; Submit</AlertDialogAction
                    ></AlertDialogFooter
                ></AlertDialogContent
            ></AlertDialog
        >
    </div>
</template>

<style scoped>
.course-exam {
    font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
    color-scheme: light;
}
</style>
