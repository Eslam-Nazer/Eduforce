<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import type { ExamQuestion } from '@/types/exam';
defineProps<{ question: ExamQuestion; number: number; total: number }>();
const answer = defineModel<string>({ default: '' });
</script>
<template>
    <Card class="border-slate-200 bg-white shadow-sm"
        ><CardHeader class="space-y-3"
            ><div class="flex flex-wrap items-center justify-between gap-3">
                <p class="text-xs font-semibold text-teal-800">
                    QUESTION {{ number }} OF {{ total }}
                </p>
                <Badge variant="secondary">{{
                    question.type === 'true-false'
                        ? 'True / False'
                        : 'Single Choice'
                }}</Badge>
            </div>
            <CardTitle
                :id="`${question.id}-prompt`"
                class="text-xl leading-8"
                >{{ question.prompt }}</CardTitle
            >
            <p class="text-sm text-slate-500">
                Select one answer. You can change it before submission.
            </p></CardHeader
        ><CardContent
            ><RadioGroup
                v-model="answer"
                :aria-labelledby="`${question.id}-prompt`"
                class="gap-3"
                ><div
                    v-for="(option, index) in question.options"
                    :key="option.id"
                    class="flex items-start gap-3 rounded-lg border p-4"
                    :class="
                        answer === option.id
                            ? 'border-teal-600 bg-teal-50'
                            : 'border-slate-200 bg-white'
                    "
                >
                    <RadioGroupItem
                        :id="`${question.id}-${option.id}`"
                        :value="option.id"
                        class="mt-1 shrink-0"
                    /><Label
                        :for="`${question.id}-${option.id}`"
                        class="flex flex-1 cursor-pointer items-start gap-3 text-sm leading-6"
                        ><span
                            class="font-semibold text-slate-500"
                            aria-hidden="true"
                            >{{ String.fromCharCode(65 + index) }}</span
                        >{{ option.label }}</Label
                    >
                </div></RadioGroup
            ></CardContent
        ></Card
    >
</template>
