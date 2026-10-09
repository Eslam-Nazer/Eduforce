<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import { ref } from 'vue';
import { ArrowLeft, Ban, Headphones, Info, RefreshCw } from '@lucide/vue';
import MarketplaceHeader from '@/components/MarketplaceHeader.vue';
import MarketplaceFooter from '@/components/MarketplaceFooter.vue';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet';
import type { Currency } from '@/types';

const currency = ref<Currency>('EGP');
const previewOpen = ref(false);
const previewTitle = ref('');
function preview(title: string) {
    previewTitle.value = title;
    previewOpen.value = true;
}
</script>

<template>
    <Head title="Payment Cancelled" />
    <div class="payment-cancelled min-h-screen bg-[#f8fafc] text-slate-900">
        <MarketplaceHeader
            v-model:currency="currency"
            @browse="router.visit('/')"
            @preview="preview"
        />
        <div class="bg-slate-100">
            <Breadcrumb class="mx-auto max-w-7xl px-5 py-4 sm:px-8">
                <BreadcrumbList>
                    <BreadcrumbItem
                        ><BreadcrumbLink href="/"
                            >Home</BreadcrumbLink
                        ></BreadcrumbItem
                    >
                    <BreadcrumbSeparator />
                    <BreadcrumbItem
                        ><BreadcrumbLink href="/checkout"
                            >Checkout</BreadcrumbLink
                        ></BreadcrumbItem
                    >
                    <BreadcrumbSeparator />
                    <BreadcrumbItem
                        ><BreadcrumbPage
                            >Payment Status</BreadcrumbPage
                        ></BreadcrumbItem
                    >
                </BreadcrumbList>
            </Breadcrumb>
        </div>
        <main class="mx-auto max-w-2xl px-5 py-10 sm:px-8 sm:py-12">
            <Card
                class="overflow-hidden border-0 border-t-4 border-t-amber-500 bg-white shadow-sm"
            >
                <CardContent class="space-y-6 p-5 sm:p-8">
                    <div class="text-center">
                        <div
                            class="mx-auto flex size-16 items-center justify-center rounded-full bg-amber-50"
                        >
                            <Ban
                                class="size-10 text-amber-600"
                                aria-hidden="true"
                            />
                        </div>
                        <Badge
                            variant="secondary"
                            class="mt-5 bg-amber-50 text-amber-700"
                            >TRANSACTION CANCELLED</Badge
                        >
                        <h1 class="mt-3 text-3xl font-bold tracking-tight">
                            Payment cancelled
                        </h1>
                        <p
                            class="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500"
                        >
                            Your purchase was not completed. You can return to
                            checkout whenever you are ready.
                        </p>
                    </div>
                    <Alert class="border-0 bg-slate-100"
                        ><Info class="size-4 text-amber-700" /><AlertTitle
                            >No payment completed</AlertTitle
                        ><AlertDescription
                            >You left the payment flow before completing your
                            purchase. No course access was activated. This is a
                            sample cancellation preview; no payment was
                            attempted.</AlertDescription
                        ></Alert
                    >
                    <div class="space-y-4 rounded-lg bg-slate-100 p-4">
                        <div
                            class="flex flex-wrap justify-between gap-2 text-xs leading-5"
                        >
                            <h2 class="font-medium">ORDER SNAPSHOT</h2>
                            <span class="text-teal-800"
                                >Session: TEST-EDF-94821</span
                            >
                        </div>
                        <div
                            class="flex flex-col gap-4 sm:flex-row sm:items-start"
                        >
                            <div class="flex min-w-0 flex-1 items-start gap-3">
                                <img
                                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80"
                                    alt="Course workspace illustration"
                                    class="h-16 w-20 shrink-0 rounded-lg object-cover"
                                />
                                <div class="min-w-0">
                                    <h3 class="text-sm leading-6 font-semibold">
                                        Full-Stack Web Development with Node.js
                                        &amp; React
                                    </h3>
                                    <p
                                        class="mt-1 text-xs leading-5 text-slate-500"
                                    >
                                        Instructor:
                                        <span class="font-medium text-slate-700"
                                            >Ahmed Mansour</span
                                        >
                                    </p>
                                </div>
                            </div>
                            <div class="shrink-0 sm:text-right">
                                <p class="text-xs leading-5 text-slate-500">
                                    Amount Due
                                </p>
                                <p class="text-xl leading-7 font-semibold">
                                    2,400
                                    <span class="text-xs text-teal-800"
                                        >EGP</span
                                    >
                                </p>
                                <p class="text-xs leading-5 text-slate-500">
                                    One-time payment
                                </p>
                            </div>
                        </div>
                        <section
                            aria-labelledby="cancellation-details"
                            class="grid gap-3 rounded-lg bg-white p-4"
                        >
                            <h2 id="cancellation-details" class="sr-only">
                                Cancellation details
                            </h2>
                            <div>
                                <p class="text-xs leading-5 text-slate-500">
                                    Payment method attempted
                                </p>
                                <p class="mt-1 text-sm leading-6 font-medium">
                                    Hosted payment page
                                </p>
                            </div>
                            <div>
                                <p class="text-xs leading-5 text-slate-500">
                                    Cancellation source
                                </p>
                                <p class="mt-1 text-sm leading-6 font-medium">
                                    Exited payment flow (sample)
                                </p>
                            </div>
                        </section>
                    </div>
                    <div class="grid gap-3 sm:grid-cols-2">
                        <Button
                            as-child
                            class="h-11 bg-teal-700 text-white hover:bg-teal-800"
                            ><a href="/checkout"
                                ><RefreshCw
                                    class="size-4"
                                    aria-hidden="true"
                                />Return to Checkout</a
                            ></Button
                        >
                        <Button as-child variant="outline" class="h-11"
                            ><a href="/courses/show"
                                ><ArrowLeft
                                    class="size-4"
                                    aria-hidden="true"
                                />Back to Course</a
                            ></Button
                        >
                    </div>
                    <div
                        class="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-slate-50 p-4 text-xs leading-5"
                    >
                        <div class="flex items-center gap-2">
                            <Headphones
                                class="size-4 shrink-0 text-slate-500"
                                aria-hidden="true"
                            />
                            <div>
                                <p class="text-slate-500">Need assistance?</p>
                                <Button
                                    variant="link"
                                    class="h-auto p-0 text-xs leading-5 text-teal-800"
                                    @click="preview('Billing Support')"
                                    >Contact Billing Support</Button
                                >
                            </div>
                        </div>
                        <p class="text-slate-500">Sample Ref: TEST-EDF-94821</p>
                    </div>
                </CardContent>
            </Card>
        </main>
        <MarketplaceFooter @preview="preview" />
        <Sheet v-model:open="previewOpen"
            ><SheetContent class="bg-white text-slate-900"
                ><SheetHeader
                    ><SheetTitle>{{ previewTitle }}</SheetTitle
                    ><SheetDescription
                        >This page is coming soon. You are viewing a local
                        payment cancellation preview with sample
                        data.</SheetDescription
                    ></SheetHeader
                ><Button
                    class="mx-4 bg-teal-700 text-white hover:bg-teal-800"
                    @click="previewOpen = false"
                    >Back to payment status</Button
                ></SheetContent
            ></Sheet
        >
    </div>
</template>

<style scoped>
.payment-cancelled {
    font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
    color-scheme: light;
}
</style>
