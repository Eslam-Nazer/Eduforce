<script setup lang="ts">
import { computed } from "vue";
import { ArrowRight, Clock, Info } from "@lucide/vue";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ConsultationService } from "@/types/instructor";
import type { Currency } from "@/types/course";
const props = defineProps<{
    service: ConsultationService;
    currency: Currency;
}>();
const emit = defineEmits<{ request: [] }>();
const free = computed(() => props.service.egp === 0);
const price = computed(() =>
    new Intl.NumberFormat("en-US").format(
        props.currency === "EGP" ? props.service.egp : props.service.sar,
    ),
);
</script>
<template>
    <Card class="border-slate-200 bg-white shadow-sm">
        <CardContent class="space-y-5 p-5 sm:p-6">
            <div class="rounded-lg bg-slate-50 p-4">
                <Badge variant="secondary" class="bg-teal-50 text-teal-800">{{
                    free ? "Free Service" : "Paid Service"
                }}</Badge>
                <p class="mt-3 text-4xl font-bold">
                    {{ free ? "Free" : price }}
                    <span v-if="!free" class="text-base font-medium">{{
                        currency
                    }}</span>
                </p>
                <p class="mt-3 flex items-center gap-2 text-sm text-slate-500">
                    <Clock class="size-4" aria-hidden="true" />{{
                        service.durationMinutes
                    }}
                    minute remote session
                </p>
            </div>
            <Button
                class="h-11 w-full bg-teal-700 text-white hover:bg-teal-800"
                @click="emit('request')"
                >Request Consultation<ArrowRight
                    class="size-4"
                    aria-hidden="true"
            /></Button>
            <div
                class="rounded-lg bg-teal-50 p-4 text-sm leading-6 text-teal-900"
            >
                <p class="flex items-center gap-2 font-semibold">
                    <Info class="size-4" aria-hidden="true" />{{
                        free ? "No payment required" : "No upfront payment"
                    }}
                </p>
                <p class="mt-2">
                    {{
                        free
                            ? "Agree on an appointment with the instructor. This service is free."
                            : "Payment follows agreement on the appointment and scope with the instructor."
                    }}
                </p>
            </div>
            <div
                v-if="!free"
                class="rounded-lg bg-slate-50 p-4 text-sm leading-6"
            >
                <h2 class="font-semibold">Cancellation & Refund Policy</h2>
                <p class="mt-2 text-slate-600">
                    Cancel at least 24 hours before the agreed appointment to be
                    eligible for a refund.
                </p>
            </div>
            <p class="text-xs leading-6 text-slate-500">
                Illustrative service data and sample EGP/SAR display prices.
            </p>
        </CardContent>
    </Card>
</template>
