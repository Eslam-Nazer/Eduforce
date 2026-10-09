<script setup lang="ts">
import { ref } from "vue";
import { BookOpen, ArrowLeft } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";

const legalTitle = ref("");
const legalOpen = ref(false);
function openLegal(title: string) {
    legalTitle.value = title;
    legalOpen.value = true;
}
</script>

<template>
    <div class="auth-layout flex min-h-screen flex-col bg-[#f8fafc] text-slate-900">
        <header class="border-b border-slate-200 bg-white">
            <div
                class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8"
            >
                <a href="/" class="flex items-center gap-2 text-lg font-bold"
                    ><BookOpen class="size-6 text-teal-700" aria-hidden="true" />Eduforce</a
                >
                <Button as-child variant="ghost" class="text-sm text-slate-500"
                    ><a href="/"
                        ><ArrowLeft class="size-4" aria-hidden="true" />Back to Home</a
                    ></Button
                >
            </div>
        </header>
        <main class="flex flex-1 items-center justify-center px-5 py-10 sm:py-12">
            <div class="w-full max-w-md"><slot /></div>
        </main>
        <footer class="border-t border-slate-200 bg-white">
            <div
                class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 text-xs text-slate-500 sm:px-8"
            >
                <p>© {{ new Date().getFullYear() }} Eduforce Inc.</p>
                <div class="flex gap-4">
                    <Button
                        variant="link"
                        class="h-auto p-0 text-xs text-slate-500"
                        @click="openLegal('Terms of Service')"
                        >Terms</Button
                    >
                    <Button
                        variant="link"
                        class="h-auto p-0 text-xs text-slate-500"
                        @click="openLegal('Privacy Policy')"
                        >Privacy</Button
                    >
                </div>
            </div>
        </footer>
        <Sheet v-model:open="legalOpen"
            ><SheetContent class="bg-white text-slate-900"
                ><SheetHeader
                    ><SheetTitle>{{ legalTitle }}</SheetTitle
                    ><SheetDescription
                        >This document will be available when the platform launches. This is a local
                        interface preview.</SheetDescription
                    ></SheetHeader
                ></SheetContent
            ></Sheet
        >
    </div>
</template>

<style scoped>
.auth-layout {
    font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
    color-scheme: light;
}
</style>
