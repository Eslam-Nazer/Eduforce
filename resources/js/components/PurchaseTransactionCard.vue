<script setup lang="ts">
import { computed } from "vue";
import { BookOpen, Calendar, FileText, RotateCcw } from "@lucide/vue";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    formatPurchaseAmount,
    refundEligibility,
} from "@/composables/usePurchasePreview";
import type { PurchaseTransaction } from "@/types/purchase";
const props = defineProps<{ transaction: PurchaseTransaction; now: number }>();
const emit = defineEmits<{ receipt: [transaction: PurchaseTransaction] }>();
const eligibility = computed(() =>
    refundEligibility(props.transaction, props.now),
);
const date = (value: string) =>
    new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeZone: "Africa/Cairo",
    }).format(new Date(value));
</script>
<template>
    <Card class="border-slate-200 bg-white shadow-sm"
        ><CardContent class="p-5 sm:p-6">
            <div class="flex flex-wrap items-start gap-5">
                <div
                    class="flex size-14 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700"
                >
                    <BookOpen
                        v-if="transaction.kind === 'course'"
                        class="size-6"
                    /><Calendar v-else class="size-6" />
                </div>
                <div class="min-w-0 flex-1">
                    <div class="flex flex-wrap gap-2">
                        <Badge variant="secondary">{{
                            transaction.kind === "course"
                                ? "Course"
                                : "Consultation"
                        }}</Badge
                        ><Badge variant="outline">{{
                            transaction.amount
                                ? "Paid · sample"
                                : "Free service"
                        }}</Badge>
                    </div>
                    <h2 class="mt-3 text-lg font-semibold leading-7">
                        {{ transaction.title }}
                    </h2>
                    <p class="mt-1 text-sm text-slate-500">
                        {{ transaction.instructor }}
                    </p>
                </div>
                <div class="text-right">
                    <p class="text-xl font-bold">
                        {{ formatPurchaseAmount(transaction) }}
                    </p>
                    <p class="mt-2 text-xs text-slate-500">
                        {{ date(transaction.purchasedAt) }}
                    </p>
                </div>
            </div>
            <dl
                class="mt-5 grid gap-4 rounded-lg bg-slate-50 p-4 text-sm sm:grid-cols-3"
            >
                <div>
                    <dt class="text-xs text-slate-500">Reference</dt>
                    <dd class="mt-1 font-medium">
                        {{ transaction.reference }}
                    </dd>
                </div>
                <div>
                    <dt class="text-xs text-slate-500">
                        {{
                            transaction.kind === "course"
                                ? "Learning progress"
                                : "Appointment · Cairo"
                        }}
                    </dt>
                    <dd class="mt-1">
                        {{
                            transaction.kind === "course"
                                ? `${transaction.completedVideos} of ${transaction.totalVideos} videos completed`
                                : `${date(transaction.appointment)} · ${transaction.durationMinutes} min`
                        }}
                    </dd>
                </div>
                <div>
                    <dt class="text-xs text-slate-500">
                        {{
                            transaction.kind === "course" ? "Access" : "Status"
                        }}
                    </dt>
                    <dd class="mt-1">
                        {{
                            transaction.kind === "course"
                                ? "Purchased course preview"
                                : transaction.status
                        }}
                    </dd>
                </div>
            </dl>
            <div class="mt-5 flex flex-wrap items-center justify-between gap-4">
                <div class="flex flex-wrap gap-2">
                    <Button
                        v-if="transaction.amount > 0"
                        variant="outline"
                        @click="emit('receipt', transaction)"
                        ><FileText class="size-4" />View receipt</Button
                    ><Button
                        v-if="eligibility.eligible"
                        as-child
                        variant="outline"
                        class="text-teal-800"
                        ><a
                            :href="`/refunds/request?transaction=${encodeURIComponent(transaction.id)}`"
                            ><RotateCcw class="size-4" />Request refund</a
                        ></Button
                    ><Button as-child variant="ghost"
                        ><a
                            :href="
                                transaction.kind === 'course'
                                    ? '/my-courses/full-stack'
                                    : '/consultations/requests'
                            "
                            >{{
                                transaction.kind === "course"
                                    ? "Continue learning"
                                    : "View consultation"
                            }}</a
                        ></Button
                    >
                </div>
                <Badge
                    :variant="eligibility.eligible ? 'secondary' : 'outline'"
                    :class="
                        eligibility.eligible
                            ? 'bg-teal-50 text-teal-800'
                            : 'text-slate-500'
                    "
                    >{{
                        eligibility.eligible
                            ? "Refund eligible"
                            : transaction.amount
                              ? "Not eligible for refund"
                              : "No payment"
                    }}</Badge
                >
            </div>
            <p class="mt-3 text-xs leading-5 text-slate-500">
                {{ eligibility.reason }}
            </p>
        </CardContent></Card
    >
</template>
