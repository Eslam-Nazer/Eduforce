<script setup lang="ts">
import { Head, router } from "@inertiajs/vue3";
import { computed, ref } from "vue";
import { Check, Clock, Download, Globe, Play, ShieldCheck } from "@lucide/vue";
import MarketplaceHeader from "@/components/MarketplaceHeader.vue";
import MarketplaceFooter from "@/components/MarketplaceFooter.vue";
import CourseCurriculum from "@/components/CourseCurriculum.vue";
import CoursePurchaseCard from "@/components/CoursePurchaseCard.vue";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
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
import type { CourseModule, Currency } from "@/types";

const title = "Full-Stack Web Development with Node.js & React";
const currency = ref<Currency>("EGP");
const previewOpen = ref(false);
const previewTitle = ref("");
function preview(value: string) {
    previewTitle.value = value;
    previewOpen.value = true;
}
// Static reference content; prices and assessment settings are illustrative.
const modules: CourseModule[] = [
    {
        id: "server",
        title: "Server Architecture & Routing",
        duration: "1h 45m",
        resource: "Starter Code: module-1-server-boilerplate.zip",
        lessons: [
            {
                id: "1.1",
                title: "Runtime Internals & Event Loop Lifecycle",
                duration: "16:40",
                kind: "video",
            },
            {
                id: "1.2",
                title: "Modular Pipeline Design with Express Router",
                duration: "22:15",
                kind: "video",
            },
            {
                id: "1.3",
                title: "Deterministic Request Payload Validation",
                duration: "18:30",
                kind: "video",
            },
            {
                id: "1.4",
                title: "Centralized Asynchronous Error Handling Strategy",
                duration: "14:50",
                kind: "video",
            },
            {
                id: "1.5",
                title: "PostgreSQL Connection Pools & Schema Migrations",
                duration: "24:10",
                kind: "video",
            },
            {
                id: "1.6",
                title: "Repository Pattern & Query Builders",
                duration: "19:05",
                kind: "video",
            },
        ],
    },
    {
        id: "interfaces",
        title: "User Interfaces & State Handling",
        duration: "2h 30m",
        resource: "Source Kit: react-ui-component-library.zip",
        lessons: [
            {
                id: "2.1",
                title: "Modern React Tooling & Vite Application Boundary",
                duration: "18:20",
                kind: "video",
            },
            {
                id: "2.2",
                title: "Compound Component Composition & Accessibility",
                duration: "21:40",
                kind: "video",
            },
            {
                id: "2.3",
                title: "Synchronizing Remote State with Custom Hooks",
                duration: "24:00",
                kind: "video",
            },
            {
                id: "2.4",
                title: "Optimistic UI Updates & Cache Invalidation",
                duration: "19:15",
                kind: "video",
            },
            {
                id: "2.5",
                title: "Complex Form Controls & Validation Lifecycles",
                duration: "20:30",
                kind: "video",
            },
            {
                id: "2.6",
                title: "Dynamic Routing & Code-Splitting Bundles",
                duration: "15:55",
                kind: "video",
            },
            {
                id: "2.7",
                title: "High-Performance Rendering & Memoization Limits",
                duration: "17:10",
                kind: "video",
            },
            {
                id: "2.8",
                title: "End-to-End Client Test Flows with Playwright",
                duration: "13:10",
                kind: "video",
            },
        ],
    },
    {
        id: "security",
        title: "Security, Tokens & Cloud Delivery",
        duration: "2h 45m",
        resource: "Deployment Manifests: docker-compose-production.yml",
        lessons: [
            {
                id: "3.1",
                title: "JWT Architecture: Access vs Refresh Token Rotation",
                duration: "23:45",
                kind: "video",
            },
            {
                id: "3.2",
                title: "Hardening Express: Helmet, CORS, and Rate Limits",
                duration: "19:10",
                kind: "video",
            },
            {
                id: "3.3",
                title: "Protecting Against CSRF, XSS and Injection Vectors",
                duration: "21:00",
                kind: "video",
            },
            {
                id: "3.4",
                title: "Multi-Stage Dockerfile Optimization",
                duration: "22:30",
                kind: "video",
            },
            {
                id: "3.5",
                title: "Local Orchestration with Docker Compose",
                duration: "18:40",
                kind: "video",
            },
            {
                id: "3.6",
                title: "Structured Logging & Process Management (PM2)",
                duration: "16:50",
                kind: "video",
            },
            {
                id: "3.7",
                title: "CI/CD Pipeline Automation with GitHub Actions",
                duration: "22:00",
                kind: "video",
            },
            {
                id: "3.8",
                title: "Provisioning Cloud Compute & Reverse Proxies",
                duration: "21:05",
                kind: "video",
            },
        ],
    },
    {
        id: "assessment",
        title: "Assessment & Practical Synthesis",
        duration: "1h 00m",
        resource: "Complete Capstone Specification.pdf",
        lessons: [
            {
                id: "4.1",
                title: "Architecture Retrospective & Optimization Walkthrough",
                duration: "30:00",
                kind: "video",
            },
            {
                id: "4.2",
                title: "Comprehensive Synthesis Exam (Online)",
                duration: "30:00",
                kind: "exam",
            },
        ],
    },
];
const lessons = modules.flatMap((module) => module.lessons);
const videoCount = lessons.filter((lesson) => lesson.kind === "video").length;
const hasExam = lessons.some((lesson) => lesson.kind === "exam");
const totalMinutes = lessons.reduce((total, lesson) => {
    const [minutes, seconds] = lesson.duration.split(":").map(Number);
    return total + (minutes ?? 0) + (seconds ?? 0) / 60;
}, 0);
const duration = `${Math.floor(totalMinutes / 60)}h ${Math.round(totalMinutes % 60)}m total`;
const metadata = computed(() => [
    { label: "CURRICULUM", value: `${videoCount} video lessons`, icon: Play },
    { label: "DURATION", value: duration, icon: Clock },
    { label: "RESOURCES", value: "Source archives", icon: Download },
    { label: "INSTRUCTION", value: "English", icon: Globe },
    { label: "ENROLLMENT", value: "Lifetime access", icon: ShieldCheck },
]);
const outcomes = [
    {
        title: "Server Setup & Core Architecture",
        description:
            "Construct robust Express runtime layers, configure asynchronous error-handling middleware, and structure modular MVC filesystems.",
    },
    {
        title: "RESTful API Design & Validation",
        description:
            "Author schema-enforced relational patterns, handle pagination with SQL queries, and implement deterministic schema validations.",
    },
    {
        title: "Frontend State & Component Patterns",
        description:
            "Build declarative React interfaces, synchronize optimistic client caching with custom hooks, and manage multi-step user forms.",
    },
    {
        title: "Containerized Deployment & Auth",
        description:
            "Package full-stack topologies via multi-stage Dockerfiles, configure HTTP-only JWT sessions, and automate reproducible release cycles.",
    },
];
</script>

<template>
    <Head :title="title" />
    <div class="course-details min-h-screen bg-[#f8fafc] text-slate-900">
        <MarketplaceHeader
            v-model:currency="currency"
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
                        ><BreadcrumbLink href="/#courses"
                            >Browse Courses</BreadcrumbLink
                        ></BreadcrumbItem
                    ><BreadcrumbSeparator /><BreadcrumbItem
                        ><BreadcrumbPage>{{
                            title
                        }}</BreadcrumbPage></BreadcrumbItem
                    ></BreadcrumbList
                ></Breadcrumb
            >
        </div>
        <section class="bg-white" aria-labelledby="course-title">
            <div class="mx-auto max-w-7xl px-5 py-12 sm:px-8">
                <Badge variant="secondary" class="bg-teal-50 text-teal-800"
                    >Development</Badge
                >
                <h1
                    id="course-title"
                    class="mt-5 max-w-4xl text-3xl leading-tight font-bold tracking-tight sm:text-5xl"
                >
                    {{ title }}
                </h1>
                <p class="mt-5 max-w-3xl text-sm leading-7 text-slate-500">
                    A comprehensive practical course guiding learners through
                    backend API engineering and interactive frontend user
                    interfaces using modern JavaScript technologies.
                </p>
                <div
                    class="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-500"
                >
                    <Avatar class="size-9"
                        ><AvatarFallback class="bg-teal-50 text-teal-800"
                            >AM</AvatarFallback
                        ></Avatar
                    ><span
                        >Taught by
                        <a
                            href="#instructor"
                            class="font-medium text-slate-900 underline underline-offset-4"
                            >Ahmed Mansour</a
                        ></span
                    ><span>• PRODUCTION PRACTITIONER</span>
                </div>
                <div
                    class="mt-8 grid gap-5 rounded-xl bg-slate-100 p-5 sm:grid-cols-3 lg:grid-cols-5"
                >
                    <div
                        v-for="item in metadata"
                        :key="item.label"
                        class="flex items-center gap-3"
                    >
                        <div class="rounded-md bg-white p-2">
                            <component
                                :is="item.icon"
                                class="size-4 text-teal-700"
                                aria-hidden="true"
                            />
                        </div>
                        <div>
                            <p
                                class="text-[10px] font-medium tracking-wider text-slate-500"
                            >
                                {{ item.label }}
                            </p>
                            <p class="mt-1 text-xs">{{ item.value }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <main
            class="mx-auto grid max-w-7xl items-start gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1fr)]"
        >
            <div class="min-w-0 space-y-8">
                <div class="overflow-hidden rounded-xl">
                    <AspectRatio :ratio="16 / 9"
                        ><img
                            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85"
                            alt="Workspace with a laptop displaying code"
                            class="size-full object-cover"
                    /></AspectRatio>
                </div>
                <Card class="border-0 bg-white shadow-sm"
                    ><CardContent class="px-6"
                        ><h2
                            class="mb-6 border-l-4 border-teal-700 pl-3 text-xl font-semibold"
                        >
                            What you'll learn
                        </h2>
                        <div class="grid gap-4 sm:grid-cols-2">
                            <div
                                v-for="outcome in outcomes"
                                :key="outcome.title"
                                class="flex gap-3 rounded-lg bg-slate-50 p-4"
                            >
                                <Check
                                    class="mt-1 size-4 shrink-0 text-teal-700"
                                />
                                <div>
                                    <h3 class="text-sm font-medium">
                                        {{ outcome.title }}
                                    </h3>
                                    <p
                                        class="mt-2 text-xs leading-6 text-slate-500"
                                    >
                                        {{ outcome.description }}
                                    </p>
                                </div>
                            </div>
                        </div></CardContent
                    ></Card
                >
                <Card class="border-0 bg-white shadow-sm"
                    ><CardContent class="px-6"
                        ><h2
                            class="mb-5 border-l-4 border-slate-500 pl-3 text-xl font-semibold"
                        >
                            Prerequisites
                        </h2>
                        <p
                            class="rounded-lg bg-slate-100 p-4 text-sm leading-7 text-slate-500"
                        >
                            Fundamental understanding of web technologies
                            (HTML5, semantic markup, and standard CSS), along
                            with familiarity with modern JavaScript concepts
                            such as variables, arrow functions, ES6 array
                            methods, and asynchronous promises.
                        </p></CardContent
                    ></Card
                >
                <Card class="border-0 bg-white shadow-sm"
                    ><CardContent
                        class="space-y-4 px-6 text-sm leading-7 text-slate-500"
                        ><h2
                            class="border-l-4 border-teal-700 pl-3 text-xl font-semibold text-slate-900"
                        >
                            Course description
                        </h2>
                        <p>
                            This curriculum prepares engineers for practical
                            production challenges. Starting from runtime
                            fundamentals, you will explore how Node.js schedules
                            I/O operations through the event loop and build
                            clean, modular HTTP architectures.
                        </p>
                        <p>
                            The course connects backend and frontend
                            development: API design informs frontend state,
                            caching, and user experience. Each module emphasizes
                            maintainability, predictable data changes, testing,
                            and deployment practices. Finish with containerized
                            packaging and cloud delivery.
                        </p></CardContent
                    ></Card
                >
                <CourseCurriculum :modules="modules" />
                <Card v-if="hasExam" class="border-0 bg-white shadow-sm"
                    ><CardContent class="px-6"
                        ><h2
                            class="mb-6 border-l-4 border-teal-700 pl-3 text-xl font-semibold"
                        >
                            Exam &amp; Certificate
                        </h2>
                        <div class="grid gap-4 sm:grid-cols-2">
                            <div class="rounded-lg bg-slate-100 p-4">
                                <h3 class="text-sm font-medium">
                                    Practical Synthesis Exam
                                </h3>
                                <ul
                                    class="mt-3 list-inside list-disc space-y-2 text-xs leading-6 text-slate-500"
                                >
                                    <li>
                                        Multiple-choice and true/false questions
                                    </li>
                                    <li>70% passing threshold</li>
                                    <li>Unlimited retry attempts</li>
                                </ul>
                            </div>
                            <div class="rounded-lg bg-slate-100 p-4">
                                <h3 class="text-sm font-medium">
                                    Certificate Issuance
                                </h3>
                                <p
                                    class="mt-3 text-xs leading-6 text-slate-500"
                                >
                                    Complete all video lessons and pass the exam
                                    to receive an Eduforce certificate of
                                    completion. Your certificate is emailed to
                                    you and available to download from the
                                    course.
                                </p>
                            </div>
                        </div></CardContent
                    ></Card
                >
                <Card
                    id="instructor"
                    class="scroll-mt-6 border-0 bg-white shadow-sm"
                    ><CardContent class="px-6"
                        ><h2
                            class="mb-6 border-l-4 border-teal-700 pl-3 text-xl font-semibold"
                        >
                            Instructor profile
                        </h2>
                        <div class="flex gap-4">
                            <Avatar class="size-16 rounded-xl"
                                ><AvatarFallback
                                    class="rounded-xl bg-teal-50 text-xl text-teal-800"
                                    >AM</AvatarFallback
                                ></Avatar
                            >
                            <div>
                                <h3 class="font-semibold">Ahmed Mansour</h3>
                                <p class="mt-1 text-xs text-teal-800">
                                    Full-Stack Architect &amp; Engineering
                                    Consultant
                                </p>
                                <p
                                    class="mt-3 text-sm leading-7 text-slate-500"
                                >
                                    Ahmed Mansour is a software practitioner
                                    with over a decade of experience designing,
                                    deploying, and maintaining web
                                    infrastructure across Cairo and Riyadh. His
                                    work centers on Node.js services and
                                    scalable frontend architecture.
                                </p>
                                <Button
                                    variant="link"
                                    class="mt-3 h-auto p-0 text-xs text-teal-800"
                                    @click="preview('Instructor profile')"
                                    >View instructor profile →</Button
                                >
                            </div>
                        </div></CardContent
                    ></Card
                >
            </div>
            <CoursePurchaseCard
                :price="currency === 'EGP' ? 2400 : 190"
                :currency="currency"
                :video-count="videoCount"
                :has-exam="hasExam"
                @buy="preview('Course checkout')"
            />
        </main>
        <MarketplaceFooter @preview="preview" />
        <Sheet v-model:open="previewOpen"
            ><SheetContent class="bg-white text-slate-900"
                ><SheetHeader
                    ><SheetTitle>{{ previewTitle }}</SheetTitle
                    ><SheetDescription
                        >This page is coming soon. This preview uses sample
                        course data; no purchase or payment is
                        made.</SheetDescription
                    ></SheetHeader
                ><Button
                    class="mx-4 bg-teal-700 text-white hover:bg-teal-800"
                    @click="previewOpen = false"
                    >Back to course</Button
                ></SheetContent
            ></Sheet
        >
    </div>
</template>

<style scoped>
.course-details {
    font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
    color-scheme: light;
}
</style>
