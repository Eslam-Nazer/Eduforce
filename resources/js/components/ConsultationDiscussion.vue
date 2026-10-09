<script setup lang="ts">
import { ref } from "vue";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { ConsultationDiscussionMessage } from "@/types/instructor";
defineProps<{ messages: ConsultationDiscussionMessage[]; active: boolean }>();
const emit = defineEmits<{ message: [text: string] }>();
const message = ref("");
function preview() {
    if (!message.value.trim()) return;
    emit("message", message.value.trim());
    message.value = "";
}
</script>
<template>
    <Card class="border-slate-200 bg-white shadow-sm"
        ><CardContent class="space-y-5 p-5 sm:p-6"
            ><h2 class="text-xl font-semibold">Preparation & Discussion</h2>
            <p class="text-sm leading-6 text-slate-500">
                Local text previews only. Nothing is sent to the instructor, and
                no replies are simulated.
            </p>
            <div
                v-if="messages.length"
                role="log"
                aria-label="Local message previews"
                class="space-y-3"
            >
                <div
                    v-for="item in messages"
                    :key="item.id"
                    class="rounded-lg bg-teal-50 p-4"
                >
                    <p class="text-xs font-semibold text-teal-800">
                        Your local preview
                    </p>
                    <p
                        class="mt-2 text-sm leading-6 break-words whitespace-pre-wrap"
                    >
                        {{ item.text }}
                    </p>
                </div>
            </div>
            <p v-else class="text-sm text-slate-500">No local messages yet.</p>
            <form v-if="active" class="space-y-3" @submit.prevent="preview">
                <Label for="discussion-message">Message to Instructor</Label
                ><Textarea
                    id="discussion-message"
                    v-model="message"
                    maxlength="2000"
                    rows="4"
                    placeholder="Discuss your questions or suggest appointment times"
                />
                <p class="text-xs text-slate-500">
                    {{ message.length }} / 2000 · Text only
                </p>
                <Button
                    type="submit"
                    :disabled="!message.trim()"
                    class="bg-teal-700 text-white hover:bg-teal-800"
                    >Preview Message</Button
                >
            </form>
            <p v-else class="text-sm text-slate-500">
                This request is closed.
            </p></CardContent
        ></Card
    >
</template>
