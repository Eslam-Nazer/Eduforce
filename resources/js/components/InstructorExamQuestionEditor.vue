<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    newPreviewId,
    validQuestion,
} from "@/composables/useInstructorWorkspace";
import type { InstructorQuestion } from "@/types/instructor-workspace";
const question = defineModel<InstructorQuestion>("question", {
    required: true,
});
defineProps<{ index: number; count: number }>();
const emit = defineEmits<{ move: [offset: number]; remove: [] }>();
function removeOption(id: string) {
    if (question.value.options.length <= 2) return;
    question.value.options = question.value.options.filter(
        (option) => option.id !== id,
    );
    if (question.value.correctOptionId === id)
        question.value.correctOptionId = "";
}
</script>
<template>
    <Card class="border-slate-200 bg-white"
        ><CardContent class="space-y-4 p-5"
            ><div class="flex flex-wrap items-center justify-between gap-3">
                <h3 class="text-sm font-semibold">
                    Question {{ index + 1 }} ·
                    {{
                        question.kind === "true-false"
                            ? "True / False"
                            : "Multiple choice"
                    }}
                </h3>
                <div class="flex gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        :disabled="index === 0"
                        :aria-label="`Move question ${index + 1} up`"
                        @click="emit('move', -1)"
                        >↑</Button
                    ><Button
                        variant="outline"
                        size="icon"
                        :disabled="index === count - 1"
                        :aria-label="`Move question ${index + 1} down`"
                        @click="emit('move', 1)"
                        >↓</Button
                    ><Button
                        variant="ghost"
                        class="text-red-700"
                        @click="emit('remove')"
                        >Remove</Button
                    >
                </div>
            </div>
            <div class="space-y-2">
                <Label :for="`question-${question.id}`">Question prompt *</Label
                ><Textarea
                    :id="`question-${question.id}`"
                    v-model="question.prompt"
                    maxlength="2000"
                    rows="3"
                />
            </div>
            <p class="text-xs text-slate-500">Select one correct answer.</p>
            <RadioGroup
                v-model="question.correctOptionId"
                :aria-label="`Correct answer for question ${index + 1}`"
                ><div
                    v-for="(option, optionIndex) in question.options"
                    :key="option.id"
                    class="flex items-center gap-3"
                >
                    <RadioGroupItem
                        :id="`answer-${question.id}-${option.id}`"
                        :value="option.id"
                        :aria-label="`Answer ${optionIndex + 1} is correct`"
                    /><Label
                        v-if="question.kind === 'true-false'"
                        :for="`answer-${question.id}-${option.id}`"
                        >{{ option.text }}</Label
                    ><Input
                        v-else
                        v-model="option.text"
                        :aria-label="`Question ${index + 1} answer ${optionIndex + 1}`"
                        maxlength="500"
                    /><Button
                        v-if="question.kind === 'multiple-choice'"
                        variant="ghost"
                        :disabled="question.options.length <= 2"
                        :aria-label="`Remove answer ${optionIndex + 1}`"
                        @click="removeOption(option.id)"
                        >Remove</Button
                    >
                </div></RadioGroup
            ><Button
                v-if="question.kind === 'multiple-choice'"
                variant="outline"
                @click="question.options.push({ id: newPreviewId(), text: '' })"
                >Add answer option</Button
            >
            <p v-if="!validQuestion(question)" class="text-xs text-amber-800">
                Add a question, fill all answers and select the correct answer
                before publication.
            </p></CardContent
        ></Card
    >
</template>
