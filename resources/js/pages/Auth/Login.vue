<script setup lang="ts">
defineOptions({ layout: [] });
import { Head } from "@inertiajs/vue3";
import { ref } from "vue";
import { GraduationCap, ArrowRight, Info, Mail } from "@lucide/vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import PasswordInput from "@/components/PasswordInput.vue";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const email = ref("");
const password = ref("");
const remember = ref(false);
const submitted = ref(false);
function submit() {
    submitted.value = true;
    password.value = "";
}
</script>

<template>
    <Head title="Sign In" />
    <AuthLayout>
        <Card
            class="gap-0 overflow-hidden border-0 border-t-4 border-t-teal-700 bg-white py-0 shadow-sm"
        >
            <CardContent class="space-y-6 p-5 sm:p-8">
                <div class="text-center">
                    <GraduationCap
                        class="mx-auto size-12 rounded-lg bg-teal-50 p-3 text-teal-700"
                        aria-hidden="true"
                    /><Badge variant="secondary" class="mt-3 bg-teal-50 text-teal-800"
                        >STUDENT PORTAL</Badge
                    >
                    <h1 class="mt-3 text-2xl font-bold tracking-tight">Sign in to your account</h1>
                    <p class="mt-3 text-sm leading-6 text-slate-500">
                        Access your enrolled courses and continue learning.
                    </p>
                </div>
                <Alert v-if="submitted" role="status" class="border-teal-100 bg-teal-50"
                    ><Info class="size-4" /><AlertTitle>Sign-in preview</AlertTitle
                    ><AlertDescription
                        >No sign-in request was sent. Authentication will be connected
                        later.</AlertDescription
                    ></Alert
                >
                <form class="space-y-5" @submit.prevent="submit">
                    <div class="space-y-2">
                        <Label for="login-email">Email Address</Label>
                        <div class="relative">
                            <Mail
                                class="pointer-events-none absolute top-3.5 left-3 size-4 text-slate-400"
                                aria-hidden="true"
                            /><Input
                                id="login-email"
                                v-model="email"
                                type="email"
                                autocomplete="username"
                                placeholder="name@example.com"
                                required
                                class="h-11 border-slate-200 pl-10"
                            />
                        </div>
                    </div>
                    <div class="space-y-2">
                        <Label for="login-password">Password</Label
                        ><PasswordInput
                            id="login-password"
                            v-model="password"
                            autocomplete="current-password"
                            required
                        />
                    </div>
                    <div class="flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div class="flex items-center gap-2">
                            <Checkbox id="remember-me" v-model="remember" /><Label
                                for="remember-me"
                                class="text-xs font-normal text-slate-500"
                                >Remember me</Label
                            >
                        </div>
                        <a href="/forgot-password" class="font-medium text-teal-800 hover:underline"
                            >Forgot password?</a
                        >
                    </div>
                    <Button
                        type="submit"
                        class="h-11 w-full bg-teal-700 text-white hover:bg-teal-800"
                        >Sign In<ArrowRight class="size-4" aria-hidden="true"
                    /></Button>
                </form>
                <Separator />
                <p class="text-center text-sm text-slate-500">
                    Don't have an account?
                    <a href="/register" class="font-medium text-teal-800 hover:underline"
                        >Sign up</a
                    >
                </p>
            </CardContent>
            <div class="flex gap-2 bg-slate-50 p-4 text-xs leading-5 text-slate-500">
                <Info class="mt-0.5 size-4 shrink-0 text-teal-700" aria-hidden="true" />
                <p>One Eduforce account lets you learn and later apply to become an instructor.</p>
            </div>
        </Card>
    </AuthLayout>
</template>
