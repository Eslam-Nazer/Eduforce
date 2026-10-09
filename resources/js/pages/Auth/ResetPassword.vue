<script setup lang="ts">
defineOptions({ layout: [] });
import { Head } from "@inertiajs/vue3";
import { ref } from "vue";
import { KeyRound, ArrowLeft, Info } from "@lucide/vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import PasswordInput from "@/components/PasswordInput.vue";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const password = ref("");
const confirmation = ref("");
const error = ref("");
const submitted = ref(false);
function submit() {
    error.value = "";
    submitted.value = false;
    if (password.value.length < 8 || !/[0-9]/.test(password.value)) {
        error.value = "Use at least 8 characters and one number in this preview.";
        return;
    }
    if (password.value !== confirmation.value) {
        error.value = "Passwords do not match.";
        return;
    }
    submitted.value = true;
    password.value = confirmation.value = "";
}
</script>

<template>
    <Head title="New Password" /><AuthLayout
        ><Card class="border-0 border-t-4 border-t-teal-700 bg-white py-0 shadow-sm"
            ><CardContent class="space-y-6 p-5 sm:p-8">
                <div class="text-center">
                    <KeyRound
                        class="mx-auto size-12 rounded-lg bg-teal-50 p-3 text-teal-700"
                        aria-hidden="true"
                    />
                    <h1 class="mt-3 text-2xl font-bold tracking-tight">Choose a new password</h1>
                    <p class="mt-3 text-sm leading-6 text-slate-500">
                        Create a new password for your Eduforce account.
                    </p>
                </div>
                <Alert v-if="submitted" role="status" class="border-teal-100 bg-teal-50"
                    ><Info class="size-4" /><AlertTitle>Password reset preview</AlertTitle
                    ><AlertDescription
                        >No password was changed. This form is not connected to an account or reset
                        token.</AlertDescription
                    ></Alert
                >
                <form class="space-y-5" @submit.prevent="submit">
                    <div class="space-y-2">
                        <Label for="reset-password">New Password</Label
                        ><PasswordInput
                            id="reset-password"
                            v-model="password"
                            autocomplete="new-password"
                            required
                            show-strength
                            :aria-invalid="!!error"
                            aria-describedby="reset-error"
                        />
                    </div>
                    <div class="space-y-2">
                        <Label for="reset-confirmation">Confirm New Password</Label
                        ><PasswordInput
                            id="reset-confirmation"
                            v-model="confirmation"
                            label="password confirmation"
                            autocomplete="new-password"
                            required
                            :aria-invalid="!!error"
                            aria-describedby="reset-error"
                        />
                    </div>
                    <p
                        v-if="error"
                        id="reset-error"
                        role="alert"
                        class="text-xs leading-5 text-red-600"
                    >
                        {{ error }}
                    </p>
                    <Button
                        type="submit"
                        class="h-11 w-full bg-teal-700 text-white hover:bg-teal-800"
                        >Update Password</Button
                    >
                </form>
                <Button as-child variant="ghost" class="h-11 w-full text-teal-800"
                    ><a href="/login"
                        ><ArrowLeft class="size-4" aria-hidden="true" />Back to Sign In</a
                    ></Button
                >
            </CardContent></Card
        ></AuthLayout
    >
</template>
