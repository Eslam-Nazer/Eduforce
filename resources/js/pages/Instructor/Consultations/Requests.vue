<script setup lang="ts">
import { computed, ref } from "vue";
import InstructorLayout from "@/layouts/InstructorLayout.vue";
import InstructorAppointmentControls from "@/components/InstructorAppointmentControls.vue";
import ConsultationDiscussion from "@/components/ConsultationDiscussion.vue";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { sampleConsultationRequests } from "@/data/sample-consultation-requests";
import { sampleInstructorProfile } from "@/data/sample-instructor";
import type { InstructorRequest } from "@/types/instructor-consultations";
const requests = ref<InstructorRequest[]>(
    sampleConsultationRequests.map((item, index) => ({
        ...item,
        messages: [],
        learner: index === 2 ? "Sarah Al-Otaibi" : "Kareem Tarek",
        meetingUrl: "",
        proposal: "",
    })),
);
requests.value.push({
    ...sampleConsultationRequests[0]!,
    id: "sample-ready",
    status: "Confirmed",
    appointment: "2026-10-08T15:00:00Z",
    messages: [],
    learner: "Omar Hassan",
    meetingUrl: "",
    proposal: "",
});
const filter = ref("All");
const selectedId = ref("sample-agreed");
const notice = ref("");
const confirmOpen = ref(false);
const pending = ref<{
    id: string;
    action: "Completed" | "Cancelled" | "Rejected";
} | null>(null);
const closed = (item: InstructorRequest) =>
    ["Completed", "Cancelled", "Rejected"].includes(item.status);
const visible = computed(() =>
    requests.value.filter(
        (item) =>
            filter.value === "All" ||
            (filter.value === "Needs response"
                ? ["Requested", "Discussing"].includes(item.status)
                : filter.value === "Confirmed"
                  ? item.status === "Confirmed"
                  : filter.value === "Closed"
                    ? closed(item)
                    : item.status === "Completed"),
    ),
);
const selected = computed(
    () =>
        visible.value.find((item) => item.id === selectedId.value) ??
        visible.value[0],
);
const service = computed(() =>
    sampleInstructorProfile.services.find(
        (item) => item.id === selected.value?.serviceId,
    ),
);
const steps = computed(() => [
    "Requested",
    "Discussing",
    "Time Agreed",
    ...(service.value?.egp ? ["Payment"] : []),
    "Confirmed",
    "Completed",
]);
const currentStep = computed(() =>
    selected.value?.status === "Time Agreed" && service.value?.egp
        ? 3
        : steps.value.indexOf(selected.value?.status ?? ""),
);
const appointment = (item: InstructorRequest) =>
    item.appointment
        ? new Intl.DateTimeFormat("en-GB", {
              dateStyle: "medium",
              timeStyle: "short",
              timeZone: item.timeZone,
          }).format(new Date(item.appointment))
        : "No agreed appointment";
function message(text: string) {
    const item = selected.value;
    if (item && !closed(item))
        item.messages.push({
            id: `message-${Date.now()}-${item.messages.length}`,
            text,
        });
}
function proposal(text: string) {
    if (selected.value && !closed(selected.value)) {
        selected.value.proposal = text;
        message(`Time proposal: ${text}`);
        notice.value =
            "Local proposal saved. Appointment and status unchanged.";
    }
}
function meeting(url: string) {
    if (selected.value?.status === "Confirmed") {
        selected.value.meetingUrl = url;
        notice.value = "Meeting URL saved to this page only. Nothing sent.";
    }
}
function ask(action: "Completed" | "Cancelled" | "Rejected") {
    if (selected.value) {
        pending.value = { id: selected.value.id, action };
        confirmOpen.value = true;
    }
}
function apply() {
    const action = pending.value;
    const item = requests.value.find((item) => item.id === action?.id);
    if (!item || !action || closed(item)) return;
    if (
        action.action === "Completed" &&
        (item.status !== "Confirmed" ||
            !item.appointment ||
            Date.parse(item.appointment) +
                (sampleInstructorProfile.services.find(
                    (service) => service.id === item.serviceId,
                )?.durationMinutes ?? 60) *
                    60000 >
                Date.now())
    )
        return;
    if (
        action.action === "Rejected" &&
        !["Requested", "Discussing"].includes(item.status)
    )
        return;
    item.status = action.action;
    notice.value =
        "Sample status updated on this page only. No booking, refund or message transmitted.";
    pending.value = null;
}
</script>
<template>
    <InstructorLayout
        title="Consultation Requests & Bookings"
        active="requests"
        description="Coordinate sample requests and review agreed appointments."
        ><p class="rounded-lg bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            Independent instructor scenarios. Edits reset on page navigation and
            do not change student requests, payments or bookings.
        </p>
        <Tabs v-model="filter"
            ><TabsList class="h-auto flex-wrap"
                ><TabsTrigger
                    v-for="item in [
                        'All',
                        'Needs response',
                        'Confirmed',
                        'Completed',
                        'Closed',
                    ]"
                    :key="item"
                    :value="item"
                    >{{ item }}</TabsTrigger
                ></TabsList
            ></Tabs
        >
        <p v-if="notice" role="status" class="text-sm text-teal-800">
            {{ notice }}
        </p>
        <div
            class="grid min-w-0 gap-6 lg:grid-cols-[minmax(240px,0.8fr)_minmax(0,1.5fr)]"
        >
            <div class="space-y-3">
                <h2 class="font-semibold">
                    Sample requests · {{ visible.length }}
                </h2>
                <Button
                    v-for="item in visible"
                    :key="item.id"
                    as-child
                    variant="ghost"
                    class="h-auto w-full justify-start rounded-xl border bg-white p-4 text-left whitespace-normal"
                    :class="
                        selected?.id === item.id
                            ? 'border-teal-600 ring-1 ring-teal-600'
                            : 'border-slate-200'
                    "
                    ><button
                        type="button"
                        :aria-pressed="selected?.id === item.id"
                        @click="selectedId = item.id"
                    >
                        <span class="block w-full space-y-2"
                            ><span class="block font-semibold">{{
                                item.learner
                            }}</span
                            ><span class="block text-xs text-slate-500">{{
                                sampleInstructorProfile.services.find(
                                    (service) => service.id === item.serviceId,
                                )?.title
                            }}</span
                            ><Badge variant="secondary">{{ item.status }}</Badge
                            ><span class="block text-xs text-slate-500"
                                >{{ appointment(item) }} ·
                                {{ item.timeZone }}</span
                            ></span
                        >
                    </button></Button
                >
                <p v-if="!visible.length" class="text-sm text-slate-500">
                    No sample requests match this filter.
                </p>
                <div
                    class="rounded-lg bg-teal-50 p-4 text-xs leading-6 text-teal-900"
                >
                    Paid consultations proceed to student payment after mutual
                    agreement. Free consultations skip payment. No automatic
                    slots or checkout deadline.
                </div>
            </div>
            <div v-if="selected && service" class="min-w-0 space-y-5">
                <Card
                    ><CardContent class="space-y-4 p-5"
                        ><p class="text-xs text-slate-500">
                            SAMPLE REQUEST · {{ selected.id }}
                        </p>
                        <h2 class="text-xl font-semibold">
                            {{ service.title }}
                        </h2>
                        <p class="text-sm">Learner: {{ selected.learner }}</p>
                        <Badge>{{
                            service.egp ? `${service.egp} EGP` : "Free session"
                        }}</Badge>
                        <p class="text-sm text-slate-500">
                            {{ service.durationMinutes }} minutes ·
                            {{ selected.timeZone }} · External meeting tool
                        </p>
                        <div class="rounded-lg bg-slate-50 p-4">
                            <h3 class="font-semibold">
                                {{ selected.subject }}
                            </h3>
                            <p class="mt-2 text-sm leading-6">
                                {{ selected.context }}
                            </p>
                        </div>
                        <div class="overflow-x-auto rounded-lg bg-teal-50 p-4">
                            <ol
                                class="flex min-w-max items-center gap-3"
                                aria-label="Request lifecycle"
                            >
                                <li
                                    v-for="(step, index) in steps"
                                    :key="step"
                                    class="flex items-center gap-2 text-xs"
                                    :aria-current="
                                        index === currentStep
                                            ? 'step'
                                            : undefined
                                    "
                                >
                                    <span
                                        class="flex size-7 items-center justify-center rounded-full"
                                        :class="
                                            index <= currentStep &&
                                            !['Rejected', 'Cancelled'].includes(
                                                selected.status,
                                            )
                                                ? 'bg-teal-700 text-white'
                                                : 'bg-slate-200 text-slate-600'
                                        "
                                        >{{ index + 1 }}</span
                                    >{{ step
                                    }}<span
                                        v-if="index < steps.length - 1"
                                        aria-hidden="true"
                                        >→</span
                                    >
                                </li>
                            </ol>
                        </div>
                        <p
                            v-if="closed(selected)"
                            class="text-sm font-semibold"
                        >
                            {{ selected.status }}
                        </p>
                        <div class="rounded-lg border p-4 text-sm">
                            <p class="font-semibold">
                                {{ appointment(selected) }}
                            </p>
                            <p class="mt-1 text-slate-500">
                                {{ selected.timeZone }}
                            </p>
                            <p
                                v-if="selected.meetingUrl"
                                class="mt-3 break-all"
                            >
                                Local meeting URL: {{ selected.meetingUrl }}
                            </p>
                            <p v-else class="mt-3 text-xs text-slate-500">
                                No meeting link has been provided.
                            </p>
                        </div></CardContent
                    ></Card
                ><ConsultationDiscussion
                    :key="selected.id"
                    :messages="selected.messages"
                    :active="!closed(selected)"
                    composer-label="Message to learner"
                    message-label="Instructor local preview"
                    description="Text previews stay on this page. Nothing is sent to the learner."
                    @message="message"
                /><InstructorAppointmentControls
                    :key="selected.id"
                    :request="selected"
                    :paid="service.egp > 0"
                    :duration-minutes="service.durationMinutes"
                    @proposal="proposal"
                    @meeting="meeting"
                    @action="ask"
                />
            </div>
        </div>
        <AlertDialog v-model:open="confirmOpen"
            ><AlertDialogContent
                ><AlertDialogHeader
                    ><AlertDialogTitle
                        >Update this sample to
                        {{ pending?.action }}?</AlertDialogTitle
                    ><AlertDialogDescription
                        >This changes only the instructor demonstration on this
                        page. No student request, payment or refund is
                        affected.</AlertDialogDescription
                    ></AlertDialogHeader
                ><AlertDialogFooter
                    ><AlertDialogCancel>Keep current state</AlertDialogCancel
                    ><AlertDialogAction @click="apply"
                        >Update sample</AlertDialogAction
                    ></AlertDialogFooter
                ></AlertDialogContent
            ></AlertDialog
        ></InstructorLayout
    >
</template>
