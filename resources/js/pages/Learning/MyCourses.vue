<script setup lang="ts">
import { Head, router } from "@inertiajs/vue3";
import { computed, ref } from "vue";
import { GraduationCap, FileText, MessageCircle } from "@lucide/vue";
import MarketplaceHeader from "@/components/MarketplaceHeader.vue";
import MarketplaceFooter from "@/components/MarketplaceFooter.vue";
import EnrolledCourseCard from "@/components/EnrolledCourseCard.vue";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import type { Currency } from "@/types/course";
import type { EnrolledCourse } from "@/types/learning";
import {
    sampleModules,
    sampleCourseTitle,
    sampleInstructor,
} from "@/data/sample-course";
import { useLearningPreview } from "@/composables/useLearningPreview";
const { completedIds, examPassed } = useLearningPreview();
const sampleVideos = sampleModules
    .flatMap((module) => module.lessons)
    .filter((lesson) => lesson.kind === "video");

const currency = ref<Currency>("EGP");
const filter = ref("all");
const previewOpen = ref(false);
const previewTitle = ref("");
const referenceDate = "2026-10-09T12:00:00+03:00";
const courses = computed<EnrolledCourse[]>(() => [
    {
        id: "full-stack",
        title: sampleCourseTitle,
        instructor: sampleInstructor,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=85",
        moduleCount: sampleModules.length,
        completedVideos: completedIds.value.length,
        totalVideos: sampleVideos.length,
        purchasedAt: "2026-10-07T12:00:00+03:00",
        orderReference: "EDF-DEMO-94821",
        amountPaid: 2400,
        paidCurrency: "EGP",
        exam: { passingScore: 70, passed: examPassed.value },
        nextLesson:
            sampleVideos.find(
                (lesson) => !completedIds.value.includes(lesson.id),
            ) ?? null,
    },
]);
const isCompleted = (course: EnrolledCourse) =>
    course.completedVideos === course.totalVideos &&
    (!course.exam || course.exam.passed);
const completedCount = computed(() => courses.value.filter(isCompleted).length);
const visibleCourses = computed(() =>
    courses.value.filter(
        (course) =>
            filter.value === "all" ||
            (filter.value === "completed"
                ? isCompleted(course)
                : !isCompleted(course)),
    ),
);
const filters = computed(() => [
    { value: "all", label: "All Courses", count: courses.value.length },
    {
        value: "progress",
        label: "In Progress",
        count: courses.value.length - completedCount.value,
    },
    { value: "completed", label: "Completed", count: completedCount.value },
]);
function preview(title: string) {
    if (title === "Course Certificate") {
        router.visit("/my-courses/full-stack/certificate");
        return;
    }
    if (title === "Course Exam") {
        router.visit("/my-courses/full-stack/exam");
        return;
    }
    if (title === "Continue Learning" || title === "Review Course") {
        router.visit("/my-courses/full-stack");
        return;
    }
    previewTitle.value = title;
    previewOpen.value = true;
}
</script>

<template>
    <Head title="My Courses" />
    <div class="my-courses min-h-screen bg-slate-50 text-slate-900">
        <MarketplaceHeader
            v-model:currency="currency"
            account-name="Kareem Tarek"
            @browse="router.visit('/')"
            @preview="preview"
        />
        <div class="bg-slate-100">
            <Breadcrumb class="mx-auto max-w-7xl px-5 py-4 sm:px-8"
                ><BreadcrumbList
                    ><BreadcrumbItem
                        ><BreadcrumbLink href="/"
                            >Home</BreadcrumbLink
                        ></BreadcrumbItem
                    ><BreadcrumbSeparator /><BreadcrumbItem
                        ><BreadcrumbPage
                            >My Courses</BreadcrumbPage
                        ></BreadcrumbItem
                    ></BreadcrumbList
                ></Breadcrumb
            >
        </div>
        <main class="mx-auto max-w-7xl space-y-7 px-5 py-8 sm:px-8 sm:py-10">
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">
                        My Enrolled Courses
                    </h1>
                    <p class="mt-3 text-sm leading-6 text-slate-500">
                        Track your progress and continue learning from your
                        purchased courses.
                    </p>
                </div>
                <Badge variant="secondary" class="bg-teal-50 text-teal-800"
                    >Sample learning data</Badge
                >
            </div>
            <Tabs v-model="filter" class="space-y-6">
                <TabsList
                    aria-label="Filter enrolled courses"
                    class="flex h-auto w-full flex-wrap justify-start gap-1 bg-slate-100 p-1 sm:w-fit"
                    ><TabsTrigger
                        v-for="item in filters"
                        :key="item.value"
                        :value="item.value"
                        class="min-h-11 gap-2 px-3 data-[state=active]:text-teal-800"
                        >{{ item.label
                        }}<Badge
                            variant="secondary"
                            class="bg-white text-slate-600"
                            >{{ item.count }}</Badge
                        ></TabsTrigger
                    ></TabsList
                >
                <TabsContent
                    v-for="item in filters"
                    :key="item.value"
                    :value="item.value"
                >
                    <div
                        v-if="visibleCourses.length"
                        class="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]"
                    >
                        <div class="min-w-0 space-y-6">
                            <EnrolledCourseCard
                                v-for="course in visibleCourses"
                                :key="course.id"
                                :course="course"
                                :reference-date="referenceDate"
                                @preview="preview"
                            />
                        </div>
                        <aside
                            class="space-y-5"
                            aria-label="Course exam and purchase details"
                        >
                            <template
                                v-for="course in visibleCourses"
                                :key="course.id"
                            >
                                <Card
                                    v-if="course.exam"
                                    class="border-slate-200 bg-white shadow-sm"
                                    ><CardHeader
                                        ><CardTitle
                                            class="flex items-center gap-2 text-lg"
                                            ><GraduationCap
                                                class="size-5 text-teal-700"
                                                aria-hidden="true"
                                            />Course Exam</CardTitle
                                        ></CardHeader
                                    ><CardContent class="space-y-4 text-sm"
                                        ><p class="leading-6 text-slate-500">
                                            The instructor has enabled an exam
                                            with a
                                            {{ course.exam.passingScore }}%
                                            passing score. Attempts are
                                            unlimited.
                                        </p>
                                        <Badge variant="secondary">{{
                                            course.exam.passed
                                                ? "Passed"
                                                : "Not yet passed"
                                        }}</Badge>
                                        <p
                                            class="text-xs leading-6 text-slate-500"
                                        >
                                            Complete all
                                            {{ course.totalVideos }} videos and
                                            pass the exam to finish the course
                                            and receive a platform certificate.
                                            The certificate is emailed and
                                            downloadable from the course.
                                        </p>
                                        <Button
                                            variant="outline"
                                            class="h-11 w-full"
                                            @click="preview('Course Exam')"
                                            >View Exam</Button
                                        ><Button
                                            v-if="isCompleted(course)"
                                            class="h-11 w-full bg-teal-700 text-white hover:bg-teal-800"
                                            @click="
                                                preview('Course Certificate')
                                            "
                                            >View Certificate</Button
                                        ></CardContent
                                    ></Card
                                >
                                <Card
                                    class="border-slate-200 bg-white shadow-sm"
                                    ><CardHeader
                                        ><CardTitle
                                            class="flex items-center gap-2 text-lg"
                                            ><FileText
                                                class="size-5 text-teal-700"
                                                aria-hidden="true"
                                            />Purchase Details</CardTitle
                                        ></CardHeader
                                    ><CardContent class="space-y-4"
                                        ><dl class="space-y-3 text-sm">
                                            <div
                                                class="flex flex-wrap justify-between gap-2"
                                            >
                                                <dt class="text-slate-500">
                                                    Reference
                                                </dt>
                                                <dd
                                                    class="font-medium break-all"
                                                >
                                                    {{ course.orderReference }}
                                                </dd>
                                            </div>
                                            <div
                                                class="flex justify-between gap-2"
                                            >
                                                <dt class="text-slate-500">
                                                    Purchased
                                                </dt>
                                                <dd>7 October 2026</dd>
                                            </div>
                                            <div
                                                class="flex justify-between gap-2"
                                            >
                                                <dt class="text-slate-500">
                                                    Amount paid
                                                </dt>
                                                <dd class="font-semibold">
                                                    {{
                                                        course.amountPaid.toLocaleString(
                                                            "en-US",
                                                        )
                                                    }}
                                                    {{ course.paidCurrency }}
                                                </dd>
                                            </div>
                                        </dl>
                                        <Button
                                            variant="outline"
                                            class="h-11 w-full"
                                            @click="preview('Purchase History')"
                                            >View Purchase History</Button
                                        ></CardContent
                                    ></Card
                                >
                            </template>
                            <Card class="border-slate-200 bg-white shadow-sm"
                                ><CardContent class="space-y-3 p-5"
                                    ><p
                                        class="flex items-center gap-2 text-sm font-semibold"
                                    >
                                        <MessageCircle
                                            class="size-4 text-teal-700"
                                            aria-hidden="true"
                                        />Need help?
                                    </p>
                                    <p class="text-xs leading-6 text-slate-500">
                                        Contact support for help with your
                                        course access.
                                    </p>
                                    <Button
                                        variant="link"
                                        class="h-auto p-0 text-teal-800"
                                        @click="preview('Learning Support')"
                                        >Contact Support</Button
                                    ></CardContent
                                ></Card
                            >
                        </aside>
                    </div>
                    <Card
                        v-else
                        class="border-dashed border-slate-300 bg-white shadow-none"
                        ><CardContent class="space-y-4 py-12 text-center"
                            ><GraduationCap
                                class="mx-auto size-10 text-teal-700"
                                aria-hidden="true"
                            />
                            <h2 class="text-xl font-semibold">
                                {{
                                    filter === "completed"
                                        ? "No completed courses yet"
                                        : "No courses here yet"
                                }}
                            </h2>
                            <p class="text-sm text-slate-500">
                                {{
                                    filter === "completed"
                                        ? "Complete your videos and pass any enabled exam to finish a course."
                                        : "Explore courses and start your next learning journey."
                                }}
                            </p>
                            <Button
                                v-if="courses.value.length"
                                variant="outline"
                                @click="filter = 'all'"
                                >View All Courses</Button
                            ><Button v-else as-child
                                ><a href="/">Browse Courses</a></Button
                            ></CardContent
                        ></Card
                    >
                </TabsContent>
            </Tabs>
        </main>
        <MarketplaceFooter @preview="preview" />
        <Sheet v-model:open="previewOpen"
            ><SheetContent class="bg-white text-slate-900"
                ><SheetHeader
                    ><SheetTitle>{{ previewTitle }}</SheetTitle
                    ><SheetDescription
                        >This destination is coming soon. You are viewing sample
                        learning data; progress, exam results and purchases are
                        not changed.</SheetDescription
                    ></SheetHeader
                ><Button
                    class="mx-4 bg-teal-700 text-white hover:bg-teal-800"
                    @click="previewOpen = false"
                    >Back to My Courses</Button
                ></SheetContent
            ></Sheet
        >
    </div>
</template>

<style scoped>
.my-courses {
    font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
    color-scheme: light;
}
</style>
