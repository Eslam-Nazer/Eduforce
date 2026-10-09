<script setup lang="ts">
import { ref } from "vue";
import { Info } from "@lucide/vue";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { ConsultationRequestDraft } from "@/types/instructor";
defineProps<{ free: boolean; cancelHref: string }>();
const emit = defineEmits<{ submit: [draft: ConsultationRequestDraft] }>();
const subject = ref("");
const context = ref("");
const preferredTime = ref("");
const timeZone = ref<ConsultationRequestDraft["timeZone"]>("Africa/Cairo");
const errors = ref<{ subject?: string; context?: string }>({});
function submit() {
    errors.value = {};
    if (!subject.value.trim())
        errors.value.subject = "Enter a topic for your request.";
    if (!context.value.trim())
        errors.value.context = "Describe your questions and context.";
    if (Object.keys(errors.value).length) return;
    emit("submit", {
        subject: subject.value.trim(),
        context: context.value.trim(),
        preferredTime: preferredTime.value.trim(),
        timeZone: timeZone.value,
    });
}
</script>
<template>
    <form class="space-y-6" @submit.prevent="submit">
        <div class="space-y-2">
            <div class="flex items-center justify-between gap-3">
                <Label for="request-subject"
                    >Subject / Topic <span aria-hidden="true">*</span></Label
                ><span id="subject-count" class="text-xs text-slate-500"
                    >{{ subject.length }} / 100</span
                >
            </div>
            <Input
                id="request-subject"
                v-model="subject"
                required
                maxlength="100"
                placeholder="Summarize the focus of your consultation"
                :aria-invalid="!!errors.subject"
                aria-describedby="subject-count subject-error"
            />
            <p
                v-if="errors.subject"
                id="subject-error"
                role="alert"
                class="text-sm text-red-700"
            >
                {{ errors.subject }}
            </p>
        </div>
        <div class="space-y-2">
            <div class="flex items-center justify-between gap-3">
                <Label for="request-context"
                    >Context & Key Questions
                    <span aria-hidden="true">*</span></Label
                ><span id="context-count" class="text-xs text-slate-500"
                    >{{ context.length }} / 1200</span
                >
            </div>
            <Textarea
                id="request-context"
                v-model="context"
                required
                maxlength="1200"
                rows="7"
                placeholder="Describe your situation and the questions you would like to discuss"
                :aria-invalid="!!errors.context"
                aria-describedby="context-help context-count context-error"
            />
            <p id="context-help" class="text-xs leading-6 text-slate-500">
                Text only. Include relevant background or links in your
                description.
            </p>
            <p
                v-if="errors.context"
                id="context-error"
                role="alert"
                class="text-sm text-red-700"
            >
                {{ errors.context }}
            </p>
        </div>
        <div class="grid gap-5 sm:grid-cols-2">
            <div class="space-y-2">
                <Label for="preferred-time"
                    >Preferred Time Window (optional)</Label
                ><Input
                    id="preferred-time"
                    v-model="preferredTime"
                    maxlength="200"
                    placeholder="e.g. Weekday evenings, 18:00–21:00"
                    aria-describedby="time-help"
                />
                <p id="time-help" class="text-xs leading-6 text-slate-500">
                    Suggest alternatives; this does not reserve an appointment.
                </p>
            </div>
            <div class="space-y-2">
                <Label for="request-timezone">Your Timezone</Label
                ><Select v-model="timeZone"
                    ><SelectTrigger
                        id="request-timezone"
                        class="w-full"
                        aria-describedby="timezone-help"
                        ><SelectValue /></SelectTrigger
                    ><SelectContent
                        ><SelectItem value="Africa/Cairo"
                            >Cairo · Africa/Cairo</SelectItem
                        ><SelectItem value="Asia/Riyadh"
                            >Riyadh · Asia/Riyadh</SelectItem
                        ></SelectContent
                    ></Select
                >
                <p id="timezone-help" class="text-xs leading-6 text-slate-500">
                    Preferred times use this timezone. Confirm the final time
                    with the instructor.
                </p>
            </div>
        </div>
        <Alert class="border-teal-100 bg-teal-50"
            ><Info class="size-4" /><AlertTitle>{{
                free ? "Free consultation" : "No payment required now"
            }}</AlertTitle
            ><AlertDescription>{{
                free
                    ? "Agree on an appointment with the instructor. This service requires no payment."
                    : "Payment follows agreement on the appointment and scope with the instructor."
            }}</AlertDescription></Alert
        >
        <p class="text-xs leading-6 text-slate-500">
            This frontend preview sends nothing to the instructor and does not
            create a booking.
        </p>
        <div class="flex flex-wrap justify-end gap-3">
            <Button as-child variant="outline" class="h-11"
                ><a :href="cancelHref">Cancel</a></Button
            ><Button
                type="submit"
                class="h-11 bg-teal-700 text-white hover:bg-teal-800"
                >Preview Consultation Request</Button
            >
        </div>
    </form>
</template>
