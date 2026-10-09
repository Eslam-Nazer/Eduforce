<script setup lang="ts">
import { ref } from "vue";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { InstructorRequest } from "@/types/instructor-consultations";
const props = defineProps<{
    request: InstructorRequest;
    paid: boolean;
    durationMinutes: number;
}>();
const emit = defineEmits<{
    proposal: [text: string];
    meeting: [url: string];
    action: [action: "Completed" | "Cancelled" | "Rejected"];
}>();
const proposal = ref(props.request.proposal);
const link = ref(props.request.meetingUrl);
const error = ref("");
const active = () =>
    !["Completed", "Cancelled", "Rejected"].includes(props.request.status);
const canComplete = () =>
    props.request.status === "Confirmed" &&
    !!props.request.appointment &&
    Date.parse(props.request.appointment) + props.durationMinutes * 60000 <=
        Date.now();
function saveLink() {
    try {
        const url = new URL(link.value);
        if (url.protocol !== "https:") throw new Error();
        emit("meeting", url.href);
        error.value = "";
    } catch {
        error.value = "Enter a valid HTTPS meeting URL.";
    }
}
</script>
<template>
    <Card
        ><CardContent class="space-y-5 p-5"
            ><h2 class="text-lg font-semibold">Appointment & actions</h2>
            <p class="text-sm leading-6 text-slate-500">
                {{
                    paid && request.status === "Time Agreed"
                        ? "Awaiting student payment in this sample. This preview cannot confirm or charge the booking."
                        : paid
                          ? "Paid consultation sample. This preview processes no payments or settlement."
                          : "Free services skip payment. Confirmation requires both parties to agree on the appointment."
                }}
            </p>
            <template v-if="active()"
                ><form
                    class="space-y-3"
                    @submit.prevent="emit('proposal', proposal.trim())"
                >
                    <Label for="appointment-proposal"
                        >Propose another time</Label
                    ><Textarea
                        id="appointment-proposal"
                        v-model="proposal"
                        maxlength="200"
                        rows="3"
                        placeholder="Suggest a date, time and timezone"
                    /><Button
                        type="submit"
                        variant="outline"
                        :disabled="!proposal.trim()"
                        >Save local time proposal</Button
                    >
                    <p class="text-xs text-slate-500">
                        A proposal does not change the agreed appointment or
                        imply student acceptance.
                    </p>
                </form>
                <form
                    v-if="request.status === 'Confirmed'"
                    class="space-y-3 border-t pt-4"
                    @submit.prevent="saveLink"
                >
                    <Label for="instructor-meeting">External meeting URL</Label
                    ><Input
                        id="instructor-meeting"
                        v-model="link"
                        type="url"
                        maxlength="500"
                        placeholder="https://…"
                    />
                    <p v-if="error" role="alert" class="text-sm text-red-700">
                        {{ error }}
                    </p>
                    <Button type="submit" variant="outline"
                        >Save local meeting link</Button
                    >
                    <p class="text-xs text-slate-500">
                        Enter a link you already have. No room or invitation is
                        created or sent.
                    </p>
                </form>
                <div class="flex flex-wrap gap-3 border-t pt-4">
                    <Button
                        :disabled="!canComplete()"
                        class="bg-teal-700 text-white hover:bg-teal-800"
                        @click="emit('action', 'Completed')"
                        >Mark sample completed</Button
                    ><Button
                        variant="outline"
                        @click="emit('action', 'Cancelled')"
                        >Cancel sample appointment</Button
                    ><Button
                        v-if="
                            ['Requested', 'Discussing'].includes(request.status)
                        "
                        variant="outline"
                        class="text-red-700"
                        @click="emit('action', 'Rejected')"
                        >Reject sample request</Button
                    >
                </div>
                <p class="text-xs leading-5 text-slate-500">
                    Completion requires a confirmed sample after its
                    appointment. For paid consultations, refund eligibility
                    requires cancellation at least 24 hours before the agreed
                    appointment. Cancelling this sample issues no refund.
                </p></template
            >
            <p v-else class="text-sm text-slate-500">
                This sample request is closed. Actions are disabled.
            </p></CardContent
        ></Card
    >
</template>
