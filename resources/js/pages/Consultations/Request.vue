<script setup lang="ts">
import { Head, router } from "@inertiajs/vue3";
import { computed, ref, reactive } from "vue";
import MarketplaceHeader from "@/components/MarketplaceHeader.vue";
import MarketplaceFooter from "@/components/MarketplaceFooter.vue";
import ConsultationRequestForm from "@/components/ConsultationRequestForm.vue";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { sampleInstructorProfile } from "@/data/sample-instructor";
import { useInstructorServices } from "@/composables/useInstructorServices";
const { publicServices } = useInstructorServices();
const instructor = reactive({
    ...sampleInstructorProfile,
    services: publicServices,
});
import type { Currency } from "@/types/course";
import type { ConsultationRequestDraft } from "@/types/instructor";
import { useConsultationPreview } from "@/composables/useConsultationPreview";
const { create } = useConsultationPreview();
const props = defineProps<{ serviceId: string }>();
const service = computed(() =>
    instructor.services.find((item) => item.id === props.serviceId),
);
const serviceHref = computed(() => `/consultations/${props.serviceId}`);
const currency = ref<Currency>("EGP");
const sheetOpen = ref(false);
const sheetTitle = ref("");
const draft = ref<ConsultationRequestDraft | null>(null);
const price = computed(() =>
    service.value?.egp === 0
        ? "Free"
        : `${new Intl.NumberFormat("en-US").format(currency.value === "EGP" ? (service.value?.egp ?? 0) : (service.value?.sar ?? 0))} ${currency.value}`,
);
function preview(title: string) {
    draft.value = null;
    sheetTitle.value = title;
    sheetOpen.value = true;
}
function previewRequest(value: ConsultationRequestDraft) {
    draft.value = value;
    sheetTitle.value = "Consultation Request Preview";
    sheetOpen.value = true;
}
function trackRequest() {
    if (!draft.value || !service.value) return;
    const id = create(service.value.id, draft.value);
    router.visit(`/consultations/requests?request=${encodeURIComponent(id)}`);
}
</script>
<template>
    <Head title="Request Consultation" />
    <div class="request-page min-h-screen bg-slate-50 text-slate-900">
        <MarketplaceHeader
            v-model:currency="currency"
            account-name="Kareem Tarek"
            @browse="router.visit('/')"
            @preview="preview"
        />
        <main class="mx-auto max-w-7xl space-y-7 px-5 py-8 sm:px-8">
            <nav
                aria-label="Breadcrumb"
                class="flex flex-wrap gap-2 text-sm text-slate-500"
            >
                <a href="/instructors/ahmed-mansour" class="text-teal-800">{{
                    instructor.name
                }}</a
                ><span>/</span
                ><a :href="serviceHref" class="text-teal-800">{{
                    service?.title ?? "Service"
                }}</a
                ><span>/</span><span aria-current="page">New Request</span>
            </nav>
            <template v-if="service">
                <div>
                    <Badge variant="secondary" class="bg-teal-50 text-teal-800"
                        >Standalone Consultation</Badge
                    >
                    <h1 class="mt-4 text-3xl font-bold">
                        Request Consultation with {{ instructor.name }}
                    </h1>
                    <p class="mt-3 text-sm leading-6 text-slate-600">
                        Provide context and optional preferred times. The
                        appointment is finalized by agreement with the
                        instructor.
                    </p>
                </div>
                <div
                    class="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"
                >
                    <Card class="min-w-0 border-slate-200 bg-white shadow-sm"
                        ><CardContent class="space-y-6 p-5 sm:p-8">
                            <div
                                class="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-teal-50 p-4"
                            >
                                <div>
                                    <p
                                        class="text-xs font-semibold tracking-wide text-teal-800"
                                    >
                                        SELECTED SERVICE
                                    </p>
                                    <h2 class="mt-2 font-semibold">
                                        {{ service.title }}
                                    </h2>
                                    <p class="mt-2 text-sm text-slate-600">
                                        {{ service.durationMinutes }} minutes ·
                                        {{ price }} · Remote 1-on-1
                                    </p>
                                </div>
                                <Button
                                    as-child
                                    variant="link"
                                    class="p-0 text-teal-800"
                                    ><a
                                        href="/instructors/ahmed-mansour#consultation-services"
                                        >Change Service</a
                                    ></Button
                                >
                            </div>
                            <ConsultationRequestForm
                                :key="service.id"
                                :free="service.egp === 0"
                                :cancel-href="serviceHref"
                                @submit="previewRequest"
                            /> </CardContent
                    ></Card>
                    <aside aria-label="Instructor and next steps">
                        <Card class="border-slate-200 bg-white shadow-sm"
                            ><CardContent class="space-y-6 p-5 sm:p-6"
                                ><a
                                    href="/instructors/ahmed-mansour"
                                    class="flex items-center gap-3"
                                    ><Avatar
                                        ><AvatarFallback
                                            class="bg-teal-50 text-teal-800"
                                            >{{
                                                instructor.initials
                                            }}</AvatarFallback
                                        ></Avatar
                                    >
                                    <div>
                                        <h2 class="font-semibold">
                                            {{ instructor.name }}
                                        </h2>
                                        <p class="mt-1 text-sm text-slate-500">
                                            {{ instructor.headline }}
                                        </p>
                                    </div></a
                                >
                                <dl
                                    class="space-y-4 rounded-lg bg-slate-50 p-4 text-sm"
                                >
                                    <div>
                                        <dt class="text-slate-500">
                                            Expertise
                                        </dt>
                                        <dd class="mt-1">
                                            {{ instructor.stack }}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt class="text-slate-500">
                                            Languages
                                        </dt>
                                        <dd class="mt-1">
                                            {{
                                                instructor.languages.join(" & ")
                                            }}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt class="text-slate-500">
                                            Instructor timezone
                                        </dt>
                                        <dd class="mt-1">
                                            {{ instructor.timeZone }}
                                        </dd>
                                    </div>
                                </dl>
                                <div>
                                    <h2 class="font-semibold">
                                        What happens next
                                    </h2>
                                    <ol
                                        class="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-slate-600"
                                    >
                                        <li>
                                            The instructor reviews your
                                            questions.
                                        </li>
                                        <li>
                                            Agree on the appointment and scope.
                                        </li>
                                        <li>
                                            {{
                                                service.egp === 0
                                                    ? "Confirm the free appointment; no payment required."
                                                    : "Pay after the appointment is agreed."
                                            }}
                                        </li>
                                    </ol>
                                </div>
                                <p class="text-xs leading-6 text-slate-500">
                                    No course purchase or published course is
                                    required. There are no automatic booking
                                    slots.
                                </p></CardContent
                            ></Card
                        >
                    </aside>
                </div>
            </template>
            <div v-else class="rounded-lg border bg-white p-6">
                <h1 class="text-2xl font-semibold">Service not found</h1>
                <a
                    href="/instructors/ahmed-mansour"
                    class="mt-4 block text-teal-800"
                    >Back to Instructor</a
                >
            </div>
        </main>
        <MarketplaceFooter @preview="preview" />
        <Sheet v-model:open="sheetOpen"
            ><SheetContent class="overflow-y-auto bg-white text-slate-900"
                ><SheetHeader
                    ><SheetTitle>{{ sheetTitle }}</SheetTitle
                    ><SheetDescription>{{
                        draft
                            ? "Local preview only. Nothing has been sent or booked. Save in this tab to view request tracking."
                            : "This destination is not connected in this preview."
                    }}</SheetDescription></SheetHeader
                >
                <div v-if="draft && service" class="space-y-5 px-4 pb-6">
                    <p class="font-semibold">{{ service.title }}</p>
                    <dl class="space-y-4 text-sm">
                        <div>
                            <dt class="text-slate-500">Subject</dt>
                            <dd class="mt-1 break-words">
                                {{ draft.subject }}
                            </dd>
                        </div>
                        <div>
                            <dt class="text-slate-500">Context & Questions</dt>
                            <dd class="mt-1 break-words whitespace-pre-wrap">
                                {{ draft.context }}
                            </dd>
                        </div>
                        <div>
                            <dt class="text-slate-500">Preferred Time</dt>
                            <dd class="mt-1 break-words">
                                {{
                                    draft.preferredTime ||
                                    "Not specified — agree directly with the instructor"
                                }}
                            </dd>
                        </div>
                        <div>
                            <dt class="text-slate-500">Timezone</dt>
                            <dd class="mt-1">{{ draft.timeZone }}</dd>
                        </div>
                    </dl>
                    <p class="text-sm text-teal-800">
                        {{
                            service.egp === 0
                                ? "Free service — no payment required."
                                : "No payment required until the appointment is agreed."
                        }}
                    </p>
                    <Button variant="outline" @click="sheetOpen = false"
                        >Back to Edit</Button
                    >
                    <Button
                        class="bg-teal-700 text-white hover:bg-teal-800"
                        @click="trackRequest"
                        >Save Local Preview & Track</Button
                    >
                </div></SheetContent
            ></Sheet
        >
    </div>
</template>
<style scoped>
.request-page {
    font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
    color-scheme: light;
}
</style>
