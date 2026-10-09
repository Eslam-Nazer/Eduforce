<script setup lang="ts">
defineOptions({ layout: [] });
import { Head } from "@inertiajs/vue3";
import { ref } from "vue";
import { GraduationCap, Info, ArrowRight } from "@lucide/vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import PasswordInput from "@/components/PasswordInput.vue";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const name = ref("");
const email = ref("");
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
    <Head title="Sign Up" />
    <AuthLayout
        ><Card class="border-0 border-t-4 border-t-teal-700 bg-white py-0 shadow-sm"
            ><CardContent class="space-y-6 p-5 sm:p-8">
                <div class="text-center">
                    <GraduationCap
                        class="mx-auto size-12 rounded-lg bg-teal-50 p-3 text-teal-700"
                        aria-hidden="true"
                    />
                    <h1 class="mt-3 text-2xl font-bold tracking-tight">
                        Create your Eduforce account
                    </h1>
                    <p class="mt-3 text-sm leading-6 text-slate-500">
                        Start learning with practitioner-led courses across Egypt &amp; Saudi
                        Arabia.
                    </p>
                </div>
                <Alert class="border-0 bg-slate-50"
                    ><Info class="size-4 text-teal-700" /><AlertTitle
                        >One account for everything</AlertTitle
                    ><AlertDescription
                        >Every member joins as a learner and can later apply to become an instructor
                        from account settings.</AlertDescription
                    ></Alert
                >
                <Alert v-if="submitted" role="status" class="border-teal-100 bg-teal-50"
                    ><Info class="size-4" /><AlertTitle>Registration preview</AlertTitle
                    ><AlertDescription
                        >No account was created. These details were not sent to a
                        server.</AlertDescription
                    ></Alert
                >
                <form class="space-y-5" @submit.prevent="submit">
                    <div class="space-y-2">
                        <Label for="register-name">Full Name</Label
                        ><Input
                            id="register-name"
                            v-model="name"
                            autocomplete="name"
                            placeholder="e.g. Kareem Tarek"
                            required
                            class="h-11 border-slate-200"
                        />
                    </div>
                    <div class="space-y-2">
                        <Label for="register-email">Email Address</Label
                        ><Input
                            id="register-email"
                            v-model="email"
                            type="email"
                            autocomplete="email"
                            placeholder="name@example.com"
                            required
                            class="h-11 border-slate-200"
                        />
                    </div>
                    <div class="space-y-2">
                        <Label for="register-password">Password</Label
                        ><PasswordInput
                            id="register-password"
                            v-model="password"
                            autocomplete="new-password"
                            required
                            show-strength
                            :aria-invalid="!!error"
                            aria-describedby="register-error"
                        />
                    </div>
                    <div class="space-y-2">
                        <Label for="register-confirmation">Confirm Password</Label
                        ><PasswordInput
                            id="register-confirmation"
                            v-model="confirmation"
                            label="password confirmation"
                            autocomplete="new-password"
                            required
                            :aria-invalid="!!error"
                            aria-describedby="register-error"
                        />
                    </div>
                    <p
                        v-if="error"
                        id="register-error"
                        role="alert"
                        class="text-xs leading-5 text-red-600"
                    >
                        {{ error }}
                    </p>
                    <p class="text-center text-xs leading-5 text-slate-500">
                        Terms and privacy information will be available before account registration
                        launches.
                    </p>
                    <Button
                        type="submit"
                        class="h-11 w-full bg-teal-700 text-white hover:bg-teal-800"
                        >Create Account<ArrowRight class="size-4" aria-hidden="true"
                    /></Button>
                </form>
                <Separator />
                <p class="text-center text-sm text-slate-500">
                    Already have an account?
                    <a href="/login" class="font-medium text-teal-800 hover:underline">Sign in</a>
                </p>
            </CardContent></Card
        ></AuthLayout
    >
</template>
