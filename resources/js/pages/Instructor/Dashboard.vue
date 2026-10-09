<script setup lang="ts">
import { computed } from "vue";
import { router } from "@inertiajs/vue3";
import InstructorLayout from "@/layouts/InstructorLayout.vue";
import InstructorCourseCard from "@/components/InstructorCourseCard.vue";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableHeader,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableCaption,
} from "@/components/ui/table";
import { useInstructorWorkspace } from "@/composables/useInstructorWorkspace";
import {
    usePurchasePreview,
    formatPurchaseAmount,
} from "@/composables/usePurchasePreview";
import { sampleConsultationRequests } from "@/data/sample-consultation-requests";
const { courses, notice, createCourse } = useInstructorWorkspace();
const { transactions } = usePurchasePreview();
const gross = (currency: string) =>
    transactions.value
        .filter((item) => item.currency === currency)
        .reduce((sum, item) => sum + item.amount, 0);
const published = computed(() =>
    courses.value.filter((course) => course.status === "Published"),
);
const pending = sampleConsultationRequests.filter((request) =>
    ["Requested", "Discussing"].includes(request.status),
);
function create() {
    const id = createCourse();
    if (id) router.visit(`/instructor/courses/${id}/basics`);
}
</script>
<template>
    <InstructorLayout
        title="Instructor Dashboard"
        active="dashboard"
        description="Welcome back, Ahmed. Review your course and consultation workspace."
        ><div class="flex flex-wrap justify-end gap-3">
            <Button as-child variant="outline"
                ><a href="/instructor/courses">Manage courses</a></Button
            ><Button
                class="bg-teal-700 text-white hover:bg-teal-800"
                @click="create"
                >Create new course</Button
            >
        </div>
        <p v-if="notice" role="status" class="text-sm text-teal-800">
            {{ notice }}
        </p>
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Card
                v-for="metric in [
                    { label: 'Published courses', value: published.length },
                    {
                        label: 'Draft courses',
                        value: courses.length - published.length,
                    },
                    {
                        label: 'Sample gross · EGP',
                        value: gross('EGP').toLocaleString('en-US'),
                    },
                    {
                        label: 'Sample gross · SAR',
                        value: gross('SAR').toLocaleString('en-US'),
                    },
                ]"
                :key="metric.label"
                class="bg-white"
                ><CardContent class="p-5"
                    ><p class="text-xs text-slate-500">{{ metric.label }}</p>
                    <p class="mt-3 text-3xl font-bold">
                        {{ metric.value }}
                    </p></CardContent
                ></Card
            >
        </div>
        <div class="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <section class="space-y-5">
                <h2 class="text-lg font-semibold">Published courses</h2>
                <InstructorCourseCard
                    v-for="course in published"
                    :key="course.id"
                    :course="course"
                />
                <p
                    v-if="!published.length"
                    class="rounded-lg border bg-white p-5 text-sm text-slate-500"
                >
                    No published course previews yet.
                </p>
                <Card class="overflow-hidden bg-white"
                    ><CardContent class="p-5"
                        ><h2 class="mb-4 text-lg font-semibold">
                            Recent sample purchases
                        </h2>
                        <Table
                            ><TableCaption
                                >Illustrative records, not live
                                sales.</TableCaption
                            ><TableHeader
                                ><TableRow
                                    ><TableHead>Student</TableHead
                                    ><TableHead>Course / service</TableHead
                                    ><TableHead>Amount</TableHead></TableRow
                                ></TableHeader
                            ><TableBody
                                ><TableRow
                                    v-for="transaction in transactions"
                                    :key="transaction.id"
                                    ><TableCell>Kareem Tarek</TableCell
                                    ><TableCell
                                        class="min-w-48 whitespace-normal"
                                        >{{ transaction.title }}</TableCell
                                    ><TableCell class="whitespace-nowrap">{{
                                        formatPurchaseAmount(transaction)
                                    }}</TableCell></TableRow
                                ></TableBody
                            ></Table
                        ></CardContent
                    ></Card
                >
            </section>
            <aside class="space-y-5">
                <Card class="bg-white"
                    ><CardContent class="space-y-3 p-5"
                        ><h2 class="font-semibold">Consultation requests</h2>
                        <p class="text-3xl font-bold">{{ pending.length }}</p>
                        <p class="text-sm leading-6 text-slate-500">
                            Sample requests needing a response. Instructor
                            request management is part of section 07.
                        </p>
                        <Button as-child variant="outline" class="w-full"
                            ><a href="/consultations/requests"
                                >View request scenarios</a
                            ></Button
                        ></CardContent
                    ></Card
                ><Card class="bg-white"
                    ><CardContent class="space-y-3 p-5"
                        ><h2 class="font-semibold">Instructor publishing</h2>
                        <p class="text-sm leading-6 text-slate-500">
                            Approved instructors decide when their courses are
                            ready to publish. Course review by an administrator
                            is deferred.
                        </p>
                        <p class="text-xs leading-5 text-slate-500">
                            Revenue is displayed separately by currency. Payment
                            and gateway settlement are not connected to this
                            preview.
                        </p></CardContent
                    ></Card
                >
            </aside>
        </div></InstructorLayout
    >
</template>
