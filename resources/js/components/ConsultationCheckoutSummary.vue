<script setup lang="ts">
import { computed } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { sampleInstructorProfile as instructor } from "@/data/sample-instructor";
import type {
    ConsultationRequestPreview,
    ConsultationService,
} from "@/types/instructor";
import type { Currency } from "@/types/course";
const props = defineProps<{
    request: ConsultationRequestPreview;
    service: ConsultationService;
    currency: Currency;
    chargeCurrency: Currency;
    chargeAmount: number;
}>();
const appointment = computed(() =>
    props.request.appointment
        ? new Intl.DateTimeFormat("en-GB", {
              dateStyle: "full",
              timeStyle: "short",
              timeZone: props.request.timeZone,
          }).format(new Date(props.request.appointment))
        : "No appointment agreed",
);
</script>
<template>
    <Card class="border-slate-200 bg-white shadow-sm"
        ><CardHeader class="border-b border-slate-100"
            ><p class="text-xs tracking-wide text-slate-500">
                RESERVATION SUMMARY
            </p>
            <CardTitle class="text-lg">1-on-1 Consultation</CardTitle
            ><Badge variant="secondary" class="w-fit">{{
                request.sample ? "Sample scenario" : "Local preview"
            }}</Badge></CardHeader
        ><CardContent class="space-y-6 p-5 sm:p-6">
            <a href="/instructors/ahmed-mansour" class="flex items-center gap-3"
                ><Avatar
                    ><AvatarFallback class="bg-teal-50 text-teal-800">{{
                        instructor.initials
                    }}</AvatarFallback></Avatar
                >
                <div>
                    <p class="font-semibold">{{ instructor.name }}</p>
                    <p class="mt-1 text-xs leading-5 text-slate-500">
                        {{ instructor.headline }}
                    </p>
                </div></a
            >
            <div class="rounded-lg bg-slate-50 p-4">
                <p class="text-xs font-semibold text-slate-500">
                    SERVICE REQUESTED
                </p>
                <h2 class="mt-2 text-sm font-semibold">{{ service.title }}</h2>
                <p class="mt-2 text-xs leading-6 text-slate-600">
                    {{ service.description }}
                </p>
            </div>
            <dl class="space-y-4 text-sm">
                <div>
                    <dt class="text-slate-500">Agreed Appointment</dt>
                    <dd class="mt-1 leading-6 font-medium">
                        {{ appointment }}
                    </dd>
                    <dd class="mt-1 text-xs text-slate-500">
                        {{ request.timeZone }} · Illustrative appointment
                    </dd>
                </div>
                <div>
                    <dt class="text-slate-500">Duration</dt>
                    <dd class="mt-1">{{ service.durationMinutes }} minutes</dd>
                </div>
                <div>
                    <dt class="text-slate-500">Delivery</dt>
                    <dd class="mt-1">
                        Remote consultation using an external meeting tool
                    </dd>
                </div>
            </dl>
            <div class="rounded-lg bg-teal-50 p-4">
                <div class="flex justify-between gap-4 text-sm">
                    <span>Sample display price</span
                    ><span class="font-semibold"
                        >{{ currency === "EGP" ? service.egp : service.sar }}
                        {{ currency }}</span
                    >
                </div>
                <div
                    class="mt-4 flex justify-between gap-4 border-t border-teal-100 pt-4"
                >
                    <span class="text-sm font-semibold">Sample charge</span
                    ><span class="text-xl font-bold text-teal-800"
                        >{{ chargeAmount }} {{ chargeCurrency }}</span
                    >
                </div>
                <p class="mt-3 text-xs leading-6 text-slate-500">
                    The billing country determines this preview charge. Provider
                    pricing and fees are not connected.
                </p>
            </div>
            <Button
                as-child
                variant="outline"
                class="h-auto w-full py-3 whitespace-normal"
                ><a
                    :href="`/consultations/requests?request=${encodeURIComponent(request.id)}`"
                    >Back to Request Details</a
                ></Button
            >
        </CardContent></Card
    >
</template>
