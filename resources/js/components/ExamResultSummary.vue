<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
defineProps<{
    score: number;
    correctCount: number;
    total: number;
    passingScore: number;
    attemptNumber: number;
    completedVideos: number;
    totalVideos: number;
    examPassed: boolean;
}>();
defineEmits<{ retake: []; certificate: [] }>();
</script>
<template>
    <Card class="border-slate-200 bg-white shadow-sm" role="status">
        <CardHeader
            ><Badge
                variant="secondary"
                class="w-fit"
                :class="
                    score >= passingScore
                        ? 'bg-teal-50 text-teal-800'
                        : 'bg-red-50 text-red-800'
                "
                >{{ score >= passingScore ? 'Passed' : 'Not Passed' }}</Badge
            ><CardTitle class="text-2xl"
                >Course Exam Results</CardTitle
            ></CardHeader
        >
        <CardContent class="space-y-6">
            <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <p class="text-xs text-slate-500">TOTAL SCORE</p>
                    <p
                        class="mt-2 text-4xl font-bold"
                        :class="
                            score >= passingScore
                                ? 'text-teal-800'
                                : 'text-red-800'
                        "
                    >
                        {{ score }}%
                    </p>
                    <p class="mt-2 text-sm text-slate-500">
                        {{ correctCount }} of {{ total }} correct
                    </p>
                </div>
                <div>
                    <p class="text-xs text-slate-500">PASSING SCORE</p>
                    <p class="mt-2 text-xl font-semibold">
                        {{ passingScore }}%
                    </p>
                </div>
                <div>
                    <p class="text-xs text-slate-500">ATTEMPT</p>
                    <p class="mt-2 text-xl font-semibold">
                        {{ attemptNumber }}
                    </p>
                    <p class="mt-2 text-sm text-slate-500">
                        Unlimited attempts
                    </p>
                </div>
                <div>
                    <p class="text-xs text-slate-500">ANSWER BREAKDOWN</p>
                    <p class="mt-2 text-sm text-teal-800">
                        {{ correctCount }} correct
                    </p>
                    <p class="mt-2 text-sm text-red-800">
                        {{ total - correctCount }} incorrect
                    </p>
                </div>
            </div>
            <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h2 class="font-semibold">
                    {{
                        examPassed && completedVideos === totalVideos
                            ? 'Certificate requirements met'
                            : 'Certificate requirements'
                    }}
                </h2>
                <p class="mt-2 text-sm leading-6 text-slate-600">
                    {{ completedVideos }} / {{ totalVideos }} videos completed ·
                    {{ examPassed ? 'Exam passed' : 'Exam pass required' }}.
                </p>
                <p
                    v-if="score < passingScore"
                    class="mt-2 text-sm leading-6 text-slate-600"
                >
                    Review your answers below and try again.
                    {{
                        examPassed
                            ? 'Your earlier passing attempt still counts toward course completion.'
                            : 'You need a passing attempt and all videos completed to receive your platform certificate.'
                    }}
                </p>
            </div>
            <div class="flex flex-wrap gap-3">
                <Button
                    v-if="examPassed && completedVideos === totalVideos"
                    class="h-11 bg-teal-700 text-white hover:bg-teal-800"
                    @click="$emit('certificate')"
                    >View Certificate Preview</Button
                ><Button class="h-11" variant="outline" @click="$emit('retake')"
                    >Retake Exam</Button
                ><Button as-child class="h-11" variant="outline"
                    ><a href="/my-courses/full-stack"
                        >Back to Course Player</a
                    ></Button
                >
            </div>
        </CardContent>
    </Card>
</template>
