<script setup lang="ts">
import { RotateCcw, UserRound } from '@lucide/vue';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { CheckoutBuyer, CheckoutOrder, Currency } from '@/types';

defineProps<{
    order: CheckoutOrder;
    buyer: CheckoutBuyer;
    currency: Currency;
}>();
function format(amount: number) {
    return new Intl.NumberFormat('en-US').format(amount);
}
</script>

<template>
    <aside aria-label="Order summary" class="space-y-4">
        <Card class="border-0 bg-white shadow-sm">
            <CardHeader class="flex flex-row items-center justify-between"
                ><CardTitle class="text-lg">Order Summary</CardTitle
                ><Badge variant="secondary" class="bg-slate-100 text-slate-500"
                    >1 Item</Badge
                ></CardHeader
            >
            <CardContent class="space-y-6">
                <div class="flex items-start gap-4">
                    <img
                        :src="order.image"
                        alt="Course workspace illustration"
                        class="h-20 w-24 shrink-0 rounded-lg object-cover"
                    />
                    <div class="min-w-0">
                        <h2 class="text-sm leading-6 font-semibold">
                            {{ order.title }}
                        </h2>
                        <p
                            class="mt-2 flex items-center gap-1 text-xs text-slate-500"
                        >
                            <UserRound class="size-3" aria-hidden="true" />{{
                                order.instructor
                            }}
                        </p>
                        <div class="mt-3 flex flex-wrap gap-2">
                            <Badge
                                variant="secondary"
                                class="bg-teal-50 text-[10px] text-teal-800"
                                >Lifetime access</Badge
                            ><Badge
                                variant="secondary"
                                class="bg-slate-100 text-[10px] text-slate-500"
                                >One-time payment</Badge
                            >
                        </div>
                    </div>
                </div>
                <Separator class="bg-slate-100" />
                <div class="flex justify-between gap-3 text-sm">
                    <span class="text-slate-500">Course enrollment price</span
                    ><span
                        >{{ format(order.prices[currency]) }}
                        {{ currency }}</span
                    >
                </div>
                <Separator class="bg-slate-100" />
                <div class="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <h2 class="font-semibold">Total Due</h2>
                        <p class="mt-1 text-xs leading-5 text-slate-500">
                            Includes all curriculum access and certificate
                        </p>
                    </div>
                    <p
                        aria-live="polite"
                        class="text-xl font-semibold text-teal-800"
                    >
                        {{ format(order.prices[currency]) }} {{ currency }}
                    </p>
                </div>
                <Alert class="border-0 bg-slate-100 text-slate-500"
                    ><RotateCcw class="size-4 text-teal-700" /><AlertDescription
                        >Request a refund within 14 days of purchase, provided
                        you have completed no more than 3 videos. Completing the
                        fourth video makes the course
                        ineligible.</AlertDescription
                    ></Alert
                >
            </CardContent>
        </Card>
        <Card class="border-0 bg-white py-4 shadow-sm"
            ><CardContent class="flex items-center gap-3"
                ><Avatar class="size-9"
                    ><AvatarFallback class="bg-teal-50 text-teal-800">{{
                        buyer.initials
                    }}</AvatarFallback></Avatar
                >
                <div class="min-w-0">
                    <p class="text-xs">
                        Purchasing as
                        <span class="font-medium">{{ buyer.name }}</span>
                    </p>
                    <p class="mt-1 text-xs break-all text-slate-500">
                        {{ buyer.email }}
                    </p>
                </div></CardContent
            ></Card
        >
    </aside>
</template>
