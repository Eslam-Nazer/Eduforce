<script setup lang="ts">
import { ref } from "vue";
import { LockKeyhole } from "@lucide/vue";
import PasswordInput from "@/components/PasswordInput.vue";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const emit = defineEmits<{ saved: [message: string] }>();
const current = ref("");
const password = ref("");
const confirmation = ref("");
const error = ref("");
function submit() {
    error.value = "";
    if (password.value.length < 8 || !/[0-9]/.test(password.value)) {
        error.value = "Use at least 8 characters and one number in this preview.";
        return;
    }
    if (password.value !== confirmation.value) {
        error.value = "Passwords do not match.";
        return;
    }
    if (current.value === password.value) {
        error.value = "Choose a different password from the current one.";
        return;
    }
    current.value = password.value = confirmation.value = "";
    emit("saved", "Password form checked locally. No account password was changed.");
}
</script>

<template>
    <Card id="password" class="scroll-mt-6 border-slate-200 bg-white shadow-sm"
        ><CardHeader
            ><CardTitle class="flex items-center gap-2 text-lg"
                ><LockKeyhole class="size-5 text-teal-700" aria-hidden="true" />Security &amp;
                Password</CardTitle
            ><CardDescription>Preview the password change form.</CardDescription></CardHeader
        ><CardContent
            ><form class="space-y-5" @submit.prevent="submit">
                <div class="space-y-2">
                    <Label for="account-current-password">Current Password</Label
                    ><PasswordInput
                        id="account-current-password"
                        v-model="current"
                        label="current password"
                        autocomplete="current-password"
                        required
                    />
                </div>
                <div class="grid gap-5 sm:grid-cols-2">
                    <div class="space-y-2">
                        <Label for="account-new-password">New Password</Label
                        ><PasswordInput
                            id="account-new-password"
                            v-model="password"
                            label="new password"
                            autocomplete="new-password"
                            show-strength
                            required
                            :aria-invalid="!!error"
                            aria-describedby="account-password-error"
                        />
                    </div>
                    <div class="space-y-2">
                        <Label for="account-confirmation">Confirm New Password</Label
                        ><PasswordInput
                            id="account-confirmation"
                            v-model="confirmation"
                            label="password confirmation"
                            autocomplete="new-password"
                            required
                            :aria-invalid="!!error"
                            aria-describedby="account-password-error"
                        />
                    </div>
                </div>
                <p
                    v-if="error"
                    id="account-password-error"
                    role="alert"
                    class="text-xs leading-5 text-red-600"
                >
                    {{ error }}
                </p>
                <div class="flex justify-end">
                    <Button type="submit" class="h-11 bg-teal-700 text-white hover:bg-teal-800"
                        >Save Password</Button
                    >
                </div>
            </form></CardContent
        ></Card
    >
</template>
