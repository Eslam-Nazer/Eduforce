<script setup lang="ts">
import { nextTick, ref } from "vue";
import { Send, Lock, ExternalLink } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import type { Conversation } from "@/types/message";
defineProps<{ conversation: Conversation }>();
const emit = defineEmits<{ message: [text: string] }>();
const text = ref("");
const history = ref<HTMLElement | null>(null);
async function submit() {
    const value = text.value.trim();
    if (!value) return;
    emit("message", value);
    text.value = "";
    await nextTick();
    history.value?.scrollTo({ top: history.value.scrollHeight });
}
</script>
<template>
    <section
        class="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white"
    >
        <div
            class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-5"
        >
            <div class="flex items-center gap-3">
                <span
                    class="flex size-11 items-center justify-center rounded-full bg-teal-50 font-semibold text-teal-800"
                    >{{ conversation.initials }}</span
                >
                <div>
                    <h2 class="font-semibold">{{ conversation.name }}</h2>
                    <p class="mt-1 text-xs text-slate-500">
                        {{ conversation.headline }}
                    </p>
                </div>
            </div>
            <Badge variant="secondary">Sample conversation</Badge>
        </div>
        <div
            v-if="conversation.id === 'ahmed'"
            class="flex flex-wrap items-center justify-between gap-2 border-b border-teal-100 bg-teal-50 px-5 py-3 text-xs"
        >
            <span class="text-teal-900"
                >Consultation · {{ conversation.subject }}</span
            ><a
                href="/consultations/requests"
                class="flex items-center gap-1 font-semibold text-teal-800"
                >View request<ExternalLink class="size-3"
            /></a>
        </div>
        <div
            ref="history"
            role="log"
            aria-label="Conversation messages"
            aria-live="polite"
            class="max-h-[480px] min-h-72 space-y-5 overflow-y-auto bg-slate-50/50 p-5 sm:p-6"
        >
            <p class="text-center text-xs text-slate-400">
                Illustrative conversation
            </p>
            <div
                v-for="message in conversation.messages"
                :key="message.id"
                class="flex"
                :class="
                    message.author === 'student'
                        ? 'justify-end'
                        : 'justify-start'
                "
            >
                <div class="max-w-[85%] sm:max-w-[75%]">
                    <p
                        class="mb-1 text-xs text-slate-500"
                        :class="
                            message.author === 'student' ? 'text-right' : ''
                        "
                    >
                        {{
                            message.author === "student"
                                ? "You"
                                : conversation.name
                        }}
                    </p>
                    <p
                        class="rounded-xl px-4 py-3 text-sm leading-6 break-words whitespace-pre-wrap"
                        :class="
                            message.author === 'student'
                                ? 'bg-teal-700 text-white'
                                : 'border border-slate-200 bg-white text-slate-700'
                        "
                    >
                        {{ message.text }}
                    </p>
                    <p
                        class="mt-1 text-xs text-slate-400"
                        :class="
                            message.author === 'student' ? 'text-right' : ''
                        "
                    >
                        {{ message.time }}
                    </p>
                </div>
            </div>
        </div>
        <form
            v-if="conversation.contactEnabled"
            class="space-y-3 border-t border-slate-200 p-5"
            @submit.prevent="submit"
        >
            <Label for="message-text">Your message</Label
            ><Textarea
                id="message-text"
                v-model="text"
                rows="3"
                maxlength="2000"
                required
                placeholder="Write a text message…"
            />
            <div class="flex flex-wrap items-center justify-between gap-3">
                <p class="text-xs text-slate-500">
                    Text only · {{ text.length }}/2000
                </p>
                <Button
                    type="submit"
                    :disabled="!text.trim()"
                    class="bg-teal-700 text-white hover:bg-teal-800"
                    ><Send class="size-4" />Add local message</Button
                >
            </div>
        </form>
        <div
            v-else
            class="flex gap-3 border-t border-slate-200 bg-slate-50 p-5 text-sm text-slate-600"
        >
            <Lock class="size-4 shrink-0" />
            <p>
                This instructor has disabled student contact in this sample.
                Previous messages remain visible.
            </p>
        </div>
    </section>
</template>
