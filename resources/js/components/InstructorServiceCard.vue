<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { InstructorService } from "@/types/instructor-consultations";
defineProps<{ service: InstructorService }>();
defineEmits<{ edit: []; visibility: []; remove: [] }>();
</script>
<template>
    <Card
        ><CardContent class="space-y-4 p-5"
            ><div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                    <Badge variant="secondary">{{
                        service.basePrice === 0
                            ? "Free service"
                            : "Paid service"
                    }}</Badge>
                    <h3 class="mt-2 font-semibold break-words">
                        {{ service.title }}
                    </h3>
                    <p
                        class="mt-2 text-sm leading-6 text-slate-500 break-words"
                    >
                        {{ service.description }}
                    </p>
                </div>
                <p class="shrink-0 text-sm font-semibold text-teal-800">
                    {{
                        service.basePrice === 0
                            ? "Free"
                            : `${service.basePrice.toLocaleString("en-US")} ${service.baseCurrency}`
                    }}
                </p>
            </div>
            <div class="grid grid-cols-2 gap-3 text-xs text-slate-500">
                <p>
                    Duration<br /><span class="font-semibold text-slate-900"
                        >{{ service.durationMinutes }} minutes</span
                    >
                </p>
                <p>
                    Base currency<br /><span
                        class="font-semibold text-slate-900"
                        >{{ service.baseCurrency }}</span
                    >
                </p>
            </div>
            <div class="flex flex-wrap items-center gap-3 border-t pt-4">
                <div class="mr-auto flex items-center gap-2">
                    <Switch
                        :model-value="service.active"
                        :aria-label="`Visibility of ${service.title}`"
                        @update:model-value="$emit('visibility')"
                    /><span class="text-xs">{{
                        service.active ? "Active & visible" : "Paused"
                    }}</span>
                </div>
                <Button size="sm" variant="outline" @click="$emit('edit')"
                    >Edit service</Button
                ><Button
                    size="sm"
                    variant="outline"
                    class="text-red-700"
                    @click="$emit('remove')"
                    >Delete</Button
                >
            </div></CardContent
        ></Card
    >
</template>
