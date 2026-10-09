<script setup lang="ts">
import { computed, ref } from "vue";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
const emit = defineEmits<{ submit: [] }>();
const headline = ref("");
const expertise = ref<string[]>([]);
const bio = ref("");
const profile = ref("");
const affiliation = ref("");
const ready = computed(
    () =>
        !!headline.value.trim() &&
        !!bio.value.trim() &&
        expertise.value.length > 0,
);
</script>
<template>
    <form class="space-y-6" @submit.prevent="ready && emit('submit')">
        <div class="space-y-2">
            <Label for="instructor-headline">Professional headline *</Label
            ><Input
                id="instructor-headline"
                v-model="headline"
                required
                maxlength="150"
                placeholder="Your role or area of expertise"
            />
        </div>
        <div class="space-y-3">
            <Label>Areas of expertise *</Label
            ><ToggleGroup
                v-model="expertise"
                type="multiple"
                class="flex flex-wrap justify-start gap-2"
                aria-label="Areas of expertise"
                ><ToggleGroupItem
                    v-for="area in [
                        'Development',
                        'Design',
                        'Business',
                        'Marketing',
                        'Languages',
                        'Finance',
                        'Other skills',
                    ]"
                    :key="area"
                    :value="area"
                    variant="outline"
                    class="rounded-md px-3"
                    >{{ area }}</ToggleGroupItem
                ></ToggleGroup
            >
            <p class="text-xs text-slate-500">
                Choose the areas you would like to teach.
            </p>
        </div>
        <div class="space-y-2">
            <Label for="instructor-bio">Professional background *</Label
            ><Textarea
                id="instructor-bio"
                v-model="bio"
                required
                maxlength="1500"
                rows="5"
                placeholder="Describe your experience and what you would like to teach."
            />
            <p class="text-right text-xs text-slate-400">
                {{ bio.length }}/1500
            </p>
        </div>
        <div class="grid gap-5 sm:grid-cols-2">
            <div class="space-y-2">
                <Label for="instructor-link"
                    >Professional profile or portfolio (optional)</Label
                ><Input
                    id="instructor-link"
                    v-model="profile"
                    type="url"
                    maxlength="500"
                    placeholder="https://…"
                />
            </div>
            <div class="space-y-2">
                <Label for="instructor-affiliation"
                    >Affiliation / nominating organization (optional)</Label
                ><Input
                    id="instructor-affiliation"
                    v-model="affiliation"
                    maxlength="150"
                    placeholder="Organization name"
                />
            </div>
        </div>
        <div class="rounded-lg bg-teal-50 p-4 text-sm leading-6 text-teal-900">
            <h2 class="font-semibold">Platform administrator approval</h2>
            <p class="mt-2">
                Applications are reviewed by the platform administrator. An
                organization affiliation does not grant organization-admin
                access. Submitting a request does not activate instructor
                permissions.
            </p>
        </div>
        <Button
            :disabled="!ready"
            type="submit"
            class="h-11 w-full bg-teal-700 text-white hover:bg-teal-800"
            >Preview application submission</Button
        >
    </form>
</template>
