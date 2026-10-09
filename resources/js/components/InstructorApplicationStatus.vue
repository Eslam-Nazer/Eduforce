<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
defineProps<{ state: "pending" | "approved" | "rejected" }>();
const emit = defineEmits<{ edit: [] }>();
</script>
<template>
    <section class="space-y-5 text-center">
        <Badge variant="secondary">Sample review state</Badge>
        <h2 class="text-2xl font-bold">
            {{
                state === "pending"
                    ? "Application under review"
                    : state === "approved"
                      ? "Instructor application approved"
                      : "Application needs changes"
            }}
        </h2>
        <p class="text-sm leading-6 text-slate-500">
            {{
                state === "pending"
                    ? "This preview demonstrates a submitted application awaiting the platform administrator’s decision."
                    : state === "approved"
                      ? "This sample approval lets you explore the instructor workspace. Your real account permissions have not changed."
                      : "Sample reviewer feedback: please explain your professional experience and the topics you plan to teach in more detail."
            }}
        </p>
        <Button
            v-if="state === 'approved'"
            as-child
            class="bg-teal-700 text-white hover:bg-teal-800"
            ><a href="/instructor">Explore instructor preview</a></Button
        ><Button
            v-if="state === 'rejected'"
            variant="outline"
            @click="emit('edit')"
            >Edit application preview</Button
        >
        <p class="text-xs text-slate-400">
            No application has been sent to an administrator.
        </p>
    </section>
</template>
