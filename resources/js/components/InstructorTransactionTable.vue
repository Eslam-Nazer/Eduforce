<script setup lang="ts">
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { InstructorTransaction } from "@/types/instructor-consultations";
defineProps<{ transactions: InstructorTransaction[] }>();
</script>
<template>
    <div class="min-w-0 rounded-xl border border-slate-200 bg-white p-4">
        <Table class="min-w-[980px]">
            <TableCaption
                >Illustrative records only. No gateway settlements are
                connected.</TableCaption
            >
            <TableHeader
                ><TableRow
                    ><TableHead
                        v-for="label in [
                            'Reference',
                            'Type',
                            'Learner',
                            'Item / Service',
                            'Date',
                            'Gross amount',
                            'Platform fee',
                            'Net proceeds',
                            'Status',
                        ]"
                        :key="label"
                        >{{ label }}</TableHead
                    ></TableRow
                ></TableHeader
            >
            <TableBody>
                <TableRow v-for="item in transactions" :key="item.id">
                    <TableCell class="font-mono text-xs">{{
                        item.id
                    }}</TableCell
                    ><TableCell class="capitalize">{{ item.kind }}</TableCell
                    ><TableCell>{{ item.learner }}</TableCell
                    ><TableCell class="max-w-60 whitespace-normal">{{
                        item.title
                    }}</TableCell
                    ><TableCell>{{
                        new Date(item.date).toLocaleDateString("en-GB", {
                            timeZone: "Africa/Cairo",
                        })
                    }}</TableCell
                    ><TableCell class="whitespace-nowrap">{{
                        item.amount
                            ? `${item.amount.toLocaleString("en-US")} ${item.currency}`
                            : "Free"
                    }}</TableCell
                    ><TableCell>{{
                        item.amount ? "Not configured" : "—"
                    }}</TableCell
                    ><TableCell>—</TableCell
                    ><TableCell
                        ><Badge variant="secondary">{{
                            item.status
                        }}</Badge></TableCell
                    >
                </TableRow>
                <TableRow v-if="!transactions.length"
                    ><TableCell
                        :colspan="9"
                        class="py-10 text-center text-slate-500"
                        >No records match these filters.</TableCell
                    ></TableRow
                >
            </TableBody>
        </Table>
    </div>
</template>
