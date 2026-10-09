<script setup lang="ts">
import { Head, router } from "@inertiajs/vue3";
import { computed, onMounted, onUnmounted, ref } from "vue";
import MarketplaceHeader from "@/components/MarketplaceHeader.vue";
import MarketplaceFooter from "@/components/MarketplaceFooter.vue";
import PurchaseTransactionCard from "@/components/PurchaseTransactionCard.vue";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import {
    usePurchasePreview,
    formatPurchaseAmount,
} from "@/composables/usePurchasePreview";
import type { PurchaseTransaction } from "@/types/purchase";
import type { Currency } from "@/types/course";
const { transactions } = usePurchasePreview();
const currency = ref<Currency>("EGP");
const filter = ref("all");
const visible = computed(() =>
    transactions.value.filter(
        (item) => filter.value === "all" || item.kind === filter.value,
    ),
);
const now = ref(Date.now());
let timer: ReturnType<typeof setInterval>;
onMounted(() => {
    timer = setInterval(() => {
        now.value = Date.now();
    }, 60000);
});
onUnmounted(() => clearInterval(timer));
const receipt = ref<PurchaseTransaction | null>(null);
const sheetTitle = ref("");
const sheetOpen = ref(false);
function preview(title: string) {
    receipt.value = null;
    sheetTitle.value = title;
    sheetOpen.value = true;
}
function showReceipt(transaction: PurchaseTransaction) {
    receipt.value = transaction;
    sheetTitle.value = "Purchase receipt";
    sheetOpen.value = true;
}
</script>
<template>
    <Head title="Purchase History" />
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
                class="flex gap-2 text-sm text-slate-500"
            >
                <a href="/" class="text-teal-800">Home</a><span>/</span
                ><span aria-current="page">Purchase History</span>
            </nav>
            <div>
                <h1 class="text-3xl font-bold">Purchase History</h1>
                <p class="mt-2 text-sm leading-6 text-slate-600">
                    Review your courses, consultation services and payment
                    records.
                </p>
            </div>
            <p
                class="rounded-lg border border-teal-100 bg-teal-50 p-4 text-sm leading-6 text-teal-900"
            >
                Illustrative transactions. Amounts stay in the original purchase
                currency. Course progress uses the learning preview saved in
                this tab.
            </p>
            <Tabs v-model="filter"
                ><TabsList class="h-auto flex-wrap"
                    ><TabsTrigger value="all"
                        >All transactions ({{
                            transactions.length
                        }})</TabsTrigger
                    ><TabsTrigger value="course">Courses</TabsTrigger
                    ><TabsTrigger value="consultation"
                        >Consultations</TabsTrigger
                    ></TabsList
                ></Tabs
            >
            <div class="space-y-5">
                <PurchaseTransactionCard
                    v-for="item in visible"
                    :key="item.id"
                    :transaction="item"
                    :now="now"
                    @receipt="showReceipt"
                />
                <p
                    v-if="!visible.length"
                    role="status"
                    class="rounded-lg border bg-white p-8 text-center text-sm text-slate-500"
                >
                    No transactions in this category.
                </p>
            </div>
            <div
                class="grid gap-5 rounded-xl border border-slate-200 bg-white p-5 text-sm leading-6 sm:grid-cols-2"
            >
                <div>
                    <h2 class="font-semibold">Course refunds</h2>
                    <p class="mt-2 text-slate-500">
                        Within 14 days of purchase, with no more than 3
                        completed videos. Completing the fourth video removes
                        eligibility.
                    </p>
                </div>
                <div>
                    <h2 class="font-semibold">Consultation refunds</h2>
                    <p class="mt-2 text-slate-500">
                        Cancel a paid consultation at least 24 hours before the
                        agreed appointment. Free services have no payment to
                        refund.
                    </p>
                </div>
            </div>
            <a href="/messages" class="text-sm font-medium text-teal-800"
                >Open messages →</a
            >
        </main>
        <MarketplaceFooter @preview="preview" />
        <Sheet v-model:open="sheetOpen"
            ><SheetContent class="overflow-y-auto bg-white text-slate-900"
                ><SheetHeader
                    ><SheetTitle>{{ sheetTitle }}</SheetTitle
                    ><SheetDescription>{{
                        receipt
                            ? "Sample receipt preview. This is not an issued invoice."
                            : "This action is a frontend preview."
                    }}</SheetDescription></SheetHeader
                >
                <dl v-if="receipt" class="space-y-5 px-4 py-6 text-sm">
                    <div>
                        <dt class="text-slate-500">Reference</dt>
                        <dd class="mt-1 font-semibold">
                            {{ receipt.reference }}
                        </dd>
                    </div>
                    <div>
                        <dt class="text-slate-500">Purchase</dt>
                        <dd class="mt-1 leading-6">{{ receipt.title }}</dd>
                    </div>
                    <div>
                        <dt class="text-slate-500">Instructor</dt>
                        <dd class="mt-1">{{ receipt.instructor }}</dd>
                    </div>
                    <div>
                        <dt class="text-slate-500">Paid amount</dt>
                        <dd class="mt-1 text-xl font-semibold">
                            {{ formatPurchaseAmount(receipt) }}
                        </dd>
                    </div>
                    <div>
                        <dt class="text-slate-500">Purchase date</dt>
                        <dd class="mt-1">
                            {{
                                new Date(
                                    receipt.purchasedAt,
                                ).toLocaleDateString("en-GB")
                            }}
                        </dd>
                    </div>
                </dl></SheetContent
            ></Sheet
        >
    </div>
</template>
