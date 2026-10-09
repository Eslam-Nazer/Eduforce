<script setup lang="ts">
import { Head, router } from "@inertiajs/vue3";
import { ref } from "vue";
import MarketplaceHeader from "@/components/MarketplaceHeader.vue";
import MarketplaceFooter from "@/components/MarketplaceFooter.vue";
import InstructorApplicationForm from "@/components/InstructorApplicationForm.vue";
import InstructorApplicationStatus from "@/components/InstructorApplicationStatus.vue";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import type { Currency } from "@/types/course";
const currency = ref<Currency>("EGP");
const state = ref<"form" | "pending" | "approved" | "rejected">("form");
const open = ref(false);
const title = ref("");
function preview(value: string) {
    title.value = value;
    open.value = true;
}
</script>
<template>
    <Head title="Become an Instructor" />
    <div class="min-h-screen bg-slate-50 text-slate-900">
        <MarketplaceHeader
            v-model:currency="currency"
            account-name="Ahmed Mansour"
            browse-href="/"
            @browse="router.visit('/')"
            @preview="preview"
        />
        <main class="mx-auto max-w-3xl space-y-6 px-5 py-10 sm:px-8">
            <a href="/my-courses" class="text-sm text-teal-800"
                >← Back to learning</a
            >
            <div class="text-center">
                <h1 class="text-3xl font-bold">
                    Apply to Become an Instructor
                </h1>
                <p class="mt-3 text-sm leading-6 text-slate-500">
                    Share your expertise. One account gives you access to
                    learning and, after approval, teaching.
                </p>
            </div>
            <p
                class="rounded-lg bg-teal-50 p-4 text-sm leading-6 text-teal-900"
            >
                Local application preview. The form and review states reset when
                you leave this page.
            </p>
            <div>
                <p class="mb-2 text-xs text-slate-500">Demo review states</p>
                <Tabs v-model="state"
                    ><TabsList class="h-auto flex-wrap"
                        ><TabsTrigger value="form">Form</TabsTrigger
                        ><TabsTrigger value="pending">Under review</TabsTrigger
                        ><TabsTrigger value="approved">Approved</TabsTrigger
                        ><TabsTrigger value="rejected"
                            >Needs changes</TabsTrigger
                        ></TabsList
                    ></Tabs
                >
            </div>
            <Card class="border-slate-200 bg-white"
                ><CardContent class="p-5 sm:p-8"
                    ><div v-show="state === 'form'">
                        <p
                            class="mb-6 rounded-lg bg-slate-50 p-4 text-sm font-semibold"
                        >
                            Ahmed Mansour · sample account
                        </p>
                        <InstructorApplicationForm
                            @submit="state = 'pending'"
                        />
                    </div>
                    <InstructorApplicationStatus
                        v-if="state !== 'form'"
                        :state="state"
                        @edit="state = 'form'" /></CardContent
            ></Card>
        </main>
        <MarketplaceFooter @preview="preview" /><Sheet v-model:open="open"
            ><SheetContent
                ><SheetHeader
                    ><SheetTitle>{{ title }}</SheetTitle
                    ><SheetDescription
                        >This action is a frontend preview.</SheetDescription
                    ></SheetHeader
                ></SheetContent
            ></Sheet
        >
    </div>
</template>
