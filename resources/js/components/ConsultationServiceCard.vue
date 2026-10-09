<script setup lang="ts">
import { ArrowRight, Clock, Video, Check } from "@lucide/vue";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ConsultationService } from "@/types/instructor";
import type { Currency } from "@/types/course";
defineProps<{ service: ConsultationService; currency: Currency }>();
defineEmits<{ select: [service: ConsultationService] }>();
</script>
<template>
    <Card class="flex h-full flex-col border-slate-200 bg-white shadow-sm">
        <CardHeader
            ><div class="flex flex-wrap items-center justify-between gap-3">
                <p class="text-xs font-semibold tracking-wide text-slate-500">
                    {{ service.category }}
                </p>
                <Badge
                    variant="secondary"
                    :class="
                        service.egp === 0
                            ? 'bg-blue-50 text-blue-800'
                            : 'bg-teal-50 text-teal-800'
                    "
                    >{{
                        service.egp === 0 ? "Free Service" : "Paid Service"
                    }}</Badge
                >
            </div>
            <CardTitle class="text-xl leading-7">{{ service.title }}</CardTitle>
            <p class="text-sm leading-6 text-slate-500">
                {{ service.description }}
            </p></CardHeader
        >
        <CardContent class="flex flex-1 flex-col gap-5"
            ><p class="text-2xl font-bold text-teal-800">
                {{
                    service.egp === 0
                        ? "Free"
                        : `${new Intl.NumberFormat("en-US").format(currency === "EGP" ? service.egp : service.sar)} ${currency}`
                }}
            </p>
            <div class="flex flex-wrap gap-4 text-xs text-slate-500">
                <span class="flex items-center gap-1.5"
                    ><Clock class="size-4" aria-hidden="true" />{{
                        service.durationMinutes
                    }}
                    minutes</span
                ><span class="flex items-center gap-1.5"
                    ><Video class="size-4" aria-hidden="true" />Remote
                    1-on-1</span
                >
            </div>
            <div>
                <h3 class="text-sm font-semibold">What this service covers</h3>
                <ul class="mt-3 space-y-3">
                    <li
                        v-for="item in service.scope"
                        :key="item"
                        class="flex gap-2 text-sm leading-6 text-slate-600"
                    >
                        <Check
                            class="mt-1 size-4 shrink-0 text-teal-700"
                            aria-hidden="true"
                        /><span>{{ item }}</span>
                    </li>
                </ul>
            </div>
            <p class="text-xs text-slate-500">
                For {{ service.audience.toLowerCase() }}
            </p>
            <Button
                class="mt-auto h-11 w-full bg-teal-700 text-white hover:bg-teal-800"
                :aria-label="`View service: ${service.title}`"
                @click="$emit('select', service)"
                >View Service / Request<ArrowRight
                    class="size-4"
                    aria-hidden="true" /></Button
        ></CardContent>
    </Card>
</template>
