<script setup lang="ts">
import { Head, router } from "@inertiajs/vue3";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { Check, RotateCcw } from "@lucide/vue";
import MarketplaceHeader from "@/components/MarketplaceHeader.vue";
import MarketplaceFooter from "@/components/MarketplaceFooter.vue";
import RefundRequestForm from "@/components/RefundRequestForm.vue";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import {
    formatPurchaseAmount,
    refundEligibility,
    usePurchasePreview,
} from "@/composables/usePurchasePreview";
import type { RefundDraft } from "@/types/purchase";
import type { Currency } from "@/types/course";
const { transactions } = usePurchasePreview();
const currency = ref<Currency>("EGP");
const now = ref(Date.now());
let timer: ReturnType<typeof setInterval>;
onMounted(() => {
    timer = setInterval(() => {
        now.value = Date.now();
    }, 60000);
});
onUnmounted(() => clearInterval(timer));
const requestedId =
    typeof window === "undefined"
        ? null
        : new URLSearchParams(window.location.search).get("transaction");
const selectedId = ref(
    requestedId ??
        transactions.value.find(
            (item) => refundEligibility(item, now.value).eligible,
        )?.id ??
        "",
);
const selected = computed(() =>
    transactions.value.find((item) => item.id === selectedId.value),
);
const eligibility = computed(() =>
    selected.value ? refundEligibility(selected.value, now.value) : null,
);
const sheetOpen = ref(false);
const sheetTitle = ref("");
const draft = ref<RefundDraft | null>(null);
const saved = ref<RefundDraft | null>(null);
const draftTransaction = computed(() =>
    transactions.value.find((item) => item.id === draft.value?.transactionId),
);
const canSave = computed(
    () =>
        !!draftTransaction.value &&
        refundEligibility(draftTransaction.value, now.value).eligible,
);
const savedTransaction = computed(() =>
    transactions.value.find((item) => item.id === saved.value?.transactionId),
);
function preview(title: string) {
    draft.value = null;
    sheetTitle.value = title;
    sheetOpen.value = true;
}
function review(value: RefundDraft) {
    if (
        !selected.value ||
        !eligibility.value?.eligible ||
        value.transactionId !== selected.value.id
    )
        return;
    draft.value = value;
    sheetTitle.value = "Review refund request";
    sheetOpen.value = true;
}
function save() {
    if (!draft.value || !canSave.value) return;
    saved.value = { ...draft.value };
    sheetOpen.value = false;
}
</script>
<template>
    <Head title="Request a Refund" />
    <div class="min-h-screen bg-slate-50 text-slate-900">
        <MarketplaceHeader
            v-model:currency="currency"
            account-name="Kareem Tarek"
            browse-href="/"
            @browse="router.visit('/')"
            @preview="preview"
        />
        <main class="mx-auto max-w-7xl space-y-6 px-5 py-8 sm:px-8">
            <nav
                aria-label="Breadcrumb"
                class="flex flex-wrap gap-2 text-sm text-slate-500"
            >
                <a href="/" class="text-teal-800">Home</a><span>/</span
                ><a href="/purchase-history" class="text-teal-800"
                    >Purchase History</a
                ><span>/</span><span aria-current="page">Refund Request</span>
            </nav>
            <div>
                <h1 class="text-3xl font-bold">Request a Refund</h1>
                <p class="mt-2 text-sm leading-6 text-slate-600">
                    Choose a purchase and review its refund eligibility.
                </p>
            </div>
            <p
                class="rounded-lg border border-teal-100 bg-teal-50 p-4 text-sm leading-6 text-teal-900"
            >
                Local preview only. Saving a request does not send it for review
                or initiate a payment refund. This preview resets when you leave
                the page.
            </p>
            <div
                class="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]"
            >
                <div class="space-y-6">
                    <Card class="border-slate-200 bg-white shadow-sm"
                        ><CardContent class="space-y-5 p-5 sm:p-6"
                            ><h2 class="text-lg font-semibold">
                                1. Select a transaction
                            </h2>
                            <RadioGroup v-model="selectedId" class="space-y-3"
                                ><div
                                    v-for="item in transactions"
                                    :key="item.id"
                                    class="flex items-start gap-3 rounded-lg border p-4"
                                    :class="
                                        selectedId === item.id
                                            ? 'border-teal-600 bg-teal-50/40'
                                            : 'border-slate-200'
                                    "
                                >
                                    <RadioGroupItem
                                        :id="`refund-${item.id}`"
                                        :value="item.id"
                                        :disabled="
                                            !refundEligibility(item, now)
                                                .eligible
                                        "
                                        class="mt-1"
                                    /><Label
                                        :for="`refund-${item.id}`"
                                        class="min-w-0 flex-1 font-normal"
                                        ><span
                                            class="flex flex-wrap items-start justify-between gap-3"
                                            ><span
                                                class="font-semibold leading-6"
                                                >{{ item.title }}</span
                                            ><span
                                                class="shrink-0 font-semibold"
                                                >{{
                                                    formatPurchaseAmount(item)
                                                }}</span
                                            ></span
                                        ><span
                                            class="mt-2 block text-xs text-slate-500"
                                            >{{ item.reference }} ·
                                            {{ item.instructor }}</span
                                        ><span
                                            class="mt-2 block text-xs leading-5"
                                            :class="
                                                refundEligibility(item, now)
                                                    .eligible
                                                    ? 'text-teal-800'
                                                    : 'text-slate-500'
                                            "
                                            >{{
                                                refundEligibility(item, now)
                                                    .reason
                                            }}</span
                                        ></Label
                                    >
                                </div></RadioGroup
                            >
                            <p
                                v-if="!selected"
                                role="status"
                                class="text-sm text-amber-800"
                            >
                                {{
                                    requestedId
                                        ? "The requested transaction was not found. Select an eligible purchase above."
                                        : "There are no eligible transactions to select."
                                }}
                            </p>
                            <p
                                v-else-if="!eligibility?.eligible"
                                role="status"
                                class="text-sm text-amber-800"
                            >
                                This transaction is not eligible. Choose an
                                eligible purchase above.
                            </p></CardContent
                        ></Card
                    >
                    <Card
                        v-if="selected && eligibility?.eligible"
                        class="border-slate-200 bg-white shadow-sm"
                        ><CardContent class="space-y-5 p-5 sm:p-6"
                            ><h2 class="text-lg font-semibold">
                                2. Request details
                            </h2>
                            <RefundRequestForm
                                :key="selected.id"
                                :transaction="selected"
                                :eligible="eligibility.eligible"
                                @review="review" /></CardContent
                    ></Card>
                </div>
                <aside class="space-y-6">
                    <Card class="border-slate-200 bg-white shadow-sm"
                        ><CardContent class="space-y-4 p-5"
                            ><RotateCcw class="size-6 text-teal-700" />
                            <h2 class="text-lg font-semibold">Refund policy</h2>
                            <div class="text-sm leading-6">
                                <h3 class="font-semibold">Courses</h3>
                                <p class="mt-1 text-slate-500">
                                    Within 14 days of purchase and no more than
                                    3 completed videos.
                                </p>
                            </div>
                            <div class="text-sm leading-6">
                                <h3 class="font-semibold">
                                    Paid consultations
                                </h3>
                                <p class="mt-1 text-slate-500">
                                    At least 24 hours before the agreed
                                    appointment. Completed consultations are not
                                    eligible.
                                </p>
                            </div>
                            <p class="text-xs leading-5 text-slate-500">
                                Amounts are shown in the original purchase
                                currency. Free services are excluded.
                            </p></CardContent
                        ></Card
                    >
                    <Card
                        v-if="saved && savedTransaction"
                        class="border-teal-200 bg-white shadow-sm"
                        ><CardContent class="space-y-4 p-5"
                            ><Badge class="bg-teal-50 text-teal-800"
                                >Local draft saved</Badge
                            >
                            <h2 class="font-semibold">Your request preview</h2>
                            <p class="text-sm leading-6">
                                {{ savedTransaction.title }}
                            </p>
                            <p class="text-xl font-bold">
                                {{ formatPurchaseAmount(savedTransaction) }}
                            </p>
                            <div
                                class="flex items-center gap-2 text-sm text-teal-800"
                                role="status"
                            >
                                <Check class="size-4" />Saved on this page
                            </div>
                            <p class="text-sm text-slate-500">
                                {{ saved.reason }}
                            </p>
                            <p
                                v-if="saved.details"
                                class="text-sm leading-6 break-words whitespace-pre-wrap"
                            >
                                {{ saved.details }}
                            </p>
                            <p class="text-xs leading-5 text-slate-500">
                                No review decision or refund has taken place.
                            </p></CardContent
                        ></Card
                    >
                </aside>
            </div>
        </main>
        <MarketplaceFooter @preview="preview" />
        <Sheet v-model:open="sheetOpen"
            ><SheetContent class="overflow-y-auto bg-white text-slate-900"
                ><SheetHeader
                    ><SheetTitle>{{ sheetTitle }}</SheetTitle
                    ><SheetDescription>{{
                        draft
                            ? "Check the details before saving a local preview."
                            : "This action is a frontend preview."
                    }}</SheetDescription></SheetHeader
                >
                <div
                    v-if="draft && draftTransaction"
                    class="space-y-5 px-4 py-6"
                >
                    <h3 class="font-semibold leading-6">
                        {{ draftTransaction.title }}
                    </h3>
                    <p class="text-xl font-bold">
                        {{ formatPurchaseAmount(draftTransaction) }}
                    </p>
                    <p class="text-sm text-slate-500">
                        {{ draftTransaction.reference }} ·
                        {{ draftTransaction.instructor }}
                    </p>
                    <div>
                        <p class="text-xs text-slate-500">Reason</p>
                        <p class="mt-1 text-sm">{{ draft.reason }}</p>
                    </div>
                    <div v-if="draft.details">
                        <p class="text-xs text-slate-500">Additional details</p>
                        <p
                            class="mt-1 text-sm leading-6 break-words whitespace-pre-wrap"
                        >
                            {{ draft.details }}
                        </p>
                    </div>
                    <p
                        v-if="!canSave"
                        role="alert"
                        class="text-sm text-amber-800"
                    >
                        This transaction is no longer eligible.
                    </p>
                    <Button
                        :disabled="!canSave"
                        class="w-full bg-teal-700 text-white hover:bg-teal-800"
                        @click="save"
                        >Save local preview</Button
                    ><Button
                        variant="outline"
                        class="w-full"
                        @click="sheetOpen = false"
                        >Back to form</Button
                    >
                </div></SheetContent
            ></Sheet
        >
    </div>
</template>
