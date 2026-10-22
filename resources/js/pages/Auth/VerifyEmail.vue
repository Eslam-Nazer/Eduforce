<script setup lang="ts">
defineOptions({ layout: [] });
import AuthLayout from '@/layouts/AuthLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { ArrowLeft, MailCheck, Info, RefreshCw } from '@lucide/vue';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

const props = defineProps<{
    email?: string | null;
    canResend: boolean;
    retryAfter: number;
}>();
const form = useForm({});
const now = ref(Date.now());
const retryAt = ref(now.value + props.retryAfter * 1000);
const remaining = computed(() =>
    Math.max(0, Math.ceil((retryAt.value - now.value) / 1000)),
);
watch(
    () => props.retryAfter,
    (seconds) => {
        now.value = Date.now();
        retryAt.value = now.value + seconds * 1000;
    },
);
let timer: ReturnType<typeof setInterval>;
onMounted(() => {
    timer = setInterval(() => {
        now.value = Date.now();
    }, 1000);
});
onUnmounted(() => clearInterval(timer));

function resend() {
    form.post('/email/verification-notification', {
        preserveScroll: true,
        onSuccess: () => {
            now.value = Date.now();
            retryAt.value = now.value + props.retryAfter * 1000;
        },
    });
}
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
                        Verify your email address
                        <span
                            class="block font-semibold break-all text-slate-900"
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
                    <Button
                        v-if="canResend"
                        :disabled="form.processing || remaining > 0"
                        class="h-11 w-full bg-teal-700 text-white"
                        @click="resend"
                    >
                        <RefreshCw class="size-4" aria-hidden="true" />
                        {{
                            form.processing
                                ? 'Sending…'
                                : remaining > 0
                                  ? `Resend in ${remaining}s`
                                  : 'Resend verification email'
                        }}
                    </Button>
                    <Button
                        v-else
                        as-child
                        class="h-11 w-full bg-teal-700 text-white"
                        ><a href="/login"
                            >Sign in to resend verification email</a
                        ></Button
                    >
                    <p class="text-center text-xs leading-5 text-slate-500">
                        {{
                            canResend
                                ? 'You can request a new email once every 60 seconds.'
                                : 'Sign in to your account to request a new verification link.'
                        }}
                    </p>
                </div>
                <Separator />
                <Button
                    as-child
                    variant="ghost"
                    class="h-11 w-full text-teal-800"
                >
                    <a :href="canResend ? '/' : '/login'"
                        ><ArrowLeft class="size-4" aria-hidden="true" />{{
                            canResend ? 'Back to Home' : 'Back to Sign In'
                        }}</a
                    >
                </Button>
                <p
                    v-if="!email"
                    class="text-center text-xs leading-5 text-slate-500"
                >
                    Sign in to view your account email and request a
                    verification link.
                </p>
            </CardContent>
        </Card>
    </AuthLayout>
</template>
