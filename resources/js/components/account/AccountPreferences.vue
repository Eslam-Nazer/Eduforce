<script setup lang="ts">
import { Globe, Info } from "@lucide/vue";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { AccountPreferences } from "@/types";

const preferences = defineModel<AccountPreferences>({ required: true });
const emit = defineEmits<{ saved: [message: string] }>();
</script>

<template>
    <Card id="preferences" class="scroll-mt-6 border-slate-200 bg-white shadow-sm"
        ><CardHeader
            ><CardTitle class="flex items-center gap-2 text-lg"
                ><Globe class="size-5 text-teal-700" aria-hidden="true" />Regional &amp; Billing
                Preferences</CardTitle
            ><CardDescription
                >Choose your country and preferred display currency.</CardDescription
            ></CardHeader
        ><CardContent
            ><form
                class="space-y-6"
                @submit.prevent="emit('saved', 'Preferences updated for this page preview only.')"
            >
                <div class="grid gap-5 sm:grid-cols-2">
                    <div class="space-y-2">
                        <Label for="account-country">Country of Residence</Label
                        ><Select v-model="preferences.country"
                            ><SelectTrigger
                                id="account-country"
                                class="h-11! w-full border-slate-200"
                                ><SelectValue /></SelectTrigger
                            ><SelectContent
                                ><SelectItem value="EG">Egypt (مصر)</SelectItem
                                ><SelectItem value="SA"
                                    >Saudi Arabia (المملكة العربية السعودية)</SelectItem
                                ></SelectContent
                            ></Select
                        >
                    </div>
                    <div class="space-y-2">
                        <Label for="account-currency">Default Display Currency</Label
                        ><Select v-model="preferences.currency"
                            ><SelectTrigger
                                id="account-currency"
                                class="h-11! w-full border-slate-200"
                                ><SelectValue /></SelectTrigger
                            ><SelectContent
                                ><SelectItem value="EGP">EGP — Egyptian Pound</SelectItem
                                ><SelectItem value="SAR"
                                    >SAR — Saudi Riyal</SelectItem
                                ></SelectContent
                            ></Select
                        >
                    </div>
                </div>
                <Alert class="border-0 bg-slate-50"
                    ><Info class="size-4 text-teal-700" /><AlertDescription
                        >Available payment methods and the final settlement currency will depend on
                        your country and the configured provider.</AlertDescription
                    ></Alert
                >
                <div class="flex justify-end">
                    <Button type="submit" class="h-11 bg-teal-700 text-white hover:bg-teal-800"
                        >Save Preferences</Button
                    >
                </div>
            </form></CardContent
        ></Card
    >
</template>
