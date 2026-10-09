<script setup lang="ts">
defineOptions({ layout: [] });
import { Head } from "@inertiajs/vue3";
import { ref } from "vue";
import { Mail, ArrowLeft, Info } from "@lucide/vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const email = ref("");
const sent = ref(false);
</script>

<template>
    <Head title="Password Recovery" /><AuthLayout
        ><Card class="border-0 border-t-4 border-t-teal-700 bg-white py-0 shadow-sm"
            ><CardContent class="space-y-6 p-5 sm:p-8">
                <div class="text-center">
                    <Mail
                        class="mx-auto size-12 rounded-lg bg-teal-50 p-3 text-teal-700"
                        aria-hidden="true"
                    />
                    <h1 class="mt-3 text-2xl font-bold tracking-tight">Reset your password</h1>
                    <p class="mt-3 text-sm leading-6 text-slate-500">
                        Enter your account email to request a password reset link.
                    </p>
                </div>
                <Alert v-if="sent" role="status" class="border-teal-100 bg-teal-50"
                    ><Info class="size-4" /><AlertTitle>Reset request preview</AlertTitle
                    ><AlertDescription
                        >When connected, an eligible account will receive a reset link. No email was
                        sent in this preview.</AlertDescription
                    ></Alert
                >
                <form class="space-y-5" @submit.prevent="sent = true">
                    <div class="space-y-2">
                        <Label for="recovery-email">Email Address</Label
                        ><Input
                            id="recovery-email"
                            v-model="email"
                            type="email"
                            autocomplete="email"
                            placeholder="name@example.com"
                            required
                            class="h-11 border-slate-200"
                        />
                    </div>
                    <Button
                        type="submit"
                        class="h-11 w-full bg-teal-700 text-white hover:bg-teal-800"
                        ><Mail class="size-4" aria-hidden="true" />Send Reset Link</Button
                    >
                </form>
                <Button as-child variant="ghost" class="h-11 w-full text-teal-800"
                    ><a href="/login"
                        ><ArrowLeft class="size-4" aria-hidden="true" />Back to Sign In</a
                    ></Button
                >
                <div
                    v-if="sent"
                    class="rounded-lg bg-slate-50 p-4 text-xs leading-5 text-slate-500"
                >
                    <p>You can inspect the next step using sample data.</p>
                    <a
                        href="/reset-password"
                        class="mt-2 inline-block font-medium text-teal-800 hover:underline"
                        >Preview new password form →</a
                    >
                </div>
            </CardContent></Card
        ></AuthLayout
    >
</template>
