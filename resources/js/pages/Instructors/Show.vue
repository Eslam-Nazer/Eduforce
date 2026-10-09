<script setup lang="ts">
import { Head, router } from "@inertiajs/vue3";
import { computed, ref } from "vue";
import { MessageCircle, ArrowRight, Globe, Info } from "@lucide/vue";
import MarketplaceHeader from "@/components/MarketplaceHeader.vue";
import MarketplaceFooter from "@/components/MarketplaceFooter.vue";
import CourseCard from "@/components/CourseCard.vue";
import ConsultationServiceCard from "@/components/ConsultationServiceCard.vue";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { sampleInstructorProfile as instructor } from "@/data/sample-instructor";
import { sampleModules } from "@/data/sample-course";
import type { Currency, Course } from "@/types/course";
import type { ConsultationService } from "@/types/instructor";

const currency = ref<Currency>("EGP");
const sheetOpen = ref(false);
const sheetKind = ref<"message" | "destination">("destination");
const sheetTitle = ref("");

const message = ref("");
const messageNotice = ref("");
const videoLessons = sampleModules
    .flatMap((module) => module.lessons)
    .filter((lesson) => lesson.kind === "video");
const totalSeconds = videoLessons.reduce((total, lesson) => {
    const [minutes = 0, seconds = 0] = lesson.duration.split(":").map(Number);
    return total + minutes * 60 + seconds;
}, 0);
const duration = `${Math.floor(totalSeconds / 3600)}h ${Math.floor((totalSeconds % 3600) / 60)}m`;
const metadata = computed(() => [
    { label: "PRIMARY STACK", value: instructor.stack },
    { label: "FOCUS", value: instructor.focus },
    { label: "TIMEZONE", value: instructor.timeZone },
    {
        label: "CONSULTATIONS",
        value: instructor.services.length
            ? "Independent services available"
            : "No services listed",
    },
]);
function preview(title: string) {
    sheetKind.value = "destination";
    sheetTitle.value = title;
    sheetOpen.value = true;
}
function openMessage() {
    if (!instructor.contactEnabled) return;
    sheetKind.value = "message";
    sheetTitle.value = `Message ${instructor.name}`;
    messageNotice.value = "";
    sheetOpen.value = true;
}
function selectService(service: ConsultationService) {
    router.visit(`/consultations/${service.id}`);
}
function viewCourse(course: Course) {
    preview(course.title);
}
function previewMessage() {
    if (message.value.trim())
        messageNotice.value =
            "Message preview ready. No message has been sent.";
}
</script>
<template>
    <Head :title="instructor.name" />
    <div class="instructor-profile min-h-screen bg-slate-50 text-slate-900">
        <MarketplaceHeader
            v-model:currency="currency"
            account-name="Kareem Tarek"
            @browse="router.visit('/')"
            @preview="preview"
        />
        <main class="mx-auto max-w-7xl space-y-7 px-5 py-8 sm:px-8">
            <nav
                aria-label="Breadcrumb"
                class="flex flex-wrap gap-2 text-sm text-slate-500"
            >
                <a href="/" class="text-teal-800">Home</a><span>/</span
                ><span>Instructors</span><span>/</span
                ><span aria-current="page">{{ instructor.name }}</span>
            </nav>
            <Card class="overflow-hidden border-slate-200 bg-white shadow-sm"
                ><CardContent class="p-5 sm:p-8"
                    ><div class="flex flex-col gap-6 lg:flex-row">
                        <Avatar class="size-24 shrink-0 rounded-xl"
                            ><AvatarFallback
                                class="rounded-xl bg-teal-50 text-3xl font-semibold text-teal-800"
                                >{{ instructor.initials }}</AvatarFallback
                            ></Avatar
                        >
                        <div class="min-w-0 flex-1">
                            <Badge
                                variant="secondary"
                                class="bg-teal-50 text-teal-800"
                                >Sample instructor profile</Badge
                            >
                            <h1 class="mt-3 text-3xl font-bold">
                                {{ instructor.name }}
                            </h1>
                            <p class="mt-2 text-lg font-semibold text-teal-800">
                                {{ instructor.headline }}
                            </p>
                            <p
                                class="mt-3 max-w-3xl text-sm leading-7 text-slate-600"
                            >
                                {{ instructor.bio }}
                            </p>
                            <p
                                class="mt-4 flex items-center gap-2 text-sm text-slate-500"
                            >
                                <Globe class="size-4" aria-hidden="true" />{{
                                    instructor.languages.join(" & ")
                                }}
                            </p>
                        </div>
                        <div class="flex shrink-0 flex-wrap gap-3 lg:flex-col">
                            <Button
                                v-if="instructor.contactEnabled"
                                variant="outline"
                                class="h-11"
                                @click="openMessage"
                                ><MessageCircle
                                    class="size-4"
                                    aria-hidden="true"
                                />Message Ahmed</Button
                            ><Button
                                v-if="instructor.services.length"
                                as-child
                                class="h-11 bg-teal-700 text-white hover:bg-teal-800"
                                ><a href="#consultation-services"
                                    >Request Session<ArrowRight
                                        class="size-4"
                                        aria-hidden="true" /></a
                            ></Button>
                        </div>
                    </div>
                    <dl
                        class="mt-7 grid gap-5 border-t border-slate-200 pt-6 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        <div v-for="item in metadata" :key="item.label">
                            <dt
                                class="text-[10px] font-semibold tracking-widest text-slate-500"
                            >
                                {{ item.label }}
                            </dt>
                            <dd class="mt-2 text-sm leading-6 font-medium">
                                {{ item.value }}
                            </dd>
                        </div>
                    </dl></CardContent
                ></Card
            >
            <section
                v-if="instructor.courses.length"
                aria-labelledby="published-courses"
            >
                <div
                    class="mb-5 flex flex-wrap items-end justify-between gap-3"
                >
                    <div>
                        <h2
                            id="published-courses"
                            class="text-xl font-semibold"
                        >
                            Published Courses
                        </h2>
                        <p class="mt-2 text-sm text-slate-500">
                            Courses authored by {{ instructor.name }}
                        </p>
                    </div>
                    <Badge variant="outline"
                        >{{ instructor.courses.length }} course</Badge
                    >
                </div>
                <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <div
                        v-for="course in instructor.courses"
                        :key="course.id"
                        class="space-y-3"
                    >
                        <CourseCard
                            :course="course"
                            :currency="currency"
                            @view-details="viewCourse"
                        />
                        <p class="text-xs text-slate-500">
                            {{ videoLessons.length }} videos · {{ duration }} of
                            sample curriculum
                        </p>
                    </div>
                </div>
            </section>
            <section
                id="consultation-services"
                aria-labelledby="services-title"
                class="scroll-mt-6 space-y-5"
            >
                <div>
                    <h2 id="services-title" class="text-xl font-semibold">
                        Standalone Consultation Services
                    </h2>
                    <p class="mt-2 text-sm leading-6 text-slate-500">
                        Services are independent of courses. No course purchase
                        is required, and instructors can offer consultations
                        without publishing a course.
                    </p>
                </div>
                <Alert class="border-teal-100 bg-teal-50"
                    ><Info class="size-4" /><AlertTitle
                        >Agree on a time with the instructor</AlertTitle
                    ><AlertDescription
                        >Submit a service request, then agree on the appointment
                        directly. Paid services are paid after agreement; free
                        services require no payment. There are no automatic
                        booking slots.</AlertDescription
                    ></Alert
                >
                <div class="grid gap-5 md:grid-cols-2">
                    <ConsultationServiceCard
                        v-for="service in instructor.services"
                        :key="service.id"
                        :service="service"
                        :currency="currency"
                        @select="selectService"
                    />
                </div>
                <p
                    v-if="!instructor.services.length"
                    class="rounded-lg border border-slate-200 bg-white p-5 text-sm text-slate-500"
                >
                    No consultation services are currently listed.
                </p>
                <p class="text-xs leading-6 text-slate-500">
                    Prices and instructor details are illustrative preview data.
                    SAR amounts are sample display prices.
                </p>
            </section>
        </main>
        <MarketplaceFooter @preview="preview" />
        <Sheet v-model:open="sheetOpen"
            ><SheetContent class="overflow-y-auto bg-white text-slate-900"
                ><SheetHeader
                    ><SheetTitle>{{ sheetTitle }}</SheetTitle
                    ><SheetDescription>{{
                        sheetKind === "message"
                            ? "Text-only local message preview. No message is sent to the instructor."
                            : "This destination is not connected in this profile preview."
                    }}</SheetDescription></SheetHeader
                >
                <div class="space-y-5 px-4 pb-6">
                    <form
                        v-if="
                            sheetKind === 'message' && instructor.contactEnabled
                        "
                        class="space-y-4"
                        @submit.prevent="previewMessage"
                    >
                        <Label for="instructor-message">Your Message</Label
                        ><Textarea
                            id="instructor-message"
                            v-model="message"
                            required
                            maxlength="2000"
                            rows="6"
                            placeholder="Write your question to Ahmed..."
                        />
                        <p class="text-xs text-slate-500">
                            {{ message.length }} / 2000 characters · Text only
                        </p>
                        <Button
                            type="submit"
                            :disabled="!message.trim()"
                            class="h-11 bg-teal-700 text-white hover:bg-teal-800"
                            >Preview Message</Button
                        >
                        <p
                            v-if="messageNotice"
                            role="status"
                            class="text-sm text-teal-800"
                        >
                            {{ messageNotice }}
                        </p>
                    </form>
                </div></SheetContent
            ></Sheet
        >
    </div>
</template>
<style scoped>
.instructor-profile {
    font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
    color-scheme: light;
}
</style>
