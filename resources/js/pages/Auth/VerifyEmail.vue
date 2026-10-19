<script setup lang="ts">
import { Head } from "@inertiajs/vue3";
import { ArrowLeft, MailCheck, Info, RefreshCw } from "@lucide/vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

defineOptions({ layout: [] });
defineProps<{ email?: string | null }>();
</script>

<template>
    <Head title="Verify Your Email" />
    <AuthLayout>
        <Card
            class="border-0 border-t-4 border-t-teal-700 bg-white py-0 shadow-sm"
        >
            <CardContent class="space-y-6 p-5 sm:p-8">
                <div class="text-center">
                    <MailCheck
                        class="mx-auto size-14 rounded-xl bg-teal-50 p-3 text-teal-700"
                        aria-hidden="true"
                    />
                    <h1 class="mt-4 text-2xl font-bold tracking-tight">
                        Check your inbox
                    </h1>
                    <p
                        v-if="email"
                        class="mt-3 text-sm leading-6 text-slate-500"
                    >
                        We've sent a verification email to
                        <span
                            class="block break-all font-semibold text-slate-900"
                            >{{ email }}</span
                        >
                    </p>
                    <p v-else class="mt-3 text-sm leading-6 text-slate-500">
                        After registration, you'll receive an email with a link
                        to verify your email address.
                    </p>
                    <p class="mt-3 text-sm leading-6 text-slate-500">
                        Open the email and click
                        <span class="font-medium text-slate-900"
                            >Verify email</span
                        >
                        to confirm your email address.
                    </p>
                </div>
                <Alert class="border-teal-100 bg-teal-50">
                    <Info class="size-4 text-teal-700" aria-hidden="true" />
                    <AlertTitle>Can't find the email?</AlertTitle>
                    <AlertDescription
                        >Check your spam or junk folder and make sure you used
                        the correct email address.</AlertDescription
                    >
                </Alert>
                <div class="space-y-2">
                    <Button disabled class="h-11 w-full bg-teal-700 text-white">
                        <RefreshCw class="size-4" aria-hidden="true" />Resend
                        verification email
                    </Button>
                    <p class="text-center text-xs leading-5 text-slate-500">
                        Email resending isn't available yet.
                    </p>
                </div>
                <Separator />
                <Button
                    as-child
                    variant="ghost"
                    class="h-11 w-full text-teal-800"
                >
                    <a href="/login"
                        ><ArrowLeft class="size-4" aria-hidden="true" />Back to
                        Sign In</a
                    >
                </Button>
                <p
                    v-if="!email"
                    class="text-center text-xs leading-5 text-slate-500"
                >
                    This is a screen preview. No verification email was sent.
                </p>
            </CardContent>
        </Card>
    </AuthLayout>
</template>
