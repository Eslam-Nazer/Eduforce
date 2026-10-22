<script setup lang="ts">
defineOptions({ layout: [] });
import { Form, Head } from '@inertiajs/vue3';
import { ref } from 'vue';
import { GraduationCap, Info, ArrowRight } from '@lucide/vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import InputError from '@/components/InputError.vue';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmation = ref('');
const submitted = ref(false);
</script>

<template>
    <Head title="Sign Up" />
    <AuthLayout :show-footer="false" class="[&_header>div]:py-3 [&_main]:py-2"
        ><Card
            class="border-0 border-t-4 border-t-teal-700 bg-white py-0 shadow-sm"
            ><CardContent class="space-y-2 p-3">
                <div class="text-center">
                    <GraduationCap
                        class="mx-auto size-12 rounded-lg bg-teal-50 p-3 text-teal-700"
                        aria-hidden="true"
                    />
                    <h1 class="mt-1 text-2xl font-bold tracking-tight">
                        Create your Eduforce account
                    </h1>
                    <p class="mt-1 text-sm leading-6 text-slate-500">
                        Start learning with practitioner-led courses
                    </p>
                </div>
                <Alert class="gap-y-0.5 border-0 bg-slate-200 px-3 py-2"
                    ><Info class="size-4 text-teal-700" /><AlertTitle
                        class="text-xs leading-4"
                        >One account for everything</AlertTitle
                    ><AlertDescription class="text-xs leading-4"
                        >Every member joins as a learner and can later apply to
                        become an instructor from account
                        settings.</AlertDescription
                    ></Alert
                >
                <Alert
                    v-if="submitted"
                    role="status"
                    class="border-teal-100 bg-teal-50"
                    ><Info class="size-4" /><AlertTitle
                        >Registration preview</AlertTitle
                    ><AlertDescription
                        >No account was created. These details were not sent to
                        a server.</AlertDescription
                    ></Alert
                >
                <Form
                    class="space-y-3"
                    method="POST"
                    :action="route('register.store')"
                    #default="{ errors }"
                >
                    <div class="space-y-1">
                        <Label for="register-name">Full Name</Label
                        ><Input
                            id="register-name"
                            name="name"
                            v-model="name"
                            autocomplete="name"
                            placeholder="e.g. Kareem Tarek"
                            required
                            class="h-11 border-slate-200"
                        />
                        <InputError id="name-error" :message="errors.name" />
                    </div>
                    <div class="space-y-1">
                        <Label for="register-email">Email Address</Label
                        ><Input
                            id="register-email"
                            name="email"
                            v-model="email"
                            type="email"
                            autocomplete="email"
                            placeholder="name@example.com"
                            required
                            class="h-11 border-slate-200"
                        />
                        <InputError id="email-error" :message="errors.email" />
                    </div>
                    <div class="space-y-1">
                        <Label for="register-password">Password</Label
                        ><PasswordInput
                            id="register-password"
                            name="password"
                            v-model="password"
                            autocomplete="new-password"
                            required
                            show-strength
                            :aria-invalid="!!errors.password"
                            aria-describedby="register-error"
                        />
                        <InputError
                            id="password-error"
                            :message="errors.password"
                        />
                    </div>
                    <div class="space-y-1">
                        <Label for="register-confirmation"
                            >Confirm Password</Label
                        ><PasswordInput
                            id="register-confirmation"
                            name="password_confirmation"
                            v-model="confirmation"
                            label="password confirmation"
                            autocomplete="new-password"
                            required
                            :aria-invalid="!!errors.password_confirmation"
                            aria-describedby="register-error"
                        />
                        <InputError
                            id="password-confirmation-error"
                            :message="errors.password_confirmation"
                        />
                    </div>
                    <p class="text-center text-xs leading-5 text-slate-500">
                        Terms and privacy information will be available before
                        account registration launches.
                    </p>
                    <Button
                        type="submit"
                        class="h-11 w-full bg-teal-700 text-white hover:bg-teal-800"
                        >Create Account<ArrowRight
                            class="size-4"
                            aria-hidden="true"
                    /></Button>
                </Form>
                <Separator />
                <p class="text-center text-sm text-slate-500">
                    Already have an account?
                    <a
                        href="/login"
                        class="font-medium text-teal-800 hover:underline"
                        >Sign in</a
                    >
                </p>
            </CardContent></Card
        ></AuthLayout
    >
</template>
