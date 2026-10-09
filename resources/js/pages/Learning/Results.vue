<script setup lang="ts">
import { Head, router } from "@inertiajs/vue3";
import { computed } from "vue";
import LearningHeader from "@/components/LearningHeader.vue";
import ExamResultSummary from "@/components/ExamResultSummary.vue";
import ExamAnswerReview from "@/components/ExamAnswerReview.vue";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { sampleCourseTitle, sampleModules } from "@/data/sample-course";
import { sampleExam } from "@/data/sample-exam";
import { useLearningPreview } from "@/composables/useLearningPreview";
const { attempts, completedIds, examPassed, storageAvailable, scoreAttempt } =
    useLearningPreview();
const attempt = computed(() => attempts.value.at(-1));
const score = computed(() => (attempt.value ? scoreAttempt(attempt.value) : 0));
const correctCount = computed(
    () =>
        sampleExam.questions.filter(
            (question) =>
                attempt.value?.answers[question.id] ===
                question.correctOptionId,
        ).length,
);
const totalVideos = sampleModules
    .flatMap((module) => module.lessons)
    .filter((lesson) => lesson.kind === "video").length;
function retake() {
    router.visit("/my-courses/full-stack/exam");
}
</script>
<template>
    <Head title="Exam Results" />
    <div class="exam-results min-h-screen bg-slate-50 text-slate-900">
        <LearningHeader active="exam" />
        <main class="mx-auto max-w-7xl space-y-6 px-5 py-8 sm:px-8">
            <nav
                aria-label="Breadcrumb"
                class="flex flex-wrap gap-2 text-sm text-slate-500"
            >
                <a href="/my-courses" class="text-teal-800">My Courses</a
                ><span>/</span
                ><a href="/my-courses/full-stack" class="text-teal-800"
                    >Course Player</a
                ><span>/</span><span aria-current="page">Exam Results</span>
            </nav>
            <div>
                <h1 class="text-2xl font-bold sm:text-3xl">Exam Results</h1>
                <p class="mt-2 text-lg font-semibold">
                    {{ sampleCourseTitle }}
                </p>
                <p class="mt-2 text-sm text-slate-500">
                    Local sample results saved in this browser tab session. No
                    backend grading or certificate issuance.
                </p>
            </div>
            <Alert v-if="!storageAvailable" class="border-amber-200 bg-amber-50"
                ><AlertTitle>Session storage unavailable</AlertTitle
                ><AlertDescription
                    >Your browser could not restore the local preview. Return to
                    the exam to submit a new attempt.</AlertDescription
                ></Alert
            >
            <template v-if="attempt">
                <ExamResultSummary
                    :score="score"
                    :correct-count="correctCount"
                    :total="sampleExam.questions.length"
                    :passing-score="sampleExam.passingScore"
                    :attempt-number="attempts.length"
                    :completed-videos="completedIds.length"
                    :total-videos="totalVideos"
                    :exam-passed="examPassed"
                    @retake="retake"
                    @certificate="
                        router.visit('/my-courses/full-stack/certificate')
                    "
                />
                <div>
                    <h2 class="text-xl font-semibold">
                        Question Breakdown &amp; Review
                    </h2>
                    <p class="mt-2 text-sm text-slate-500">
                        All {{ sampleExam.questions.length }} questions · Your
                        submitted answers and explanations
                    </p>
                </div>
                <div class="space-y-5">
                    <ExamAnswerReview
                        v-for="(question, index) in sampleExam.questions"
                        :key="question.id"
                        :question="question"
                        :number="index + 1"
                        :answer="attempt.answers[question.id]!"
                    />
                </div>
            </template>
            <div v-else class="rounded-xl border border-slate-200 bg-white p-6">
                <h2 class="text-lg font-semibold">
                    No submitted attempt in this tab
                </h2>
                <p class="mt-2 text-sm leading-6 text-slate-600">
                    Results are saved separately for each browser tab. If you
                    submitted an exam in another tab, return to that tab to see
                    your result, or start an exam here.
                </p>
                <Button
                    class="mt-5 h-11 bg-teal-700 text-white hover:bg-teal-800"
                    @click="retake"
                    >Go to Exam</Button
                >
            </div>
        </main>
    </div>
</template>
<style scoped>
.exam-results {
    font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
    color-scheme: light;
}
</style>
