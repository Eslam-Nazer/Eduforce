<script setup lang="ts">
import { computed, ref } from "vue";
import { Search, MessageCircle } from "@lucide/vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Conversation } from "@/types/message";
const props = defineProps<{
    conversations: Conversation[];
    selectedId: string;
}>();
const emit = defineEmits<{ select: [id: string] }>();
const search = ref("");
const visible = computed(() =>
    props.conversations.filter((item) =>
        `${item.name} ${item.subject}`
            .toLowerCase()
            .includes(search.value.trim().toLowerCase()),
    ),
);
</script>
<template>
    <aside class="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div class="border-b border-slate-200 p-5">
            <h2 class="flex items-center gap-2 font-semibold">
                <MessageCircle class="size-4 text-teal-700" />Conversations
            </h2>
            <div class="relative mt-4">
                <Search
                    class="absolute top-3 left-3 size-4 text-slate-400"
                    aria-hidden="true"
                /><Input
                    v-model="search"
                    aria-label="Search conversations"
                    placeholder="Search instructors…"
                    class="pl-9"
                />
            </div>
        </div>
        <div class="p-2">
            <Button
                v-for="item in visible"
                :key="item.id"
                variant="ghost"
                :aria-pressed="selectedId === item.id"
                class="h-auto w-full justify-start gap-3 rounded-lg p-3 text-left whitespace-normal"
                :class="
                    selectedId === item.id ? 'bg-teal-50 hover:bg-teal-50' : ''
                "
                @click="emit('select', item.id)"
            >
                <span
                    class="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600"
                    >{{ item.initials }}</span
                >
                <span class="min-w-0 flex-1"
                    ><span class="block font-semibold">{{ item.name }}</span
                    ><span
                        class="mt-1 block truncate text-xs font-normal text-slate-500"
                        >{{ item.messages.at(-1)?.text }}</span
                    ><Badge
                        v-if="!item.contactEnabled"
                        variant="secondary"
                        class="mt-2 text-[10px]"
                        >Contact disabled</Badge
                    ></span
                >
            </Button>
            <p
                v-if="!visible.length"
                role="status"
                class="p-4 text-sm text-slate-500"
            >
                No matching conversations.
            </p>
        </div>
    </aside>
</template>
