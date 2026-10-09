<script setup lang="ts">
import { CheckCircle, XCircle } from '@lucide/vue';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ExamQuestion } from '@/types/exam';
defineProps<{ question: ExamQuestion; answer: string; number: number }>();
</script>
<template>
    <Card class="border-slate-200 bg-white shadow-sm">
        <CardHeader>
            <div class="flex items-center gap-3">
                <span class="text-sm text-slate-500">Question {{ number }}</span
                ><Badge
                    variant="secondary"
                    :class="
                        answer === question.correctOptionId
                            ? 'bg-teal-50 text-teal-800'
                            : 'bg-red-50 text-red-800'
                    "
                    >{{
                        answer === question.correctOptionId
                            ? 'Correct'
                            : 'Incorrect'
                    }}</Badge
                >
            </div>
            <CardTitle class="text-lg leading-7">{{
                question.prompt
            }}</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
            <ul class="space-y-2">
                <li
                    v-for="option in question.options"
                    :key="option.id"
                    class="flex items-start gap-3 rounded-lg border p-3 text-sm"
                    :class="
                        option.id === question.correctOptionId
                            ? 'border-teal-200 bg-teal-50 text-teal-900'
                            : option.id === answer
                              ? 'border-red-200 bg-red-50 text-red-900'
                              : 'border-slate-200 text-slate-600'
                    "
                >
                    <CheckCircle
                        v-if="option.id === question.correctOptionId"
                        class="mt-0.5 size-4 shrink-0"
                        aria-hidden="true"
                    /><XCircle
                        v-else-if="option.id === answer"
                        class="mt-0.5 size-4 shrink-0"
                        aria-hidden="true"
                    />
                    <div class="min-w-0">
                        <p>{{ option.label }}</p>
                        <p
                            v-if="
                                option.id === answer ||
                                option.id === question.correctOptionId
                            "
                            class="mt-1 text-xs font-semibold"
                        >
                            {{ option.id === answer ? 'Your answer' : ''
                            }}{{
                                option.id === answer &&
                                option.id === question.correctOptionId
                                    ? ' · '
                                    : ''
                            }}{{
                                option.id === question.correctOptionId
                                    ? 'Correct answer'
                                    : ''
                            }}
                        </p>
                    </div>
                </li>
            </ul>
            <div class="rounded-lg bg-slate-50 p-4 text-sm leading-6">
                <p class="font-semibold">Explanation</p>
                <p class="mt-1 text-slate-600">{{ question.explanation }}</p>
            </div>
        </CardContent>
    </Card>
</template>
