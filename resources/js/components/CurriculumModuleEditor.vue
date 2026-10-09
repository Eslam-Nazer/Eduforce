<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { InstructorModule } from "@/types/instructor-workspace";
defineProps<{ module: InstructorModule; index: number; count: number }>();
const emit = defineEmits<{
    rename: [title: string];
    move: [offset: number];
    remove: [];
    add: [];
    edit: [id: string];
    moveLesson: [id: string, offset: number];
    removeLesson: [id: string];
}>();
const duration = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
</script>
<template>
    <Card class="border-slate-200 bg-white"
        ><CardContent class="space-y-5 p-5"
            ><div class="flex flex-wrap items-end justify-between gap-3">
                <div class="min-w-0 flex-1 space-y-2">
                    <Label :for="`module-title-${module.id}`"
                        >Module {{ index + 1 }}</Label
                    ><Input
                        :id="`module-title-${module.id}`"
                        :model-value="module.title"
                        maxlength="200"
                        @update:model-value="emit('rename', String($event))"
                    />
                </div>
                <div class="flex gap-1">
                    <Button
                        variant="outline"
                        size="icon"
                        :disabled="index === 0"
                        :aria-label="`Move module ${index + 1} up`"
                        @click="emit('move', -1)"
                        >↑</Button
                    ><Button
                        variant="outline"
                        size="icon"
                        :disabled="index === count - 1"
                        :aria-label="`Move module ${index + 1} down`"
                        @click="emit('move', 1)"
                        >↓</Button
                    ><Button
                        variant="ghost"
                        class="text-red-700"
                        @click="emit('remove')"
                        >Remove module</Button
                    >
                </div>
            </div>
            <ol class="space-y-3">
                <li
                    v-for="(lesson, lessonIndex) in module.lessons"
                    :key="lesson.id"
                    class="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 p-4"
                >
                    <div class="min-w-0 flex-1">
                        <p class="text-sm font-semibold break-words">
                            {{ lessonIndex + 1 }}. {{ lesson.title }}
                        </p>
                        <p
                            class="mt-1 text-xs leading-5 break-words text-slate-500"
                        >
                            {{
                                lesson.kind === "video"
                                    ? `Video · ${duration(lesson.durationSeconds)}`
                                    : "Downloadable file"
                            }}
                            · {{ lesson.fileName || "No file selected" }}
                        </p>
                    </div>
                    <div class="flex flex-wrap gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            :disabled="lessonIndex === 0"
                            :aria-label="`Move ${lesson.title} up`"
                            @click="emit('moveLesson', lesson.id, -1)"
                            >↑</Button
                        ><Button
                            variant="ghost"
                            size="icon"
                            :disabled="
                                lessonIndex === module.lessons.length - 1
                            "
                            :aria-label="`Move ${lesson.title} down`"
                            @click="emit('moveLesson', lesson.id, 1)"
                            >↓</Button
                        ><Button
                            variant="outline"
                            @click="emit('edit', lesson.id)"
                            >Edit</Button
                        ><Button
                            variant="ghost"
                            :aria-label="`Remove ${lesson.title}`"
                            class="text-red-700"
                            @click="emit('removeLesson', lesson.id)"
                            >Remove</Button
                        >
                    </div>
                </li>
            </ol>
            <p v-if="!module.lessons.length" class="text-sm text-slate-500">
                Add a video lesson or a downloadable resource.
            </p>
            <Button variant="outline" @click="emit('add')"
                >Add lesson / resource</Button
            ></CardContent
        ></Card
    >
</template>
