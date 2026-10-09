<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sampleInstructorProfile } from "@/data/sample-instructor";
import type { ConsultationRequestPreview } from "@/types/instructor";
import type { Currency } from "@/types/course";
defineProps<{
    requests: ConsultationRequestPreview[];
    selectedId: string;
    currency: Currency;
}>();
const emit = defineEmits<{ select: [id: string] }>();
function service(id: string) {
    return sampleInstructorProfile.services.find((item) => item.id === id);
}
</script>
<template>
    <div class="space-y-3">
        <h2 class="text-lg font-semibold">Consultation Requests</h2>
        <p
            v-if="!requests.length"
            class="rounded-lg border bg-white p-5 text-sm text-slate-500"
        >
            No requests in this filter.
        </p>
        <Button
            v-for="request in requests"
            :key="request.id"
            variant="outline"
            as-child
            class="h-auto w-full flex-col items-stretch gap-3 rounded-xl border-slate-200 bg-white p-4 text-left whitespace-normal hover:bg-teal-50"
            :class="
                selectedId === request.id
                    ? 'border-teal-600 bg-teal-50 ring-1 ring-teal-600'
                    : ''
            "
            ><button
                type="button"
                :aria-pressed="selectedId === request.id"
                :aria-label="`View request: ${request.subject}`"
                @click="emit('select', request.id)"
            >
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <span class="font-semibold">{{
                        sampleInstructorProfile.name
                    }}</span
                    ><Badge variant="secondary">{{ request.status }}</Badge>
                </div>
                <span class="text-sm leading-6 font-semibold">{{
                    service(request.serviceId)?.title
                }}</span
                ><span class="text-xs leading-5 text-slate-500">{{
                    request.subject
                }}</span>
                <div class="flex flex-wrap justify-between gap-2 text-xs">
                    <span class="text-slate-500">{{
                        request.sample
                            ? "Sample scenario"
                            : "Your local preview"
                    }}</span
                    ><span class="font-semibold">{{
                        service(request.serviceId)?.egp === 0
                            ? "Free"
                            : `${currency === "EGP" ? service(request.serviceId)?.egp : service(request.serviceId)?.sar} ${currency}`
                    }}</span>
                </div>
            </button></Button
        >
    </div>
</template>
