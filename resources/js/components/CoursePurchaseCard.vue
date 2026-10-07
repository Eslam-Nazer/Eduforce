<script setup lang="ts">
import { ArrowRight, Check, RotateCcw } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Currency } from '@/types';

defineProps<{
    price: number;
    currency: Currency;
    videoCount: number;
    hasExam: boolean;
}>();
const emit = defineEmits<{ buy: [] }>();
</script>

<template>
    <aside aria-label="Course purchase" class="space-y-4">
        <Card class="border-slate-200 bg-white shadow-sm">
            <CardContent class="px-6">
                <p class="text-xs font-medium tracking-wider text-slate-500">
                    COURSE PRICE
                </p>
                <p class="mt-2 text-4xl font-semibold tracking-tight">
                    {{ new Intl.NumberFormat('en-US').format(price) }}
                    <span class="text-base font-normal text-slate-500">{{
                        currency
                    }}</span>
                </p>
                <p class="mt-2 text-xs text-slate-500">
                    One-time payment in
                    {{
                        currency === 'EGP' ? 'Egyptian Pounds' : 'Saudi Riyals'
                    }}
                </p>
                <Button
                    class="mt-6 w-full bg-teal-700 text-white hover:bg-teal-800"
                    @click="emit('buy')"
                    >Buy Course <ArrowRight class="size-4"
                /></Button>
                <p class="mt-3 text-center text-xs text-slate-500">
                    Immediate access granted upon payment
                </p>
                <Separator class="my-6 bg-slate-100" />
                <h2
                    class="mb-4 text-xs font-medium tracking-wider text-slate-500"
                >
                    THIS COURSE INCLUDES
                </h2>
                <ul class="space-y-3 text-sm text-slate-600">
                    <li
                        v-for="item in [
                            'Full lifetime access',
                            `${videoCount} on-demand video lessons`,
                            'Downloadable course resources',
                            ...(hasExam
                                ? ['Final assessment exam with retries']
                                : []),
                            'Platform completion certificate',
                        ]"
                        :key="item"
                        class="flex items-start gap-2"
                    >
                        <Check
                            class="mt-0.5 size-4 shrink-0 text-teal-700"
                            aria-hidden="true"
                        />{{ item }}
                    </li>
                </ul>
            </CardContent>
        </Card>
        <Card class="border-0 bg-slate-100 shadow-none"
            ><CardContent class="px-5"
                ><h2 class="flex items-center gap-2 text-sm font-medium">
                    <RotateCcw class="size-4 text-teal-700" />14-Day Conditional
                    Refund Policy
                </h2>
                <p class="mt-3 text-xs leading-6 text-slate-500">
                    Request a refund within 14 days of purchase, provided you
                    have completed no more than 3 videos. Completing the fourth
                    video makes the course ineligible.
                </p></CardContent
            ></Card
        >
        <p
            class="rounded-lg border border-slate-200 bg-white p-3 text-xs leading-5 text-slate-500"
        >
            Available payment methods depend on your country and configured
            provider.
        </p>
    </aside>
</template>
