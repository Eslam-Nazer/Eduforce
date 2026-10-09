<script setup lang="ts">
import { reactive, ref } from "vue";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { InstructorService } from "@/types/instructor-consultations";
const props = defineProps<{ service: InstructorService }>();
const emit = defineEmits<{ save: [service: InstructorService]; cancel: [] }>();
const draft = reactive({ ...props.service, scope: [...props.service.scope] });
const pricing = ref(props.service.basePrice === 0 ? "free" : "paid");
const duration = ref(String(draft.durationMinutes));
const error = ref("");
function submit() {
    const price = pricing.value === "free" ? 0 : Number(draft.basePrice);
    if (
        !draft.title.trim() ||
        !draft.description.trim() ||
        !Number.isFinite(price) ||
        (pricing.value === "paid" && price <= 0) ||
        price > 1000000
    ) {
        error.value = "Enter a title, scope and a valid positive paid price.";
        return;
    }
    const egp =
        draft.baseCurrency === "EGP"
            ? price
            : price === 0
              ? 0
              : Math.max(0.01, Math.round(((price * 850) / 105) * 100) / 100);
    const sar =
        draft.baseCurrency === "SAR"
            ? price
            : price === 0
              ? 0
              : Math.max(0.01, Math.round(((price * 105) / 850) * 100) / 100);
    emit("save", {
        ...draft,
        title: draft.title.trim(),
        description: draft.description.trim(),
        scope: draft.scope.length
            ? [...draft.scope]
            : draft.description.trim().split("\n").filter(Boolean),
        durationMinutes: Number(duration.value),
        basePrice: price,
        egp,
        sar,
    });
}
</script>
<template>
    <Card class="border-teal-100"
        ><CardContent class="p-5"
            ><div class="mb-5 flex items-center justify-between">
                <h2 class="font-semibold">
                    Create / Edit Consultation Service
                </h2>
                <Button variant="ghost" size="sm" @click="emit('cancel')"
                    >Close</Button
                >
            </div>
            <form class="space-y-5" @submit.prevent="submit">
                <div class="space-y-2">
                    <Label for="service-title">Service title</Label
                    ><Input
                        id="service-title"
                        v-model="draft.title"
                        required
                        maxlength="100"
                    />
                </div>
                <div class="space-y-2">
                    <Label for="service-scope">Topic & scope</Label
                    ><Textarea
                        id="service-scope"
                        v-model="draft.description"
                        required
                        maxlength="1200"
                        rows="5"
                    />
                    <p class="text-xs text-slate-500">
                        Describe what the session covers and any boundaries.
                    </p>
                </div>
                <div class="space-y-2">
                    <Label for="service-duration">Indicative duration</Label
                    ><Select v-model="duration"
                        ><SelectTrigger id="service-duration"
                            ><SelectValue /></SelectTrigger
                        ><SelectContent
                            ><SelectItem
                                v-for="minutes in [30, 45, 60, 90]"
                                :key="minutes"
                                :value="String(minutes)"
                                >{{ minutes }} minutes</SelectItem
                            ></SelectContent
                        ></Select
                    >
                </div>
                <fieldset class="space-y-3">
                    <legend class="text-sm font-medium">Pricing type</legend>
                    <RadioGroup v-model="pricing" class="grid grid-cols-2"
                        ><div class="flex items-center gap-2">
                            <RadioGroupItem
                                id="service-paid"
                                value="paid"
                            /><Label for="service-paid">Paid service</Label>
                        </div>
                        <div class="flex items-center gap-2">
                            <RadioGroupItem
                                id="service-free"
                                value="free"
                            /><Label for="service-free">Free service</Label>
                        </div></RadioGroup
                    >
                </fieldset>
                <div class="grid grid-cols-2 gap-3">
                    <div class="space-y-2">
                        <Label for="service-currency">Base currency</Label
                        ><Select v-model="draft.baseCurrency"
                            ><SelectTrigger id="service-currency"
                                ><SelectValue /></SelectTrigger
                            ><SelectContent
                                ><SelectItem value="EGP">EGP</SelectItem
                                ><SelectItem value="SAR"
                                    >SAR</SelectItem
                                ></SelectContent
                            ></Select
                        >
                    </div>
                    <div class="space-y-2">
                        <Label for="service-price">Price amount</Label
                        ><Input
                            id="service-price"
                            v-model="draft.basePrice"
                            type="number"
                            min="0.01"
                            max="1000000"
                            step="0.01"
                            :disabled="pricing === 'free'"
                            :required="pricing === 'paid'"
                        />
                    </div>
                </div>
                <p class="text-xs leading-5 text-slate-500">
                    Other-currency prices use an illustrative sample ratio. Live
                    exchange-rate integration is pending.
                </p>
                <div class="flex items-center gap-3">
                    <Switch id="service-active" v-model="draft.active" /><Label
                        for="service-active"
                        >Visible on public profile</Label
                    >
                </div>
                <div
                    class="rounded-lg bg-teal-50 p-4 text-xs leading-6 text-teal-900"
                >
                    No fixed calendar slots. Students request a session, both
                    parties agree on the time, and paid services proceed to
                    payment afterward.
                </div>
                <p v-if="error" role="alert" class="text-sm text-red-700">
                    {{ error }}
                </p>
                <div class="flex flex-wrap gap-3">
                    <Button
                        type="submit"
                        class="bg-teal-700 text-white hover:bg-teal-800"
                        >Save local service</Button
                    ><Button
                        variant="outline"
                        type="button"
                        @click="emit('cancel')"
                        >Cancel</Button
                    >
                </div>
            </form></CardContent
        ></Card
    >
</template>
