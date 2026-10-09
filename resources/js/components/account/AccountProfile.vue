<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import { Upload, UserRound } from "@lucide/vue";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { AccountProfile } from "@/types";

const profile = defineModel<AccountProfile>({ required: true });
const emit = defineEmits<{ saved: [message: string] }>();
const avatar = ref("");
const avatarInput = ref<InstanceType<typeof Input> | null>(null);
function chooseAvatar() {
    const input = avatarInput.value?.$el as HTMLInputElement | undefined;
    input?.click();
}
const error = ref("");
const initials = computed(
    () =>
        profile.value.name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part[0])
            .join("")
            .toUpperCase() || "U",
);
function removeAvatar() {
    if (avatar.value) URL.revokeObjectURL(avatar.value);
    avatar.value = "";
}
function selectAvatar(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    error.value = "";
    if (!file) return;
    if (
        !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
        file.size > 3 * 1024 * 1024
    ) {
        error.value = "Choose a JPG, PNG or WEBP image smaller than 3 MB.";
        input.value = "";
        return;
    }
    removeAvatar();
    avatar.value = URL.createObjectURL(file);
    input.value = "";
}
onBeforeUnmount(removeAvatar);
</script>

<template>
    <Card id="profile" class="scroll-mt-6 border-slate-200 bg-white shadow-sm">
        <CardHeader
            ><CardTitle class="flex items-center gap-2 text-lg"
                ><UserRound class="size-5 text-teal-700" aria-hidden="true" />Profile
                Information</CardTitle
            ><CardDescription
                >Update your profile details in this local preview.</CardDescription
            ></CardHeader
        >
        <CardContent
            ><form
                class="space-y-6"
                @submit.prevent="
                    emit(
                        'saved',
                        'Profile changes are shown locally. Nothing was saved to a server.',
                    )
                "
            >
                <div class="flex flex-wrap items-center gap-4 rounded-lg bg-slate-50 p-4">
                    <Avatar class="size-20"
                        ><AvatarImage
                            v-if="avatar"
                            :src="avatar"
                            alt="Local avatar preview"
                        /><AvatarFallback class="bg-teal-700 text-2xl text-white">{{
                            initials
                        }}</AvatarFallback></Avatar
                    >
                    <div class="min-w-0 flex-1">
                        <div class="flex flex-wrap gap-2">
                            <Button
                                type="button"
                                size="sm"
                                class="bg-teal-700 text-white hover:bg-teal-800"
                                @click="chooseAvatar"
                                ><Upload class="size-4" aria-hidden="true" />Upload New
                                Avatar</Button
                            ><Button
                                type="button"
                                variant="outline"
                                size="sm"
                                :disabled="!avatar"
                                @click="removeAvatar"
                                >Remove</Button
                            >
                        </div>
                        <Input
                            ref="avatarInput"
                            id="avatar-upload"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            class="hidden"
                            tabindex="-1"
                            aria-describedby="avatar-note"
                            @change="selectAvatar"
                        />
                        <p id="avatar-note" class="mt-2 text-xs leading-5 text-slate-500">
                            JPG, PNG or WEBP. Max 3 MB. The image stays in this preview.
                        </p>
                        <p v-if="error" role="alert" class="mt-1 text-xs text-red-600">
                            {{ error }}
                        </p>
                    </div>
                </div>
                <div class="grid gap-5 sm:grid-cols-2">
                    <div class="space-y-2">
                        <Label for="profile-name">Full Name</Label
                        ><Input
                            id="profile-name"
                            v-model="profile.name"
                            autocomplete="name"
                            required
                            class="h-11 border-slate-200"
                        />
                    </div>
                    <div class="space-y-2">
                        <Label for="profile-email">Email Address</Label
                        ><Input
                            id="profile-email"
                            :model-value="profile.email"
                            type="email"
                            readonly
                            class="h-11 border-slate-200 bg-slate-50"
                        />
                        <p class="text-xs leading-5 text-slate-500">Sample account email.</p>
                    </div>
                </div>
                <div class="space-y-2">
                    <Label for="profile-bio">Professional Headline / Bio</Label
                    ><Textarea
                        id="profile-bio"
                        v-model="profile.bio"
                        maxlength="240"
                        rows="4"
                        class="resize-y border-slate-200"
                        aria-describedby="bio-count"
                    />
                    <p id="bio-count" class="text-right text-xs text-slate-500">
                        {{ profile.bio.length }} / 240
                    </p>
                </div>
                <div class="flex justify-end">
                    <Button type="submit" class="h-11 bg-teal-700 text-white hover:bg-teal-800"
                        >Save Changes</Button
                    >
                </div>
            </form></CardContent
        >
    </Card>
</template>
