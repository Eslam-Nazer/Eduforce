<script setup lang="ts">
import { Head, router } from "@inertiajs/vue3";
import { computed, ref, reactive } from "vue";
import { Info } from "@lucide/vue";
import MarketplaceHeader from "@/components/MarketplaceHeader.vue";
import MarketplaceFooter from "@/components/MarketplaceFooter.vue";
import ConsultationRequestList from "@/components/ConsultationRequestList.vue";
import ConsultationDiscussion from "@/components/ConsultationDiscussion.vue";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sampleInstructorProfile } from "@/data/sample-instructor";
import { useInstructorServices } from "@/composables/useInstructorServices";
const { services: configuredServices } = useInstructorServices();
const instructor = reactive({
    ...sampleInstructorProfile,
    services: computed(() => [
        ...sampleInstructorProfile.services,
        ...configuredServices.value.filter(
            (item) =>
                !sampleInstructorProfile.services.some(
                    (original) => original.id === item.id,
                ),
        ),
    ]),
});
import { sampleConsultationRequests } from "@/data/sample-consultation-requests";
import { useConsultationPreview } from "@/composables/useConsultationPreview";
import type { Currency } from "@/types/course";
import type {
    ConsultationRequestPreview,
    ConsultationRequestStatus,
} from "@/types/instructor";
const { localRequests, storageNotice, addMessage } = useConsultationPreview();
const currency = ref<Currency>("EGP");
const filter = ref("All");
const requestedId =
    typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("request")
        : null;
const selectedId = ref(
    requestedId ?? localRequests.value[0]?.id ?? "sample-agreed",
);
const samples = ref(
    sampleConsultationRequests.map((item) => ({
        ...item,
        messages: [...item.messages],
    })),
);
const requests = computed(() => [...localRequests.value, ...samples.value]);
const closed = (status: ConsultationRequestStatus) =>
    ["Completed", "Cancelled", "Rejected"].includes(status);
function matches(item: ConsultationRequestPreview, value: string) {
    return (
        value === "All" ||
        (value === "Active" ? !closed(item.status) : item.status === value)
    );
}
const filters = ["All", "Active", "Completed", "Cancelled", "Rejected"];
const visibleRequests = computed(() =>
    requests.value.filter((item) => matches(item, filter.value)),
);
const selected = computed(
    () =>
        visibleRequests.value.find((item) => item.id === selectedId.value) ??
        visibleRequests.value[0],
);
const service = computed(() =>
    instructor.services.find((item) => item.id === selected.value?.serviceId),
);
const free = computed(() => service.value?.egp === 0);
const steps = computed(() => [
    "Requested",
    "Discussing",
    "Time Agreed",
    ...(!free.value ? ["Payment"] : []),
    "Confirmed",
    "Completed",
]);
const currentStep = computed(() =>
    selected.value ? steps.value.indexOf(selected.value.status) : -1,
);
const appointment = computed(() =>
    selected.value?.appointment
        ? new Intl.DateTimeFormat("en-GB", {
              dateStyle: "full",
              timeStyle: "short",
              timeZone: selected.value.timeZone,
          }).format(new Date(selected.value.appointment))
        : null,
);
const sheetOpen = ref(false);
const sheetTitle = ref("");
const proposalOpen = ref(false);
const proposal = ref("");
const proposalNotice = ref("");
function preview(title: string) {
    proposalOpen.value = false;
    sheetTitle.value = title;
    sheetOpen.value = true;
}
function message(text: string) {
    if (!selected.value || closed(selected.value.status)) return;
    if (!selected.value.sample) addMessage(selected.value.id, text);
    else selected.value.messages.push({ id: `preview-${Date.now()}`, text });
}
function proposeTime() {
    proposal.value = "";
    proposalNotice.value = "";
    proposalOpen.value = true;
    sheetTitle.value = "Propose a New Time";
    sheetOpen.value = true;
}
function saveProposal() {
    if (!proposal.value.trim()) return;
    message(
        `Preferred time proposal (${selected.value?.timeZone}): ${proposal.value.trim()}`,
    );
    proposalNotice.value =
        "Time proposal added locally. The appointment and request status have not changed.";
}
</script>
<template>
    <Head title="Consultation Requests" />
    <div class="tracking-page min-h-screen bg-slate-50 text-slate-900">
        <MarketplaceHeader
            v-model:currency="currency"
            account-name="Kareem Tarek"
            @browse="router.visit('/')"
            @preview="preview"
        />
        <main class="mx-auto max-w-7xl space-y-6 px-5 py-8 sm:px-8">
            <nav
                aria-label="Breadcrumb"
                class="flex gap-2 text-sm text-slate-500"
            >
                <a href="/" class="text-teal-800">Home</a><span>/</span
                ><span aria-current="page">Consultation Requests</span>
            </nav>
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 class="text-3xl font-bold">
                        Consultation Bookings & Inquiries
                    </h1>
                    <p class="mt-3 text-sm leading-6 text-slate-600">
                        Follow request previews, appointment agreement and next
                        steps.
                    </p>
                </div>
                <Button variant="outline" @click="preview('Booking Guide')"
                    >Booking Guide</Button
                >
            </div>
            <Alert class="border-teal-100 bg-teal-50"
                ><Info class="size-4" /><AlertTitle>Local preview</AlertTitle
                ><AlertDescription
                    >Your requests and messages are stored in this tab only.
                    Sample scenarios are labeled separately. Nothing is sent,
                    booked or paid.</AlertDescription
                ></Alert
            >
            <p
                v-if="storageNotice"
                role="status"
                class="text-sm text-amber-800"
            >
                {{ storageNotice }}
            </p>
            <Tabs v-model="filter"
                ><TabsList class="h-auto flex-wrap justify-start"
                    ><TabsTrigger
                        v-for="value in filters"
                        :key="value"
                        :value="value"
                        >{{ value }} ({{
                            requests.filter((item) => matches(item, value))
                                .length
                        }})</TabsTrigger
                    ></TabsList
                ></Tabs
            >
            <div
                class="grid items-start gap-6 lg:grid-cols-[320px_minmax(0,1fr)]"
            >
                <ConsultationRequestList
                    :requests="visibleRequests"
                    :selected-id="selected?.id ?? ''"
                    :currency="currency"
                    @select="selectedId = $event"
                />
                <div v-if="selected && service" class="min-w-0 space-y-6">
                    <Card class="border-slate-200 bg-white shadow-sm"
                        ><CardContent class="space-y-6 p-5 sm:p-6">
                            <div class="flex flex-wrap justify-between gap-4">
                                <div class="min-w-0">
                                    <Badge variant="secondary">{{
                                        selected.sample
                                            ? "Sample scenario"
                                            : "Your local request preview"
                                    }}</Badge>
                                    <h2 class="mt-3 text-xl font-semibold">
                                        {{ service.title }}
                                    </h2>
                                    <a
                                        href="/instructors/ahmed-mansour"
                                        class="mt-2 block text-sm text-teal-800"
                                        >{{ instructor.name }}</a
                                    >
                                </div>
                                <div>
                                    <p class="text-xs text-slate-500">
                                        {{
                                            free ? "Free service" : "Total fee"
                                        }}
                                    </p>
                                    <p class="mt-1 text-xl font-semibold">
                                        {{
                                            free
                                                ? "Free"
                                                : `${currency === "EGP" ? service.egp : service.sar} ${currency}`
                                        }}
                                    </p>
                                    <p class="mt-1 text-xs text-slate-500">
                                        {{ service.durationMinutes }} minutes
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p class="text-sm font-semibold">
                                    Booking Lifecycle · {{ selected.status }}
                                </p>
                                <ol
                                    v-if="
                                        !['Rejected', 'Cancelled'].includes(
                                            selected.status,
                                        )
                                    "
                                    class="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3"
                                >
                                    <li
                                        v-for="(step, index) in steps"
                                        :key="step"
                                        :aria-current="
                                            index === currentStep
                                                ? 'step'
                                                : undefined
                                        "
                                        class="rounded-lg bg-slate-50 p-3 text-xs"
                                        :class="
                                            index <= currentStep
                                                ? 'bg-teal-50 font-semibold text-teal-800'
                                                : 'text-slate-500'
                                        "
                                    >
                                        {{ index + 1 }}. {{ step }}
                                    </li>
                                </ol>
                                <p v-else class="mt-3 text-sm text-slate-500">
                                    This request is
                                    {{ selected.status.toLowerCase() }}. No
                                    payment or appointment action is available.
                                </p>
                            </div>
                            <dl
                                class="space-y-4 rounded-lg bg-slate-50 p-4 text-sm"
                            >
                                <div>
                                    <dt class="font-semibold">
                                        {{
                                            appointment
                                                ? "Appointment"
                                                : "Appointment not agreed"
                                        }}
                                    </dt>
                                    <dd class="mt-2 leading-6">
                                        {{
                                            appointment ??
                                            "Discuss preferred times with the instructor. A proposal does not confirm a booking."
                                        }}
                                    </dd>
                                    <dd class="mt-1 text-xs text-slate-500">
                                        Timezone: {{ selected.timeZone
                                        }}{{
                                            selected.sample && appointment
                                                ? " · Illustrative appointment"
                                                : ""
                                        }}
                                    </dd>
                                </div>
                                <div>
                                    <dt class="font-semibold">Request topic</dt>
                                    <dd class="mt-1 break-words">
                                        {{ selected.subject }}
                                    </dd>
                                </div>
                                <div>
                                    <dt class="font-semibold">
                                        Context & Questions
                                    </dt>
                                    <dd
                                        class="mt-1 leading-6 break-words whitespace-pre-wrap"
                                    >
                                        {{ selected.context }}
                                    </dd>
                                </div>
                                <div v-if="selected.preferredTime">
                                    <dt class="font-semibold">
                                        Original preferred times
                                    </dt>
                                    <dd class="mt-1 break-words">
                                        {{ selected.preferredTime }}
                                    </dd>
                                </div>
                            </dl>
                            <p
                                v-if="selected.status === 'Time Agreed'"
                                class="text-sm leading-6 text-teal-800"
                            >
                                {{
                                    free
                                        ? "Free services skip payment after appointment agreement."
                                        : "The appointment is agreed in this sample. Payment is the next step."
                                }}
                            </p>
                            <p
                                v-if="selected.status === 'Confirmed'"
                                class="text-sm leading-6 text-teal-800"
                            >
                                {{
                                    free
                                        ? "This sample free appointment is confirmed; no payment is required."
                                        : "This sample appointment is confirmed."
                                }}
                            </p>
                            <div class="flex flex-wrap gap-3">
                                <Button
                                    v-if="
                                        !free &&
                                        selected.status === 'Time Agreed'
                                    "
                                    class="bg-teal-700 text-white hover:bg-teal-800"
                                    @click="
                                        router.visit(
                                            `/consultations/checkout?request=${encodeURIComponent(selected.id)}`,
                                        )
                                    "
                                    >Pay Consultation ({{
                                        currency === "EGP"
                                            ? service.egp
                                            : service.sar
                                    }}
                                    {{ currency }})</Button
                                ><Button
                                    v-if="!closed(selected.status)"
                                    variant="outline"
                                    @click="proposeTime"
                                    >Propose New Time</Button
                                >
                            </div>
                            <p
                                v-if="selected.status === 'Confirmed'"
                                class="text-sm text-slate-500"
                            >
                                No meeting link has been supplied in this
                                preview. The session uses an external meeting
                                tool.
                            </p>
                            <p
                                v-if="!free && !closed(selected.status)"
                                class="text-xs leading-6 text-slate-500"
                            >
                                Refund eligibility requires cancellation at
                                least 24 hours before the agreed appointment.
                            </p>
                        </CardContent></Card
                    >
                    <ConsultationDiscussion
                        :key="selected.id"
                        :messages="selected.messages"
                        :active="!closed(selected.status)"
                        @message="message"
                    />
                </div>
                <div
                    v-else
                    class="rounded-lg border bg-white p-6 text-sm text-slate-500"
                >
                    Select another filter to view request details.
                </div>
            </div>
        </main>
        <MarketplaceFooter @preview="preview" />
        <Sheet v-model:open="sheetOpen"
            ><SheetContent class="overflow-y-auto bg-white text-slate-900"
                ><SheetHeader
                    ><SheetTitle>{{ sheetTitle }}</SheetTitle
                    ><SheetDescription>{{
                        proposalOpen
                            ? "A local proposal does not change the agreed appointment or imply instructor approval."
                            : sheetTitle === "Consultation Checkout"
                              ? "Checkout is the next screen, 04.05. No payment is collected here."
                              : "Submit a request, agree on a time, then pay if the service is paid. Free services skip payment. Meetings use an external tool."
                    }}</SheetDescription></SheetHeader
                >
                <form
                    v-if="proposalOpen"
                    class="space-y-4 px-4 pb-6"
                    @submit.prevent="saveProposal"
                >
                    <Label for="new-time">Preferred Time Proposal</Label
                    ><Input
                        id="new-time"
                        v-model="proposal"
                        required
                        maxlength="200"
                        placeholder="Suggest a date and time window"
                    />
                    <p class="text-xs text-slate-500">
                        Timezone: {{ selected?.timeZone }}
                    </p>
                    <Button
                        :disabled="!proposal.trim() || !!proposalNotice"
                        class="bg-teal-700 text-white hover:bg-teal-800"
                        type="submit"
                        >Preview Time Proposal</Button
                    >
                    <p
                        v-if="proposalNotice"
                        role="status"
                        class="text-sm leading-6 text-teal-800"
                    >
                        {{ proposalNotice }}
                    </p>
                </form></SheetContent
            ></Sheet
        >
    </div>
</template>
<style scoped>
.tracking-page {
    font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
    color-scheme: light;
}
</style>
