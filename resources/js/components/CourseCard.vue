<script setup lang="ts">
import { ArrowRight, UserRound } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import type { Course, Currency } from '@/types';

defineProps<{ course: Course; currency: Currency }>();
const emit = defineEmits<{ 'view-details': [course: Course] }>();
function price(course: Course, selected: Currency) {
    return new Intl.NumberFormat('en-US').format(
        selected === 'EGP' ? course.egp : course.sar,
    );
}
</script>
<template>
    <Card
        class="group gap-0 overflow-hidden rounded-xl border border-slate-200 bg-white py-0 shadow-sm transition-shadow hover:shadow-md"
    >
        <div class="relative aspect-[16/9] overflow-hidden bg-slate-100">
            <img
                :src="`https://images.unsplash.com/${course.image}?auto=format&fit=crop&w=700&q=80`"
                :alt="`${course.category} course illustration`"
                class="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
            />
            <Badge
                variant="secondary"
                class="absolute top-3 left-3 rounded bg-white/90 px-2 py-1 text-[10px] font-medium text-slate-600"
                >{{ course.category }}</Badge
            >
        </div>
        <CardContent class="px-4 pt-4">
            <CardTitle class="min-h-12 text-sm leading-6 font-semibold">
                {{ course.title }}
            </CardTitle>
            <p class="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                <UserRound class="size-3.5" aria-hidden="true" />{{
                    course.instructor
                }}
            </p>
            <div
                class="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 py-3"
            >
                <p class="text-sm font-semibold">
                    {{ price(course, currency) }} {{ currency }}
                    <span class="ml-1 text-[10px] font-normal text-slate-500"
                        >≈
                        {{ price(course, currency === 'EGP' ? 'SAR' : 'EGP') }}
                        {{ currency === 'EGP' ? 'SAR' : 'EGP' }}</span
                    >
                </p>
                <Badge
                    variant="outline"
                    class="rounded border-slate-200 px-1.5 py-0.5 text-[10px] font-normal text-slate-500"
                    >Lifetime</Badge
                >
            </div> </CardContent
        ><Button
            variant="ghost"
            class="flex h-auto w-full items-center justify-between rounded-none border-t border-slate-100 bg-slate-50/70 px-4 py-3 text-xs font-medium text-teal-800 hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-teal-600"
            :aria-label="`View details for ${course.title}`"
            @click="emit('view-details', course)"
        >
            View Details
            <ArrowRight class="size-4" aria-hidden="true" />
        </Button>
    </Card>
</template>
