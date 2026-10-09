<script setup lang="ts">
import { Globe, Info } from '@lucide/vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { BillingCountry, Currency } from '@/types';

defineProps<{ chargeCurrency: Currency; chargeAmount: number }>();
const country = defineModel<BillingCountry>('country', { required: true });
const currency = defineModel<Currency>('currency', { required: true });
</script>

<template>
    <Card class="border-0 bg-white shadow-sm">
        <CardHeader
            ><CardTitle class="flex items-center gap-2 text-lg"
                ><Globe
                    class="size-5 text-teal-700"
                    aria-hidden="true"
                />Billing &amp; Currency</CardTitle
            ></CardHeader
        >
        <CardContent class="space-y-6">
            <div class="grid gap-5 sm:grid-cols-2">
                <div class="space-y-2">
                    <Label for="billing-country"
                        >Billing Country
                        <span aria-hidden="true">*</span></Label
                    ><Select v-model="country"
                        ><SelectTrigger
                            id="billing-country"
                            aria-required="true"
                            class="w-full bg-slate-50"
                            ><SelectValue /></SelectTrigger
                        ><SelectContent
                            ><SelectItem value="EG">Egypt</SelectItem
                            ><SelectItem value="SA"
                                >Saudi Arabia</SelectItem
                            ></SelectContent
                        ></Select
                    >
                    <p class="text-xs leading-5 text-slate-500">
                        Payment availability depends on your country.
                    </p>
                </div>
                <div class="space-y-2">
                    <Label for="checkout-currency"
                        >Display Currency
                        <span aria-hidden="true">*</span></Label
                    ><Select v-model="currency"
                        ><SelectTrigger
                            id="checkout-currency"
                            aria-required="true"
                            class="w-full bg-slate-50"
                            ><SelectValue /></SelectTrigger
                        ><SelectContent
                            ><SelectItem value="EGP"
                                >EGP — Egyptian Pound</SelectItem
                            ><SelectItem value="SAR"
                                >SAR — Saudi Riyal</SelectItem
                            ></SelectContent
                        ></Select
                    >
                    <p class="text-xs leading-5 text-slate-500">
                        Choose how sample course prices are displayed.
                    </p>
                </div>
            </div>
            <Alert class="border-0 bg-slate-100 text-slate-600"
                ><Info class="size-4 text-teal-700" /><AlertDescription
                    aria-live="polite"
                    >Sample charge for this country:
                    {{ new Intl.NumberFormat('en-US').format(chargeAmount) }}
                    {{ chargeCurrency }}. Final payment details will be
                    confirmed by the configured provider.</AlertDescription
                ></Alert
            >
        </CardContent>
    </Card>
</template>
