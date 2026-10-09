<script setup lang="ts">
import { ArrowUpRight, CreditCard, LockKeyhole } from '@lucide/vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { CheckoutPaymentMethod, Currency } from '@/types';

defineProps<{ amount: number; currency: Currency }>();
const method = defineModel<CheckoutPaymentMethod>({ required: true });
const emit = defineEmits<{ proceed: [] }>();
</script>

<template>
    <Card class="border-0 bg-white shadow-sm">
        <CardHeader
            ><CardTitle class="flex items-center gap-2 text-lg"
                ><CreditCard
                    class="size-5 text-teal-700"
                    aria-hidden="true"
                />Payment Method</CardTitle
            ></CardHeader
        >
        <CardContent class="space-y-5">
            <RadioGroup v-model="method" aria-label="Payment method">
                <div
                    class="rounded-xl border border-teal-100 bg-teal-50/50 p-4"
                >
                    <div class="flex items-start gap-3">
                        <RadioGroupItem
                            id="hosted-payment"
                            value="hosted"
                            class="mt-1 border-teal-700 text-teal-700"
                        />
                        <div>
                            <Label
                                for="hosted-payment"
                                class="text-sm font-semibold"
                                >Hosted payment gateway</Label
                            >
                            <p class="mt-2 text-xs leading-6 text-slate-500">
                                Available payment methods depend on your country
                                and configured provider.
                            </p>
                        </div>
                    </div>
                    <Alert class="mt-4 border-0 bg-white text-slate-500"
                        ><LockKeyhole
                            class="size-4 text-teal-700"
                        /><AlertDescription
                            >Payment will be completed on the provider’s hosted
                            checkout. No card details are entered on this
                            page.</AlertDescription
                        ></Alert
                    >
                </div>
            </RadioGroup>
            <Button
                class="h-11 w-full bg-teal-700 text-white hover:bg-teal-800"
                @click="emit('proceed')"
                >Proceed to Payment —
                {{ new Intl.NumberFormat('en-US').format(amount) }} {{ currency
                }}<ArrowUpRight class="size-4" aria-hidden="true"
            /></Button>
            <p class="text-center text-xs leading-5 text-slate-500">
                Test preview only. No money will be charged.
            </p>
        </CardContent>
    </Card>
</template>
