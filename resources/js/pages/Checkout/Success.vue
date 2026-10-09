<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import { ref } from 'vue';
import {
    ArrowRight,
    BookOpen,
    Check,
    CircleCheck,
    Copy,
    FileCode,
    Hash,
    Headphones,
    Infinity as InfinityIcon,
    Receipt,
    RotateCcw,
    UserRound,
    Video,
} from '@lucide/vue';
import MarketplaceHeader from '@/components/MarketplaceHeader.vue';
import MarketplaceFooter from '@/components/MarketplaceFooter.vue';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import type { Currency } from '@/types';

const currency = ref<Currency>('EGP');
const reference = 'TEST-PAY-98421';
const copied = ref(false);
const copyMessage = ref('');
const previewOpen = ref(false);
const previewTitle = ref('');
function preview(title: string) {
    previewTitle.value = title;
    previewOpen.value = true;
}
async function copyReference() {
    try {
        await navigator.clipboard.writeText(reference);
        copied.value = true;
        copyMessage.value = 'Payment reference copied.';
    } catch {
        copied.value = false;
        copyMessage.value =
            'Copy is unavailable. You can select and copy the reference above.';
    }
}
</script>

<template>
    <Head title="Payment Success" />
    <div class="payment-success min-h-screen bg-[#f8fafc] text-slate-900">
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
            <Card class="border-0 bg-white shadow-sm">
                <CardContent class="space-y-6 p-5 sm:p-8">
                    <div class="text-center">
                        <div
                            class="mx-auto flex size-16 items-center justify-center rounded-full bg-teal-50"
                        >
                            <CircleCheck
                                class="size-10 text-teal-700"
                                aria-hidden="true"
                            />
                        </div>
                        <p
                            class="mt-5 text-xs leading-5 font-semibold tracking-wide text-teal-800"
                        >
                            TRANSACTION COMPLETE
                        </p>
                        <h1
                            class="mt-3 text-3xl font-bold tracking-tight"
                        >
                            Payment successful
                        </h1>
                        <Badge
                            variant="secondary"
                            class="mt-3 bg-teal-50 text-teal-800"
                            ><Check class="size-3" aria-hidden="true" />Test
                            payment success preview</Badge
                        >
                        <p
                            class="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500"
                        >
                            Preview of your course purchase confirmation. No
                            payment was processed, course access activated or
                            receipt emailed.
                        </p>
                    </div>
                    <div class="rounded-lg bg-slate-100 p-4">
                        <div
                            class="flex flex-wrap items-center justify-between gap-3"
                        >
                            <div class="flex items-center gap-3">
                                <Hash
                                    class="size-5 shrink-0 text-teal-700"
                                    aria-hidden="true"
                                />
                                <div>
                                    <p
                                        class="text-xs leading-5 font-medium text-slate-500"
                                    >
                                        PAYMENT REFERENCE
                                    </p>
                                    <p class="mt-1 text-sm font-semibold">
                                        {{ reference }}
                                        <span class="font-normal text-slate-500"
                                            >(Sample)</span
                                        >
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                @click="copyReference"
                                ><Copy class="size-4" aria-hidden="true" />{{
                                    copied ? 'Copied' : 'Copy Ref'
                                }}</Button
                            >
                        </div>
                        <p
                            v-if="copyMessage"
                            role="status"
                            class="mt-2 text-xs leading-5 text-slate-600"
                        >
                            {{ copyMessage }}
                        </p>
                    </div>
                    <div
                        class="flex items-start gap-4 rounded-lg border border-slate-100 p-4"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80"
                            alt="Course workspace illustration"
                            class="h-16 w-20 shrink-0 rounded-lg object-cover"
                        />
                        <div class="min-w-0">
                            <Badge
                                variant="secondary"
                                class="bg-teal-50 text-[10px] text-teal-800"
                                >Development</Badge
                            >
                            <h2
                                class="mt-2 text-sm leading-6 font-semibold"
                            >
                                Full-Stack Web Development with Node.js &amp;
                                React
                            </h2>
                            <p
                                class="mt-2 flex items-center gap-1 text-xs leading-5 text-slate-500"
                            >
                                <UserRound
                                    class="size-3 shrink-0"
                                    aria-hidden="true"
                                />Instructor: Ahmed Mansour
                            </p>
                        </div>
                    </div>
                    <div class="rounded-lg bg-slate-100 p-4 text-sm">
                        <dl class="space-y-4">
                            <div class="flex flex-wrap justify-between gap-2">
                                <dt class="text-slate-500">Access</dt>
                                <dd
                                    class="flex items-center gap-1 text-teal-800"
                                >
                                    <InfinityIcon
                                        class="size-4"
                                        aria-hidden="true"
                                    />Lifetime access (sample)
                                </dd>
                            </div>
                            <div class="flex flex-wrap justify-between gap-2">
                                <dt class="text-slate-500">Payment Method</dt>
                                <dd>Hosted gateway — test preview</dd>
                            </div>
                            <div class="flex flex-wrap justify-between gap-2">
                                <dt class="text-slate-500">Date &amp; Time</dt>
                                <dd>Oct 7, 2026 · 14:32 (sample)</dd>
                            </div>
                        </dl>
                        <Separator class="my-5 bg-slate-200" />
                        <div
                            class="flex flex-wrap items-center justify-between gap-3"
                        >
                            <div>
                                <p class="font-semibold">Total Amount Paid</p>
                                <p class="mt-1 text-xs leading-5 text-slate-500">
                                    Illustrative payment amount
                                </p>
                            </div>
                            <div class="text-right">
                                <p class="text-xl font-semibold">2,400 EGP</p>
                                <p
                                    class="mt-1 text-[10px] font-medium text-teal-800"
                                >
                                    ONE-TIME PAYMENT
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="grid gap-3 sm:grid-cols-3">
                        <div
                            class="flex items-center gap-3 rounded-lg bg-teal-50 p-3"
                        >
                            <Video
                                class="size-5 shrink-0 text-teal-700"
                                aria-hidden="true"
                            />
                            <div>
                                <p class="text-xs leading-5 font-semibold">
                                    23 video lessons
                                </p>
                                <p class="mt-1 text-[10px] text-slate-500">
                                    Full course curriculum
                                </p>
                            </div>
                        </div>
                        <div
                            class="flex items-center gap-3 rounded-lg bg-teal-50 p-3"
                        >
                            <FileCode
                                class="size-5 shrink-0 text-teal-700"
                                aria-hidden="true"
                            />
                            <div>
                                <p class="text-xs leading-5 font-semibold">
                                    Course resources
                                </p>
                                <p class="mt-1 text-[10px] text-slate-500">
                                    Practice files
                                </p>
                            </div>
                        </div>
                        <div
                            class="flex items-center gap-3 rounded-lg bg-teal-50 p-3"
                        >
                            <BookOpen
                                class="size-5 shrink-0 text-teal-700"
                                aria-hidden="true"
                            />
                            <div>
                                <p class="text-xs leading-5 font-semibold">Final exam</p>
                                <p class="mt-1 text-[10px] text-slate-500">
                                    Certificate on completion
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-3">
                        <Button
                            class="h-11 flex-1 bg-teal-700 text-white hover:bg-teal-800"
                            @click="preview('Start Learning')"
                            >Start Learning<ArrowRight
                                class="size-4"
                                aria-hidden="true"
                        /></Button>
                        <Button
                            variant="outline"
                            class="h-11 flex-1"
                            @click="preview('My Courses')"
                            ><BookOpen class="size-4" aria-hidden="true" />My
                            Courses</Button
                        >
                        <TooltipProvider
                            ><Tooltip
                                ><TooltipTrigger as-child
                                    ><Button
                                        variant="secondary"
                                        class="size-11 bg-slate-100"
                                        aria-label="View sample receipt"
                                        @click="preview('Sample receipt')"
                                        ><Receipt
                                            class="size-4"
                                            aria-hidden="true" /></Button></TooltipTrigger
                                ><TooltipContent
                                    >View sample receipt</TooltipContent
                                ></Tooltip
                            ></TooltipProvider
                        >
                    </div>
                    <Alert class="border-0 bg-slate-100"
                        ><RotateCcw class="size-4 text-teal-700" /><AlertTitle
                            >Refund policy</AlertTitle
                        ><AlertDescription
                            >Request a refund within 14 days of purchase,
                            provided you have completed no more than 3 videos.
                            Completing the fourth video makes the course
                            ineligible.</AlertDescription
                        ></Alert
                    >
                </CardContent>
            </Card>
            <div
                class="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-slate-100 p-4 text-xs leading-5 text-slate-500"
            >
                <p class="flex items-center gap-2">
                    <Headphones
                        class="size-4 text-teal-700"
                        aria-hidden="true"
                    />Questions about billing or access?
                </p>
                <Button
                    variant="link"
                    class="h-auto p-0 text-xs leading-5 text-teal-800"
                    @click="preview('Student Support')"
                    >Contact Student Support<ArrowRight
                        class="size-3"
                        aria-hidden="true"
                /></Button>
            </div>
        </main>
        <MarketplaceFooter @preview="preview" />
        <Sheet v-model:open="previewOpen"
            ><SheetContent class="bg-white text-slate-900"
                ><SheetHeader
                    ><SheetTitle>{{ previewTitle }}</SheetTitle
                    ><SheetDescription v-if="previewTitle === 'Sample receipt'"
                        >Sample reference: {{ reference }}. Course: Full-Stack
                        Web Development with Node.js &amp; React. Amount: 2,400
                        EGP. Buyer: kareem.tarek@example.com. This preview is
                        not a payment receipt or tax invoice.</SheetDescription
                    ><SheetDescription v-else
                        >This page is coming soon. You are viewing a local
                        payment success preview with sample
                        data.</SheetDescription
                    ></SheetHeader
                ><Button
                    class="mx-4 bg-teal-700 text-white hover:bg-teal-800"
                    @click="previewOpen = false"
                    >Back to confirmation</Button
                ></SheetContent
            ></Sheet
        >
    </div>
</template>

<style scoped>
.payment-success {
    font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
    color-scheme: light;
}
</style>
