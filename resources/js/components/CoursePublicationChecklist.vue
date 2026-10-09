<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Circle } from "@lucide/vue";
defineProps<{ checks: { title: string; ready: boolean; step: string }[] }>();
const emit = defineEmits<{ edit: [step: string] }>();
</script>
<template>
    <Card class="bg-white"
        ><CardContent class="space-y-5 p-5 sm:p-6"
            ><div class="flex items-center justify-between gap-3">
                <h2 class="text-lg font-semibold">Publication readiness</h2>
                <p class="text-xs text-slate-500">
                    {{ checks.filter((check) => check.ready).length }} /
                    {{ checks.length }} ready
                </p>
            </div>
            <div
                v-for="check in checks"
                :key="check.title"
                class="flex items-center gap-3 rounded-lg bg-slate-50 p-4"
            >
                <Check
                    v-if="check.ready"
                    class="size-5 shrink-0 text-teal-700"
                /><Circle v-else class="size-5 shrink-0 text-amber-600" />
                <div class="flex-1">
                    <p class="text-sm font-semibold">{{ check.title }}</p>
                    <p
                        class="mt-1 text-xs"
                        :class="
                            check.ready ? 'text-teal-700' : 'text-amber-800'
                        "
                    >
                        {{
                            check.ready
                                ? "Ready in local draft"
                                : "Needs attention"
                        }}
                    </p>
                </div>
                <Button
                    variant="ghost"
                    class="text-teal-800"
                    @click="emit('edit', check.step)"
                    >Edit</Button
                >
            </div></CardContent
        ></Card
    >
</template>
