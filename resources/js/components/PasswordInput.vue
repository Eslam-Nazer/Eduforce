<script setup lang="ts">
import { computed, ref } from "vue";
import { Eye, EyeOff, LockKeyhole, CircleCheck } from "@lucide/vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<{ showStrength?: boolean; label?: string }>(), {
    showStrength: false,
    label: "password",
});
const value = defineModel<string>({ required: true });
const visible = ref(false);
const checks = computed(() => [
    value.value.length >= 8,
    /[0-9]/.test(value.value),
    /[A-Z]/.test(value.value),
    /[^A-Za-z0-9]/.test(value.value),
]);
const strength = computed(() => checks.value.filter(Boolean).length * 25);
const strengthLabel = computed(() =>
    !value.value
        ? "Not entered"
        : strength.value < 50
          ? "Weak"
          : strength.value < 100
            ? "Fair"
            : "Strong",
);
</script>

<template>
    <div>
        <div class="relative">
            <LockKeyhole
                class="pointer-events-none absolute top-3.5 left-3 size-4 text-slate-400"
                aria-hidden="true"
            />
            <Input
                v-bind="$attrs"
                v-model="value"
                :type="visible ? 'text' : 'password'"
                class="h-11 border-slate-200 bg-white pr-12 pl-10 text-slate-900"
            />
            <Button
                type="button"
                variant="ghost"
                size="icon"
                class="absolute top-0.5 right-0.5 size-10 text-slate-500"
                :aria-label="`${visible ? 'Hide' : 'Show'} ${props.label}`"
                :aria-pressed="visible"
                @click="visible = !visible"
                ><EyeOff v-if="visible" class="size-4" /><Eye v-else class="size-4"
            /></Button>
        </div>
        <div
            v-if="showStrength"
            class="mt-3 space-y-2 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-500"
        >
            <div class="flex justify-between gap-3">
                <span>Password strength</span
                ><span class="font-medium text-teal-800">{{ strengthLabel }}</span>
            </div>
            <Progress
                :model-value="strength"
                aria-label="Password strength"
                class="h-1.5 bg-slate-200 [&_[data-slot=progress-indicator]]:bg-teal-700"
            />
            <div class="flex flex-wrap gap-x-4 gap-y-1">
                <span :class="checks[0] && 'text-teal-700'" class="flex items-center gap-1"
                    ><CircleCheck class="size-3" aria-hidden="true" />At least 8 characters</span
                ><span :class="checks[1] && 'text-teal-700'" class="flex items-center gap-1"
                    ><CircleCheck class="size-3" aria-hidden="true" />At least one number</span
                >
            </div>
        </div>
    </div>
</template>
