<script setup lang="ts">
import { computed, ref } from "vue";
import InstructorLayout from "@/layouts/InstructorLayout.vue";
import InstructorTransactionTable from "@/components/InstructorTransactionTable.vue";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePurchasePreview } from "@/composables/usePurchasePreview";
import type { InstructorTransaction } from "@/types/instructor-consultations";
const { transactions } = usePurchasePreview();
const search = ref("");
const filter = ref("All");
const range = ref("all");
const records = computed<InstructorTransaction[]>(() => [
    ...transactions.value.map((item) => ({
        id: item.reference,
        kind: item.kind,
        learner:
            item.id === "career-advisory" ? "Sarah Al-Otaibi" : "Kareem Tarek",
        title: item.title,
        date: item.purchasedAt,
        amount: item.amount,
        currency: item.currency,
        status: item.amount
            ? ("Paid sample" as const)
            : ("Free activity" as const),
    })),
    {
        id: "EDF-DEMO-REFUND",
        kind: "course",
        learner: "Tarek Zaki",
        title: transactions.value[0]?.title ?? "Course",
        date: "2026-10-08T12:00:00Z",
        amount: 2400,
        currency: "EGP",
        status: "Refunded sample",
    },
]);
const visible = computed(() =>
    records.value.filter((item) => {
        const age = Date.now() - Date.parse(item.date);
        return (
            (range.value === "all" ||
                (age >= 0 && age <= Number(range.value) * 86400000)) &&
            (filter.value === "All" ||
                (filter.value === "Refunds"
                    ? item.status === "Refunded sample"
                    : filter.value === "Courses"
                      ? item.kind === "course"
                      : item.kind === "consultation")) &&
            `${item.id} ${item.learner} ${item.title}`
                .toLowerCase()
                .includes(search.value.trim().toLowerCase())
        );
    }),
);
const gross = (currency: string) =>
    visible.value
        .filter(
            (item) =>
                item.currency === currency && item.status === "Paid sample",
        )
        .reduce((sum, item) => sum + item.amount, 0);
function exportLedger() {
    const rows = [
        [
            "Reference",
            "Type",
            "Learner",
            "Item",
            "Date",
            "Amount",
            "Currency",
            "Status",
        ],
        ...visible.value.map((item) => [
            item.id,
            item.kind,
            item.learner,
            item.title,
            item.date,
            String(item.amount),
            item.currency,
            item.status,
        ]),
    ];
    const csv = rows
        .map((row) =>
            row
                .map(
                    (cell) =>
                        `"${(/^[=+@\-\t\r]/.test(cell) ? "'" : "") + cell.replaceAll('"', '""')}"`,
                )
                .join(","),
        )
        .join("\r\n");
    const url = URL.createObjectURL(
        new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "eduforce-sample-ledger.csv";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}
</script>
<template>
    <InstructorLayout
        title="Earnings & Financial Transactions"
        active="earnings"
        description="Review illustrative course sales and consultation records."
    >
        <div class="flex flex-wrap items-end justify-end gap-3">
            <div class="space-y-2">
                <Label for="ledger-range">Date range</Label
                ><Select v-model="range"
                    ><SelectTrigger id="ledger-range" class="w-44"
                        ><SelectValue /></SelectTrigger
                    ><SelectContent
                        ><SelectItem value="all">All sample dates</SelectItem
                        ><SelectItem value="30">Last 30 days</SelectItem
                        ><SelectItem value="7"
                            >Last 7 days</SelectItem
                        ></SelectContent
                    ></Select
                >
            </div>
            <Button
                class="bg-teal-700 text-white hover:bg-teal-800"
                @click="exportLedger"
                >Export sample CSV</Button
            >
        </div>
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Card
                ><CardContent class="space-y-4 p-5"
                    ><p class="text-xs font-semibold text-slate-500">
                        SAMPLE GROSS VOLUME
                    </p>
                    <p class="text-2xl font-bold">
                        {{ gross("EGP").toLocaleString("en-US") }}
                        <span class="text-sm">EGP</span>
                    </p>
                    <p class="text-xl font-semibold">
                        {{ gross("SAR").toLocaleString("en-US") }}
                        <span class="text-sm">SAR</span>
                    </p>
                    <p class="text-xs text-slate-500">
                        Paid sample records in current filters. Currencies are
                        kept separate.
                    </p></CardContent
                ></Card
            ><Card
                ><CardContent class="space-y-4 p-5"
                    ><p class="text-xs font-semibold text-slate-500">
                        PLATFORM COMMISSION
                    </p>
                    <p class="text-xl font-semibold">Not configured</p>
                    <p class="text-sm leading-6 text-slate-500">
                        Course and consultation rates are still undecided. No
                        fee is calculated.
                    </p></CardContent
                ></Card
            ><Card
                ><CardContent class="space-y-4 p-5"
                    ><p class="text-xs font-semibold text-slate-500">
                        NET PROCEEDS
                    </p>
                    <p class="text-xl font-semibold">Unavailable</p>
                    <p class="text-sm leading-6 text-slate-500">
                        Requires confirmed commission rates and gateway
                        integration.
                    </p></CardContent
                ></Card
            ><Card class="bg-teal-50"
                ><CardContent class="space-y-4 p-5"
                    ><p class="font-semibold text-teal-900">
                        Direct settlement plan
                    </p>
                    <p class="text-sm leading-6 text-teal-900">
                        Settlement is intended through the payment gateway.
                        Provider, timing and split-payment mechanics remain
                        unverified.
                    </p>
                    <p class="text-xs text-teal-800">
                        No wallet or withdrawal requests.
                    </p></CardContent
                ></Card
            >
        </div>
        <div class="rounded-xl border border-slate-200 bg-white p-5">
            <h2 class="font-semibold">Payment and settlement</h2>
            <p class="mt-2 text-sm leading-6 text-slate-500">
                Learner payment → platform commission → instructor proceeds.
                This describes the intended flow; this preview processes no
                payments.
            </p>
        </div>
        <div class="flex flex-wrap items-center justify-between gap-3">
            <Tabs v-model="filter"
                ><TabsList class="h-auto flex-wrap"
                    ><TabsTrigger
                        v-for="item in [
                            'All',
                            'Courses',
                            'Consultations',
                            'Refunds',
                        ]"
                        :key="item"
                        :value="item"
                        >{{ item }}</TabsTrigger
                    ></TabsList
                ></Tabs
            >
            <div class="w-full space-y-2 sm:w-72">
                <Label for="ledger-search">Search records</Label
                ><Input
                    id="ledger-search"
                    v-model="search"
                    placeholder="Learner, reference or item"
                />
            </div>
        </div>
        <InstructorTransactionTable :transactions="visible" />
        <p class="text-xs text-slate-500">
            {{ visible.length }} sample records · Free sessions are activity
            records, not settlements. Refunded records are excluded from sample
            gross volume.
        </p>
    </InstructorLayout>
</template>
