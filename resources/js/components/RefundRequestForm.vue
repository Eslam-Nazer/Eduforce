<script setup lang="ts">
import { ref } from "vue";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import type { PurchaseTransaction, RefundDraft } from "@/types/purchase";
const props = defineProps<{
    transaction: PurchaseTransaction;
    eligible: boolean;
}>();
const emit = defineEmits<{ review: [draft: RefundDraft] }>();
const reason = ref("");
const details = ref("");
const acknowledged = ref(false);
function submit() {
    if (!props.eligible || !reason.value || !acknowledged.value) return;
    emit("review", {
        transactionId: props.transaction.id,
        reason: reason.value,
        details: details.value.trim(),
    });
}
</script>
<template>
    <form class="space-y-6" @submit.prevent="submit">
        <div class="space-y-2">
            <Label for="refund-reason">Reason for refund</Label
            ><Select v-model="reason" required
                ><SelectTrigger id="refund-reason" class="w-full"
                    ><SelectValue
                        placeholder="Choose a reason" /></SelectTrigger
                ><SelectContent
                    ><SelectItem
                        :value="
                            transaction.kind === 'course'
                                ? 'Course does not meet my needs'
                                : 'Unable to attend the appointment'
                        "
                        >{{
                            transaction.kind === "course"
                                ? "Course does not meet my needs"
                                : "Unable to attend the appointment"
                        }}</SelectItem
                    ><SelectItem value="Purchased by mistake"
                        >Purchased by mistake</SelectItem
                    ><SelectItem value="Other">Other</SelectItem></SelectContent
                ></Select
            >
        </div>
        <div class="space-y-2">
            <Label for="refund-details"
                >Additional details
                <span class="font-normal text-slate-400"
                    >(optional)</span
                ></Label
            ><Textarea
                id="refund-details"
                v-model="details"
                rows="4"
                maxlength="2000"
                placeholder="Tell us more about your request…"
            />
            <p class="text-right text-xs text-slate-400">
                {{ details.length }}/2000
            </p>
        </div>
        <div
            class="rounded-lg border border-teal-100 bg-teal-50 p-4 text-sm leading-6 text-teal-900"
        >
            <h3 class="font-semibold">Applicable refund policy</h3>
            <p class="mt-2">
                {{
                    transaction.kind === "course"
                        ? "Course refunds are eligible within 14 days from purchase and with no more than 3 completed videos. Completing the fourth video removes eligibility."
                        : "Paid consultation cancellation must be requested at least 24 hours before the agreed appointment."
                }}
            </p>
        </div>
        <div class="flex items-start gap-3">
            <Checkbox
                id="refund-policy"
                v-model="acknowledged"
                class="mt-1"
            /><Label for="refund-policy" class="font-normal leading-6"
                >I have read the applicable refund policy and understand that
                this is a local request preview.</Label
            >
        </div>
        <Button
            type="submit"
            :disabled="!eligible || !reason || !acknowledged"
            class="h-11 w-full bg-teal-700 text-white hover:bg-teal-800"
            >Review refund request</Button
        >
    </form>
</template>
