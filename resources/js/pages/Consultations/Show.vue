<script setup lang="ts">
import { Head, router } from "@inertiajs/vue3";
import { computed, ref } from "vue";
import { Check, Minus, Info } from "@lucide/vue";
import MarketplaceHeader from "@/components/MarketplaceHeader.vue";
import MarketplaceFooter from "@/components/MarketplaceFooter.vue";
import ConsultationRequestCard from "@/components/ConsultationRequestCard.vue";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { sampleInstructorProfile as instructor } from "@/data/sample-instructor";
import type { Currency } from "@/types/course";
const props = defineProps<{ serviceId: string }>();
const service = computed(() =>
    instructor.services.find((item) => item.id === props.serviceId),
);
const currency = ref<Currency>("EGP");
const sheetOpen = ref(false);
const sheetTitle = ref("");

const exclusions = computed(() =>
    service.value?.id === "career-advisory"
        ? [
              "Job placement or a guaranteed career outcome.",
              "Completing assignments or projects on your behalf.",
          ]
        : [
              "Implementing new features on your behalf.",
              "Making changes to a live production environment.",
              "Completing coursework or assignments on your behalf.",
          ],
);
const steps = computed(() => [
    {
        title: "Submit Request",
        detail: "Describe your questions and the context for the service.",
    },
    {
        title: "Agree on Time",
        detail: "Coordinate the appointment and scope directly with the instructor.",
    },
    ...(service.value?.egp
        ? [
              {
                  title: "Payment",
                  detail: "Pay only after the appointment has been agreed.",
              },
          ]
        : []),
    {
        title: "Remote Session",
        detail: "Meet through an external meeting tool agreed with the instructor.",
    },
]);
function preview(title: string) {
    sheetTitle.value = title;
    sheetOpen.value = true;
}
function request() {
    if (service.value)
        router.visit(`/consultations/${service.value.id}/request`);
}
</script>
<template>
    <Head :title="service?.title ?? 'Service not found'" />
    <div class="consultation-page min-h-screen bg-slate-50 text-slate-900">
        <MarketplaceHeader
            v-model:currency="currency"
            account-name="Kareem Tarek"
            @browse="router.visit('/')"
            @preview="preview"
        />
        <main class="mx-auto max-w-7xl px-5 py-8 sm:px-8">
            <nav
                aria-label="Breadcrumb"
                class="mb-7 flex flex-wrap gap-2 text-sm text-slate-500"
            >
                <a href="/" class="text-teal-800">Home</a><span>/</span
                ><a href="/instructors/ahmed-mansour" class="text-teal-800">{{
                    instructor.name
                }}</a
                ><span>/</span
                ><span aria-current="page">{{
                    service?.title ?? "Service not found"
                }}</span>
            </nav>
            <div
                v-if="service"
                class="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_350px]"
            >
                <div class="min-w-0 space-y-6">
                    <Card class="border-slate-200 bg-white shadow-sm"
                        ><CardContent class="p-5 sm:p-8">
                            <div class="flex flex-wrap gap-2">
                                <Badge
                                    variant="secondary"
                                    class="max-w-full bg-teal-50 text-left whitespace-normal text-teal-800"
                                    >Standalone Service · No course enrollment
                                    required</Badge
                                ><Badge variant="outline"
                                    >{{
                                        service.durationMinutes
                                    }}
                                    minutes</Badge
                                >
                            </div>
                            <h1 class="mt-5 text-3xl leading-tight font-bold">
                                {{ service.title }}
                            </h1>
                            <p class="mt-4 text-base leading-7 text-slate-600">
                                {{ service.description }}
                            </p>
                            <a
                                href="/instructors/ahmed-mansour"
                                class="mt-6 flex items-center gap-3"
                                ><Avatar
                                    ><AvatarFallback
                                        class="bg-teal-50 text-teal-800"
                                        >{{
                                            instructor.initials
                                        }}</AvatarFallback
                                    ></Avatar
                                >
                                <div>
                                    <p class="font-semibold">
                                        {{ instructor.name }}
                                    </p>
                                    <p class="text-sm text-slate-500">
                                        {{ instructor.headline }}
                                    </p>
                                </div></a
                            >
                        </CardContent></Card
                    >
                    <Card class="border-slate-200 bg-white shadow-sm"
                        ><CardContent class="p-5 sm:p-8">
                            <p
                                class="text-xs font-semibold tracking-wider text-teal-700"
                            >
                                {{ service.category }}
                            </p>
                            <h2 class="mt-2 text-xl font-semibold">
                                Topic & Scope
                            </h2>
                            <p class="mt-3 text-sm text-slate-500">
                                {{ service.audience }}
                            </p>
                            <div class="mt-6 grid gap-4 md:grid-cols-2">
                                <div class="rounded-lg bg-teal-50 p-4">
                                    <h3 class="font-semibold text-teal-900">
                                        What this session covers
                                    </h3>
                                    <ul class="mt-4 space-y-4">
                                        <li
                                            v-for="item in service.scope"
                                            :key="item"
                                            class="flex gap-3 text-sm leading-6 text-slate-600"
                                        >
                                            <Check
                                                class="mt-1 size-4 shrink-0 text-teal-700"
                                                aria-hidden="true"
                                            />{{ item }}
                                        </li>
                                    </ul>
                                </div>
                                <div class="rounded-lg bg-slate-50 p-4">
                                    <h3 class="font-semibold">
                                        Outside this sample service
                                    </h3>
                                    <ul class="mt-4 space-y-4">
                                        <li
                                            v-for="item in exclusions"
                                            :key="item"
                                            class="flex gap-3 text-sm leading-6 text-slate-600"
                                        >
                                            <Minus
                                                class="mt-1 size-4 shrink-0 text-slate-500"
                                                aria-hidden="true"
                                            />{{ item }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent></Card
                    >
                    <Card class="border-slate-200 bg-white shadow-sm"
                        ><CardContent class="p-5 sm:p-8"
                            ><h2 class="text-xl font-semibold">How It Works</h2>
                            <ol class="mt-6 grid gap-4 sm:grid-cols-2">
                                <li
                                    v-for="(step, index) in steps"
                                    :key="step.title"
                                    class="rounded-lg bg-slate-50 p-4"
                                >
                                    <span
                                        class="text-sm font-semibold text-teal-800"
                                        >{{
                                            String(index + 1).padStart(2, "0")
                                        }}</span
                                    >
                                    <h3 class="mt-3 font-semibold">
                                        {{ step.title }}
                                    </h3>
                                    <p
                                        class="mt-2 text-sm leading-6 text-slate-600"
                                    >
                                        {{ step.detail }}
                                    </p>
                                </li>
                            </ol>
                            <Alert class="mt-5 border-teal-100 bg-teal-50"
                                ><Info class="size-4" /><AlertTitle
                                    >Scheduling by agreement</AlertTitle
                                ><AlertDescription
                                    >No automatic booking slots. Services are
                                    available independently of course purchases
                                    or published courses.</AlertDescription
                                ></Alert
                            ></CardContent
                        ></Card
                    >
                </div>
                <aside aria-label="Service request" class="lg:sticky lg:top-6">
                    <ConsultationRequestCard
                        :service="service"
                        :currency="currency"
                        @request="request"
                    />
                </aside>
            </div>
            <div v-else class="rounded-xl border bg-white p-6">
                <h1 class="text-2xl font-semibold">Service not found</h1>
                <Button as-child variant="outline" class="mt-5"
                    ><a href="/instructors/ahmed-mansour"
                        >Back to Instructor</a
                    ></Button
                >
            </div>
        </main>
        <MarketplaceFooter @preview="preview" />
        <Sheet v-model:open="sheetOpen"
            ><SheetContent class="overflow-y-auto bg-white text-slate-900"
                ><SheetHeader
                    ><SheetTitle>{{ sheetTitle }}</SheetTitle
                    ><SheetDescription
                        >This destination is not connected in this
                        preview.</SheetDescription
                    ></SheetHeader
                ></SheetContent
            ></Sheet
        >
    </div>
</template>
<style scoped>
.consultation-page {
    font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
    color-scheme: light;
}
</style>
