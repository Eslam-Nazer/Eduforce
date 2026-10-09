<script setup lang="ts">
import { Head, router } from "@inertiajs/vue3";
import { computed, ref } from "vue";
import {
    ArrowLeft,
    Award,
    Printer,
    Maximize,
    Mail,
    Info,
    Link as LinkIcon,
    Share2,
} from "@lucide/vue";
import MarketplaceHeader from "@/components/MarketplaceHeader.vue";
import MarketplaceFooter from "@/components/MarketplaceFooter.vue";
import CertificatePreview from "@/components/CertificatePreview.vue";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import {
    sampleCourseTitle,
    sampleInstructor,
    sampleModules,
} from "@/data/sample-course";
import { sampleExam } from "@/data/sample-exam";
import { useLearningPreview } from "@/composables/useLearningPreview";
import type { Currency } from "@/types/course";

const { attempts, completedIds, examPassed, scoreAttempt, storageAvailable } =
    useLearningPreview();
const totalVideos = sampleModules
    .flatMap((module) => module.lessons)
    .filter((lesson) => lesson.kind === "video").length;
const eligible = computed(
    () =>
        storageAvailable.value &&
        completedIds.value.length === totalVideos &&
        examPassed.value,
);
const passingAttempt = computed(() =>
    [...attempts.value]
        .reverse()
        .find((attempt) => scoreAttempt(attempt) >= sampleExam.passingScore),
);
const score = computed(() =>
    passingAttempt.value ? scoreAttempt(passingAttempt.value) : 0,
);
const currency = ref<Currency>("EGP");
const expanded = ref(false);
const noticeOpen = ref(false);
const noticeTitle = ref("");
const previewDate = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeZone: "Africa/Cairo",
}).format(new Date());
const certificateProps = computed(() => ({
    learner: "Kareem Tarek",
    course: sampleCourseTitle,
    instructor: sampleInstructor,
    videoCount: totalVideos,
    score: score.value,
    previewDate,
}));
function preview(title: string) {
    noticeTitle.value = title;
    noticeOpen.value = true;
}
function printCertificate() {
    if (eligible.value) window.print();
}
</script>

<template>
    <Head title="Course Certificate" />
    <div class="certificate-page min-h-screen bg-slate-50 text-slate-900">
        <MarketplaceHeader
            v-model:currency="currency"
            account-name="Kareem Tarek"
            @browse="router.visit('/')"
            @preview="preview"
        />
        <main class="mx-auto max-w-7xl space-y-6 px-5 py-8 sm:px-8">
            <nav
                aria-label="Breadcrumb"
                class="print-hide flex flex-wrap gap-2 text-sm text-slate-500"
            >
                <a href="/my-courses" class="text-teal-800">My Courses</a
                ><span>/</span
                ><a href="/my-courses/full-stack" class="text-teal-800"
                    >Full-Stack Web Development</a
                ><span>/</span
                ><span aria-current="page">Course Certificate</span>
            </nav>
            <div
                class="print-hide flex flex-wrap items-center justify-between gap-5 rounded-xl border border-teal-100 bg-white p-5 sm:p-6"
            >
                <div class="flex items-start gap-4">
                    <div class="rounded-lg bg-teal-50 p-3">
                        <Award
                            class="size-6 text-teal-700"
                            aria-hidden="true"
                        />
                    </div>
                    <div>
                        <Badge
                            variant="secondary"
                            class="bg-teal-50 text-teal-800"
                            >Sample certificate preview</Badge
                        >
                        <h1 class="mt-2 text-2xl font-bold">
                            {{
                                eligible
                                    ? "Course Completed"
                                    : "Complete Your Course"
                            }}
                        </h1>
                        <p class="mt-2 text-sm leading-6 text-slate-500">
                            {{ completedIds.length }} / {{ totalVideos }} videos
                            completed ·
                            {{
                                examPassed
                                    ? "Course exam passed"
                                    : `${sampleExam.passingScore}% exam pass required`
                            }}.
                        </p>
                    </div>
                </div>
                <Button as-child variant="outline" class="h-11"
                    ><a href="/my-courses/full-stack"
                        ><ArrowLeft class="size-4" aria-hidden="true" />Back to
                        Course</a
                    ></Button
                >
            </div>
            <div
                v-if="!eligible"
                class="print-hide rounded-xl border border-slate-200 bg-white p-6"
            >
                <h2 class="text-lg font-semibold">
                    Certificate requirements are not met in this tab
                </h2>
                <p class="mt-2 text-sm leading-6 text-slate-600">
                    Complete all {{ totalVideos }} videos and pass the enabled
                    course exam. Preview progress is saved separately for each
                    browser tab; return to the tab where you completed the
                    course if needed.
                </p>
                <p v-if="!storageAvailable" class="mt-3 text-sm text-amber-800">
                    Session storage is unavailable. Your browser could not
                    restore the saved progress.
                </p>
                <div class="mt-5 flex flex-wrap gap-3">
                    <Button
                        as-child
                        class="h-11 bg-teal-700 text-white hover:bg-teal-800"
                        ><a href="/my-courses/full-stack"
                            >Continue Learning</a
                        ></Button
                    ><Button as-child variant="outline" class="h-11"
                        ><a href="/my-courses/full-stack/exam"
                            >Go to Exam</a
                        ></Button
                    >
                </div>
            </div>
            <div
                v-else
                class="certificate-layout grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(290px,1fr)]"
            >
                <div class="min-w-0 space-y-4">
                    <div
                        class="certificate-print-area overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                    >
                        <CertificatePreview v-bind="certificateProps" />
                        <div
                            class="print-hide flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-3"
                        >
                            <span class="text-xs text-slate-500"
                                >Platform certificate · Local preview</span
                            ><Button variant="ghost" @click="expanded = true"
                                ><Maximize
                                    class="size-4"
                                    aria-hidden="true"
                                />Expand Preview</Button
                            >
                        </div>
                    </div>
                    <Alert class="print-hide border-slate-200 bg-slate-100"
                        ><Info class="size-4" /><AlertTitle
                            >About this certificate</AlertTitle
                        ><AlertDescription
                            >This template records platform course completion.
                            It does not confer a university degree or academic
                            accreditation.</AlertDescription
                        ></Alert
                    >
                </div>
                <aside class="print-hide space-y-5">
                    <Card class="border-slate-200 bg-white shadow-sm"
                        ><CardHeader
                            ><CardTitle class="text-lg"
                                >Certificate Options</CardTitle
                            >
                            <p class="text-sm leading-6 text-slate-500">
                                Save a copy of your sample certificate.
                            </p></CardHeader
                        ><CardContent class="space-y-4">
                            <Button
                                class="h-11 w-full bg-teal-700 text-white hover:bg-teal-800"
                                @click="printCertificate"
                                ><Printer
                                    class="size-4"
                                    aria-hidden="true"
                                />Print / Save as PDF</Button
                            >
                            <p class="text-xs leading-5 text-slate-500">
                                Choose Save as PDF in your browser's print
                                dialog. This exports the sample certificate
                                only.
                            </p>
                            <div class="grid grid-cols-2 gap-3">
                                <Button variant="outline" disabled
                                    ><LinkIcon
                                        class="size-4"
                                        aria-hidden="true"
                                    />Copy Link</Button
                                ><Button variant="outline" disabled
                                    ><Share2
                                        class="size-4"
                                        aria-hidden="true"
                                    />Share</Button
                                >
                            </div>
                            <p class="text-xs leading-5 text-slate-500">
                                Public certificate links and sharing will be
                                available after backend integration.
                            </p>
                            <div class="rounded-lg bg-teal-50 p-4">
                                <p
                                    class="flex items-center gap-2 text-sm font-semibold text-teal-800"
                                >
                                    <Mail
                                        class="size-4"
                                        aria-hidden="true"
                                    />Email delivery pending
                                </p>
                                <p
                                    class="mt-2 text-xs leading-5 text-slate-600"
                                >
                                    No email has been sent from this preview.
                                    Certificate email delivery requires backend
                                    integration.
                                </p>
                            </div>
                            <dl class="space-y-3 text-sm">
                                <div class="flex justify-between gap-3">
                                    <dt class="text-slate-500">
                                        Videos completed
                                    </dt>
                                    <dd>
                                        {{ totalVideos }} / {{ totalVideos }}
                                    </dd>
                                </div>
                                <div class="flex justify-between gap-3">
                                    <dt class="text-slate-500">
                                        Passing attempt score
                                    </dt>
                                    <dd class="font-semibold text-teal-800">
                                        {{ score }}%
                                    </dd>
                                </div>
                                <div class="flex justify-between gap-3">
                                    <dt class="text-slate-500">Status</dt>
                                    <dd>Sample preview</dd>
                                </div>
                            </dl>
                        </CardContent></Card
                    >
                    <Card class="border-slate-200 bg-white shadow-sm"
                        ><CardHeader
                            ><CardTitle class="text-lg"
                                >Next Steps</CardTitle
                            ></CardHeader
                        ><CardContent class="space-y-3"
                            ><p class="text-sm leading-6 text-slate-500">
                                Review your course or explore more learning
                                opportunities.
                            </p>
                            <Button
                                as-child
                                variant="outline"
                                class="h-11 w-full"
                                ><a href="/my-courses"
                                    >Return to My Courses</a
                                ></Button
                            ><Button
                                as-child
                                variant="outline"
                                class="h-11 w-full"
                                ><a href="/#courses">Browse Courses</a></Button
                            ><Button
                                as-child
                                variant="ghost"
                                class="h-11 w-full"
                                ><a href="/my-courses/full-stack/exam/results"
                                    >Review Exam Results</a
                                ></Button
                            ></CardContent
                        ></Card
                    >
                </aside>
            </div>
        </main>
        <MarketplaceFooter @preview="preview" />
        <Sheet v-model:open="expanded"
            ><SheetContent
                class="print-hide w-full overflow-y-auto bg-white text-slate-900 sm:max-w-5xl"
                ><SheetHeader
                    ><SheetTitle>Certificate Preview</SheetTitle
                    ><SheetDescription
                        >Expanded sample certificate. No credential has been
                        issued.</SheetDescription
                    ></SheetHeader
                ><CertificatePreview
                    v-if="eligible"
                    v-bind="certificateProps" /></SheetContent
        ></Sheet>
        <Sheet v-model:open="noticeOpen"
            ><SheetContent class="print-hide bg-white text-slate-900"
                ><SheetHeader
                    ><SheetTitle>{{ noticeTitle }}</SheetTitle
                    ><SheetDescription
                        >This destination is not available in the local
                        certificate preview.</SheetDescription
                    ></SheetHeader
                ></SheetContent
            ></Sheet
        >
    </div>
</template>
<style scoped>
.certificate-page {
    font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
    color-scheme: light;
}
@media print {
    .print-hide,
    .certificate-page > header,
    .certificate-page > footer {
        display: none !important;
    }
    .certificate-page {
        min-height: auto;
        background: white;
    }
    .certificate-page main {
        max-width: none;
        padding: 0;
    }
    .certificate-layout {
        display: block;
        margin: 0 !important;
    }
    .certificate-print-area {
        border: 0;
        border-radius: 0;
        box-shadow: none;
        break-inside: avoid;
    }
    .certificate-print-area :deep(.certificate-preview) {
        padding: 0;
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
    }
    .certificate-print-area :deep(.certificate-frame) {
        padding: 8mm;
    }
}
</style>
<style>
@media print {
    @page {
        size: A4 landscape;
        margin: 12mm;
    }
}
</style>
