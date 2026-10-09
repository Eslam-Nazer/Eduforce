<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
defineProps<{
    questionIds: string[];
    answers: Record<string, string>;
    currentId: string;
    answeredCount: number;
}>();
const emit = defineEmits<{ select: [index: number] }>();
</script>
<template>
    <Card class="border-slate-200 bg-white shadow-sm"
        ><CardHeader
            ><CardTitle class="text-lg"
                >Question Navigator</CardTitle
            ></CardHeader
        ><CardContent class="space-y-5"
            ><div>
                <p class="mb-3 flex justify-between gap-2 text-sm">
                    <span
                        >{{ answeredCount }} /
                        {{ questionIds.length }} answered</span
                    ><span
                        >{{
                            Math.round(
                                (answeredCount / questionIds.length) * 100,
                            )
                        }}%</span
                    >
                </p>
                <Progress
                    :model-value="(answeredCount / questionIds.length) * 100"
                    aria-label="Answered questions"
                    class="bg-slate-100 [&_[data-slot=progress-indicator]]:bg-teal-700"
                />
            </div>
            <nav aria-label="Exam questions" class="grid grid-cols-5 gap-2">
                <Button
                    v-for="(id, index) in questionIds"
                    :key="id"
                    variant="outline"
                    :aria-label="`Question ${index + 1}, ${answers[id] ? 'answered' : 'unanswered'}`"
                    :aria-current="id === currentId ? 'step' : undefined"
                    class="h-10 p-0"
                    :class="
                        id === currentId
                            ? 'border-teal-700 bg-teal-700 text-white hover:bg-teal-800 hover:text-white'
                            : answers[id]
                              ? 'border-teal-200 bg-teal-50 text-teal-800'
                              : 'text-slate-500'
                    "
                    @click="emit('select', index)"
                    >{{ String(index + 1).padStart(2, '0') }}</Button
                >
            </nav>
            <p class="text-xs leading-6 text-slate-500">
                Dark teal: current question. Light teal: answered.
                {{ questionIds.length - answeredCount }} unanswered.
            </p></CardContent
        ></Card
    >
</template>
