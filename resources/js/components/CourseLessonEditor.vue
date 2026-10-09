<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { InstructorLesson } from "@/types/instructor-workspace";
import { newPreviewId } from "@/composables/useInstructorWorkspace";
const props = defineProps<{ lesson?: InstructorLesson }>();
const emit = defineEmits<{ save: [lesson: InstructorLesson]; cancel: [] }>();
const title = ref(props.lesson?.title ?? "");
const kind = ref<"video" | "file">(props.lesson?.kind ?? "video");
const fileName = ref(props.lesson?.fileName ?? "");
const summary = ref(props.lesson?.summary ?? "");
const minutes = ref(Math.floor((props.lesson?.durationSeconds ?? 0) / 60));
const seconds = ref((props.lesson?.durationSeconds ?? 0) % 60);
watch(kind, () => {
    fileName.value = "";
});
const ready = computed(
    () =>
        !!title.value.trim() &&
        !!fileName.value &&
        (kind.value === "file" ||
            (Number.isInteger(minutes.value) &&
                minutes.value >= 0 &&
                Number.isInteger(seconds.value) &&
                seconds.value >= 0 &&
                seconds.value < 60 &&
                minutes.value * 60 + seconds.value > 0)),
);
function choose(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file && (kind.value === "file" || file.type.startsWith("video/")))
        fileName.value = file.name;
}
function submit() {
    if (ready.value)
        emit("save", {
            id: props.lesson?.id ?? newPreviewId(),
            title: title.value.trim(),
            kind: kind.value,
            fileName: fileName.value,
            durationSeconds:
                kind.value === "video" ? minutes.value * 60 + seconds.value : 0,
            summary: summary.value.trim(),
        });
}
</script>
<template>
    <form class="space-y-5" @submit.prevent="submit">
        <div class="space-y-2">
            <Label for="lesson-title">Lesson / resource title *</Label
            ><Input
                id="lesson-title"
                v-model="title"
                required
                maxlength="200"
            />
        </div>
        <RadioGroup
            v-model="kind"
            class="flex flex-wrap gap-4"
            aria-label="Lesson type"
            ><div class="flex items-center gap-2">
                <RadioGroupItem id="lesson-video" value="video" /><Label
                    for="lesson-video"
                    >Video lesson</Label
                >
            </div>
            <div class="flex items-center gap-2">
                <RadioGroupItem id="lesson-file" value="file" /><Label
                    for="lesson-file"
                    >Downloadable resource</Label
                >
            </div></RadioGroup
        >
        <div class="space-y-2">
            <Label for="lesson-source">File reference *</Label
            ><Input
                id="lesson-source"
                :key="kind"
                type="file"
                :accept="kind === 'video' ? 'video/*' : undefined"
                @change="choose"
            />
            <p class="text-xs leading-5 break-words text-slate-500">
                {{ fileName || "Choose a file." }} Only its filename is saved.
                No upload or processing occurs.
            </p>
        </div>
        <div v-if="kind === 'video'" class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
                <Label for="lesson-minutes">Minutes</Label
                ><Input
                    id="lesson-minutes"
                    :model-value="minutes"
                    type="number"
                    min="0"
                    step="1"
                    required
                    @update:model-value="minutes = Number($event)"
                />
            </div>
            <div class="space-y-2">
                <Label for="lesson-seconds">Seconds</Label
                ><Input
                    id="lesson-seconds"
                    :model-value="seconds"
                    type="number"
                    min="0"
                    max="59"
                    step="1"
                    required
                    @update:model-value="seconds = Number($event)"
                />
            </div>
        </div>
        <div class="space-y-2">
            <Label for="lesson-summary">Lesson summary (optional)</Label
            ><Textarea
                id="lesson-summary"
                v-model="summary"
                rows="3"
                maxlength="2000"
            />
        </div>
        <div class="flex justify-end gap-3">
            <Button type="button" variant="outline" @click="emit('cancel')"
                >Cancel</Button
            ><Button
                type="submit"
                :disabled="!ready"
                class="bg-teal-700 text-white hover:bg-teal-800"
                >Save lesson reference</Button
            >
        </div>
    </form>
</template>
