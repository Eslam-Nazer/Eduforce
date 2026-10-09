<script setup lang="ts">
import { BookOpen, Award, GraduationCap } from "@lucide/vue";
defineProps<{
    learner: string;
    course: string;
    instructor: string;
    videoCount: number;
    score: number | null;
    previewDate: string;
}>();
</script>

<template>
    <article
        aria-label="Certificate of completion preview"
        class="certificate-preview bg-white p-3 text-slate-800 sm:p-5"
    >
        <div
            class="certificate-frame relative border-4 border-double border-teal-700/30 p-5 sm:p-8"
        >
            <div
                class="flex flex-wrap items-start justify-between gap-4 text-left"
            >
                <div class="flex items-center gap-2">
                    <BookOpen class="size-7 text-teal-700" aria-hidden="true" />
                    <div>
                        <p class="text-lg font-bold">Eduforce</p>
                        <p class="text-[10px] tracking-widest text-slate-500">
                            LEARNING PLATFORM
                        </p>
                    </div>
                </div>
                <div class="text-xs text-slate-500">
                    <p class="font-semibold tracking-wide">SAMPLE PREVIEW</p>
                    <p class="mt-1">Not an issued credential</p>
                </div>
            </div>
            <div class="py-8 text-center sm:py-10">
                <div
                    class="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-2 text-xs font-semibold tracking-wider text-teal-800"
                >
                    <Award class="size-4" aria-hidden="true" />CERTIFICATE OF
                    COMPLETION
                </div>
                <p class="mt-5 text-[10px] tracking-[0.2em] text-slate-500">
                    PRESENTED TO
                </p>
                <h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                    {{ learner }}
                </h2>
                <p class="mt-5 text-sm leading-6 text-slate-500">
                    For completing the course curriculum:
                </p>
                <h3
                    class="mx-auto mt-3 max-w-xl text-xl leading-8 font-semibold text-teal-800 sm:text-2xl"
                >
                    {{ course }}
                </h3>
                <p class="mt-5 text-xs leading-6 text-slate-500">
                    {{ videoCount }} videos completed<span
                        v-if="score !== null"
                    >
                        · {{ score }}% on the course exam</span
                    >
                </p>
            </div>
            <div
                class="grid items-end gap-5 text-center sm:grid-cols-[1fr_auto_1fr] sm:text-left"
            >
                <div>
                    <p class="font-serif text-xl italic">{{ instructor }}</p>
                    <p class="mt-2 text-xs font-semibold">{{ instructor }}</p>
                    <p class="mt-1 text-[10px] text-slate-500">
                        Course Instructor
                    </p>
                </div>
                <div
                    class="mx-auto flex size-16 flex-col items-center justify-center rounded-full border-4 border-double border-teal-700/30 bg-teal-50 text-teal-800"
                >
                    <GraduationCap class="size-6" aria-hidden="true" /><span
                        class="mt-1 text-[8px] font-bold tracking-wider"
                        >EDUFORCE</span
                    >
                </div>
                <div class="sm:text-right">
                    <p class="text-[10px] text-slate-500">Preview Date</p>
                    <p class="mt-2 text-xs font-semibold">{{ previewDate }}</p>
                </div>
            </div>
            <p
                class="mt-6 border-t border-slate-200 pt-4 text-center text-[10px] leading-5 text-slate-500"
            >
                Sample platform certificate. This preview does not confer a
                university degree or academic accreditation.
            </p>
        </div>
    </article>
</template>
