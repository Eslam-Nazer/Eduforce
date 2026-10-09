import { computed, ref } from 'vue';
import { sampleCompletedIds, sampleModules } from '@/data/sample-course';
import { sampleExam } from '@/data/sample-exam';
import type { ExamAttempt } from '@/types/exam';

const storageKey = 'eduforce:full-stack:preview:v1';
const videoIds = sampleModules
    .flatMap((module) => module.lessons)
    .filter((lesson) => lesson.kind === 'video')
    .map((lesson) => lesson.id);

export function useLearningPreview() {
    const completedIds = ref<string[]>([...sampleCompletedIds]);
    const attempts = ref<ExamAttempt[]>([]);
    const storageAvailable = ref(true);
    try {
        const raw =
            typeof window === 'undefined'
                ? null
                : window.sessionStorage.getItem(storageKey);
        if (raw) {
            const saved = JSON.parse(raw);
            if (Array.isArray(saved.completedIds))
                completedIds.value = [
                    ...new Set<string>(
                        saved.completedIds.filter(
                            (id: unknown) =>
                                typeof id === 'string' && videoIds.includes(id),
                        ),
                    ),
                ];
            if (Array.isArray(saved.attempts))
                attempts.value = saved.attempts.filter(
                    (attempt: ExamAttempt) =>
                        attempt &&
                        typeof attempt.submittedAt === 'string' &&
                        Number.isFinite(Date.parse(attempt.submittedAt)) &&
                        attempt.answers &&
                        sampleExam.questions.every((question) =>
                            question.options.some(
                                (option) =>
                                    option.id === attempt.answers[question.id],
                            ),
                        ),
                );
        }
    } catch {
        storageAvailable.value = false;
    }

    function scoreAttempt(attempt: ExamAttempt) {
        return Math.round(
            (sampleExam.questions.filter(
                (question) =>
                    attempt.answers[question.id] === question.correctOptionId,
            ).length /
                sampleExam.questions.length) *
                100,
        );
    }
    const examPassed = computed(() =>
        attempts.value.some(
            (attempt) => scoreAttempt(attempt) >= sampleExam.passingScore,
        ),
    );
    function persist() {
        try {
            window.sessionStorage.setItem(
                storageKey,
                JSON.stringify({
                    completedIds: completedIds.value,
                    attempts: attempts.value,
                }),
            );
        } catch {
            storageAvailable.value = false;
        }
    }
    function markCompleted(id: string) {
        if (videoIds.includes(id) && !completedIds.value.includes(id)) {
            completedIds.value.push(id);
            persist();
        }
    }
    function submitAttempt(answers: Record<string, string>) {
        if (
            !sampleExam.questions.every((question) =>
                question.options.some(
                    (option) => option.id === answers[question.id],
                ),
            )
        )
            return false;
        attempts.value.push({
            answers: { ...answers },
            submittedAt: new Date().toISOString(),
        });
        persist();
        return storageAvailable.value;
    }
    return {
        completedIds,
        attempts,
        examPassed,
        storageAvailable,
        markCompleted,
        submitAttempt,
        scoreAttempt,
    };
}
