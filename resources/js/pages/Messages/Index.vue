<script setup lang="ts">
import { Head, router } from "@inertiajs/vue3";
import { computed, ref } from "vue";
import MarketplaceHeader from "@/components/MarketplaceHeader.vue";
import MarketplaceFooter from "@/components/MarketplaceFooter.vue";
import ConversationList from "@/components/ConversationList.vue";
import ConversationThread from "@/components/ConversationThread.vue";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { sampleConversations } from "@/data/sample-conversations";
import type { Currency } from "@/types/course";
const currency = ref<Currency>("EGP");
const conversations = ref(
    sampleConversations.map((item) => ({
        ...item,
        messages: item.messages.map((message) => ({ ...message })),
    })),
);
const selectedId = ref("ahmed");
const selected = computed(() =>
    conversations.value.find((item) => item.id === selectedId.value),
);
const sheetOpen = ref(false);
const sheetTitle = ref("");
function preview(title: string) {
    sheetTitle.value = title;
    sheetOpen.value = true;
}
function addMessage(text: string) {
    if (!selected.value?.contactEnabled || !text.trim() || text.length > 2000)
        return;
    selected.value.messages.push({
        id: `local-${Date.now()}-${selected.value.messages.length}`,
        text: text.trim(),
        author: "student",
        time: new Intl.DateTimeFormat("en-GB", { timeStyle: "short" }).format(
            new Date(),
        ),
    });
}
</script>
<template>
    <Head title="Messages" />
    <div class="min-h-screen bg-slate-50 text-slate-900">
        <MarketplaceHeader
            v-model:currency="currency"
            account-name="Kareem Tarek"
            browse-href="/"
            @browse="router.visit('/')"
            @preview="preview"
        />
        <main class="mx-auto max-w-7xl space-y-6 px-5 py-8 sm:px-8">
            <nav
                aria-label="Breadcrumb"
                class="flex gap-2 text-sm text-slate-500"
            >
                <a href="/" class="text-teal-800">Home</a><span>/</span
                ><span aria-current="page">Messages</span>
            </nav>
            <div>
                <h1 class="text-3xl font-bold">Messages</h1>
                <p class="mt-2 text-sm leading-6 text-slate-600">
                    Keep your conversations with instructors in one place.
                </p>
            </div>
            <p
                class="rounded-lg border border-teal-100 bg-teal-50 p-4 text-sm leading-6 text-teal-900"
            >
                Local preview: messages added here stay on this page and reset
                when you leave. Nothing is sent to an instructor.
            </p>
            <div
                class="grid items-start gap-6 lg:grid-cols-[320px_minmax(0,1fr)]"
            >
                <ConversationList
                    :conversations="conversations"
                    :selected-id="selectedId"
                    @select="selectedId = $event"
                /><ConversationThread
                    v-if="selected"
                    :key="selected.id"
                    :conversation="selected"
                    @message="addMessage"
                />
            </div>
            <a
                href="/purchase-history"
                class="text-sm font-medium text-teal-800"
                >View purchase history →</a
            >
        </main>
        <MarketplaceFooter @preview="preview" />
        <Sheet v-model:open="sheetOpen"
            ><SheetContent
                ><SheetHeader
                    ><SheetTitle>{{ sheetTitle }}</SheetTitle
                    ><SheetDescription
                        >This action is a frontend preview.</SheetDescription
                    ></SheetHeader
                ></SheetContent
            ></Sheet
        >
    </div>
</template>
