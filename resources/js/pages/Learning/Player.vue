<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import LearningHeader from '@/components/LearningHeader.vue';
import { computed, ref } from 'vue';
import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    Info,
    Download,
    MessageCircle,
    GraduationCap,
} from '@lucide/vue';
import LessonVideoPlayer from '@/components/LessonVideoPlayer.vue';
import LearningCurriculum from '@/components/LearningCurriculum.vue';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet';
import {
    sampleModules,
    sampleCourseTitle,
    sampleInstructor,
    sampleVideoSource,
} from '@/data/sample-course';
import { useLearningPreview } from '@/composables/useLearningPreview';
const { completedIds, markCompleted, storageAvailable } = useLearningPreview();

const videos = sampleModules
    .flatMap((module) => module.lessons)
    .filter((lesson) => lesson.kind === 'video');
const currentId = ref(
    (
        videos.find((lesson) => !completedIds.value.includes(lesson.id)) ??
        videos[0]!
    ).id,
);
const playing = ref(false);
const tab = ref('overview');
const instructorContactEnabled = true;
const message = ref('');
const messageNotice = ref('');
const previewOpen = ref(false);
const previewTitle = ref('');
const currentIndex = computed(() =>
    videos.findIndex((lesson) => lesson.id === currentId.value),
);
const currentLesson = computed(() => videos[currentIndex.value]!);
const currentModule = computed(() =>
    sampleModules.find((module) =>
        module.lessons.some((lesson) => lesson.id === currentId.value),
    )!,
);
const percentage = computed(() =>
    Math.round((completedIds.value.length / videos.length) * 100),
);
function selectLesson(id: string) {
    if (!videos.some((lesson) => lesson.id === id) || id === currentId.value)
        return;
    playing.value = false;
    currentId.value = id;
    messageNotice.value = '';
}
function completeAndNext() {
    markCompleted(currentId.value);
    const next = videos[currentIndex.value + 1];
    if (next) selectLesson(next.id);
}
function preview(title: string) {
    if (title === 'Course Exam') {
        router.visit('/my-courses/full-stack/exam');
        return;
    }
    previewTitle.value = title;
    previewOpen.value = true;
}
function previewMessage() {
    if (!message.value.trim()) return;
    messageNotice.value = 'Message preview ready. No message has been sent.';
}
</script>

<template>
    <Head title="Course Player" />
    <div class="learning-player min-h-screen bg-slate-50 text-slate-900">
        <LearningHeader active="lessons" />
        <Alert
            v-if="!storageAvailable"
            class="mx-auto max-w-7xl border-amber-200 bg-amber-50"
            ><AlertTitle>Session storage unavailable</AlertTitle
            ><AlertDescription
                >Progress can only be kept on this page and will be lost when
                you leave.</AlertDescription
            ></Alert
        >
        <main class="mx-auto max-w-7xl space-y-6 px-5 py-8 sm:px-8">
            <a
                href="/my-courses"
                class="inline-flex items-center gap-2 text-sm text-teal-800"
                ><ArrowLeft class="size-4" aria-hidden="true" />Back to My
                Courses</a
            >
            <div
                class="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"
            >
                <div class="min-w-0">
                    <Badge variant="secondary" class="bg-teal-50 text-teal-800"
                        >Sample learning data</Badge
                    >
                    <h1 class="mt-3 text-2xl leading-9 font-bold sm:text-3xl">
                        {{ sampleCourseTitle }}
                    </h1>
                    <p class="mt-2 text-sm text-slate-500">
                        Taught by {{ sampleInstructor }}
                    </p>
                </div>
                <div class="w-full shrink-0 lg:w-64">
                    <p class="mb-3 flex justify-between gap-2 text-sm">
                        <span
                            >{{ completedIds.length }} /
                            {{ videos.length }} completed</span
                        ><span class="font-semibold text-teal-800"
                            >{{ percentage }}%</span
                        >
                    </p>
                    <Progress
                        :model-value="percentage"
                        aria-label="Course video completion"
                        class="bg-slate-200 [&_[data-slot=progress-indicator]]:bg-teal-700"
                    />
                </div>
            </div>
            <div
                class="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]"
            >
                <div class="min-w-0 space-y-5">
                    <div>
                        <p class="mb-3 text-sm font-semibold">
                            {{ currentLesson.id }} · {{ currentLesson.title }}
                        </p>
                        <LessonVideoPlayer
                            :lesson-id="currentId"
                            :title="currentLesson.title"
                            :source="sampleVideoSource"
                            @playback="playing = $event"
                            @ended="markCompleted"
                        />
                    </div>
                    <Card class="border-slate-200 bg-white shadow-sm"
                        ><CardContent class="space-y-4 p-5"
                            ><p class="text-xs text-slate-500">
                                {{ playing ? 'PLAYING NOW' : 'CURRENT LESSON' }}
                                · {{ currentLesson.id }}
                            </p>
                            <div class="flex flex-wrap justify-between gap-3">
                                <Button
                                    variant="outline"
                                    class="h-11"
                                    :disabled="currentIndex === 0"
                                    @click="
                                        selectLesson(
                                            videos[currentIndex - 1]!.id,
                                        )
                                    "
                                    ><ArrowLeft
                                        class="size-4"
                                        aria-hidden="true"
                                    />Previous Lesson</Button
                                ><Button
                                    class="h-11 max-w-full bg-teal-700 whitespace-normal text-white hover:bg-teal-800"
                                    @click="completeAndNext"
                                    >{{
                                        currentIndex === videos.length - 1
                                            ? 'Mark as Completed'
                                            : 'Mark as Completed & Next'
                                    }}<ArrowRight
                                        class="size-4 shrink-0"
                                        aria-hidden="true"
                                /></Button></div></CardContent
                    ></Card>
                    <Alert class="border-teal-100 bg-teal-50"
                        ><Info class="size-4" /><AlertTitle
                            >Lesson completion</AlertTitle
                        ><AlertDescription
                            >Videos are completed when playback ends or you
                            choose Mark as Completed &amp; Next. Starting
                            playback or selecting a lesson does not complete it.
                            Progress is saved locally in this browser tab
                            session.</AlertDescription
                        ></Alert
                    >
                    <Tabs v-model="tab"
                        ><TabsList
                            aria-label="Lesson details"
                            class="flex h-auto w-full flex-wrap justify-start gap-1 bg-slate-100"
                            ><TabsTrigger
                                value="overview"
                                class="min-h-11 gap-2"
                                ><BookOpen
                                    class="size-4"
                                    aria-hidden="true"
                                />Overview</TabsTrigger
                            ><TabsTrigger value="files" class="min-h-11 gap-2"
                                ><Download
                                    class="size-4"
                                    aria-hidden="true"
                                />Files</TabsTrigger
                            ><TabsTrigger
                                v-if="instructorContactEnabled"
                                value="contact"
                                class="min-h-11 gap-2"
                                ><MessageCircle
                                    class="size-4"
                                    aria-hidden="true"
                                />Instructor Contact</TabsTrigger
                            ></TabsList
                        >
                        <TabsContent value="overview"
                            ><Card class="border-slate-200 bg-white shadow-sm"
                                ><CardHeader
                                    ><CardTitle class="text-lg">{{
                                        currentLesson.title
                                    }}</CardTitle></CardHeader
                                ><CardContent
                                    class="space-y-3 text-sm leading-7 text-slate-500"
                                    ><p>
                                        Explore
                                        {{ currentLesson.title.toLowerCase() }}
                                        as part of {{ currentModule.title }}.
                                        Use the curriculum to revisit any lesson
                                        or continue to another topic.
                                    </p>
                                    <p>
                                        Sample curriculum duration:
                                        {{ currentLesson.duration }}. All course
                                        videos and files are available to
                                        purchased learners.
                                    </p></CardContent
                                ></Card
                            ></TabsContent
                        >
                        <TabsContent value="files"
                            ><Card class="border-slate-200 bg-white shadow-sm"
                                ><CardHeader
                                    ><CardTitle class="text-lg"
                                        >Module Files</CardTitle
                                    ></CardHeader
                                ><CardContent class="space-y-4"
                                    ><p class="text-sm break-words">
                                        {{ currentModule.resource }}
                                    </p>
                                    <p class="text-xs leading-6 text-slate-500">
                                        This sample file entry is a preview.
                                        Downloadable course assets will be
                                        supplied when content is connected.
                                    </p>
                                    <Button
                                        variant="outline"
                                        @click="preview('Course File Preview')"
                                        ><Download
                                            class="size-4"
                                            aria-hidden="true"
                                        />Preview File</Button
                                    ></CardContent
                                ></Card
                            ></TabsContent
                        >
                        <TabsContent
                            v-if="instructorContactEnabled"
                            value="contact"
                            ><Card class="border-slate-200 bg-white shadow-sm"
                                ><CardHeader
                                    ><CardTitle class="text-lg"
                                        >Contact
                                        {{ sampleInstructor }}</CardTitle
                                    ></CardHeader
                                ><CardContent
                                    ><p
                                        class="mb-4 text-sm leading-6 text-slate-500"
                                    >
                                        The instructor has enabled text messages
                                        from learners.
                                    </p>
                                    <form
                                        class="space-y-3"
                                        @submit.prevent="previewMessage"
                                    >
                                        <Label for="instructor-message"
                                            >Your message</Label
                                        ><Textarea
                                            id="instructor-message"
                                            v-model="message"
                                            placeholder="Ask a question about your course…"
                                            required
                                            maxlength="2000"
                                            class="min-h-32 bg-white"
                                        /><Button
                                            type="submit"
                                            :disabled="!message.trim()"
                                            class="bg-teal-700 text-white hover:bg-teal-800"
                                            >Preview Message</Button
                                        >
                                        <p
                                            v-if="messageNotice"
                                            role="status"
                                            class="text-sm text-teal-800"
                                        >
                                            {{ messageNotice }}
                                        </p>
                                    </form></CardContent
                                ></Card
                            ></TabsContent
                        >
                    </Tabs>
                </div>
                <aside id="curriculum" class="min-w-0 scroll-mt-5 space-y-5">
                    <LearningCurriculum
                        :modules="sampleModules"
                        :current-id="currentId"
                        :completed-ids="completedIds"
                        :playing="playing"
                        @select="selectLesson"
                        @exam="preview('Course Exam')"
                    /><Card class="border-teal-100 bg-teal-50 shadow-none"
                        ><CardHeader
                            ><CardTitle class="flex items-center gap-2 text-lg"
                                ><GraduationCap
                                    class="size-5"
                                    aria-hidden="true"
                                />Course Exam &amp; Certificate</CardTitle
                            ></CardHeader
                        ><CardContent class="space-y-4 text-sm leading-6"
                            ><p>
                                This sample exam has a 70% passing score and
                                unlimited attempts.
                            </p>
                            <p>
                                Complete all {{ videos.length }} videos and pass
                                the enabled exam to receive your platform
                                certificate, emailed and downloadable from the
                                course.
                            </p>
                            <Button
                                variant="outline"
                                class="w-full"
                                @click="preview('Course Exam')"
                                >View Exam</Button
                            ></CardContent
                        ></Card
                    >
                </aside>
            </div>
        </main>
        <Sheet v-model:open="previewOpen"
            ><SheetContent class="bg-white text-slate-900"
                ><SheetHeader
                    ><SheetTitle>{{ previewTitle }}</SheetTitle
                    ><SheetDescription
                        >This destination is coming soon. This preview does not
                        submit an exam, send messages or download course
                        files.</SheetDescription
                    ></SheetHeader
                ><Button class="mx-4" @click="previewOpen = false"
                    >Back to Course</Button
                ></SheetContent
            ></Sheet
        >
    </div>
</template>

<style scoped>
.learning-player {
    font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
    color-scheme: light;
}
</style>
