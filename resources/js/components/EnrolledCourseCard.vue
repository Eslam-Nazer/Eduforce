<script setup lang="ts">
import { computed } from 'vue';
import { ArrowRight, BookOpen, CheckCircle, Info } from '@lucide/vue';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import type { EnrolledCourse } from '@/types/learning';

const props = defineProps<{ course: EnrolledCourse; referenceDate: string }>();
const emit = defineEmits<{ preview: [title: string] }>();
const percentage = computed(() =>
    props.course.totalVideos > 0
        ? Math.round(
              (props.course.completedVideos / props.course.totalVideos) * 100,
          )
        : 0,
);
const completed = computed(
    () =>
        props.course.completedVideos === props.course.totalVideos &&
        (!props.course.exam || props.course.exam.passed),
);
const refundEligible = computed(() => {
    const elapsed =
        Date.parse(props.referenceDate) - Date.parse(props.course.purchasedAt);
    return (
        elapsed >= 0 &&
        elapsed <= 14 * 86400000 &&
        props.course.completedVideos <= 3
    );
});
</script>

<template>
    <Card class="border-slate-200 bg-white shadow-sm">
        <CardContent class="space-y-6 p-5 sm:p-6">
            <div class="flex flex-col gap-5 sm:flex-row">
                <img
                    :src="course.image"
                    alt="Laptop displaying code"
                    class="aspect-video w-full rounded-lg object-cover sm:w-48 sm:self-start"
                />
                <div class="min-w-0 flex-1">
                    <Badge
                        variant="secondary"
                        :class="
                            completed
                                ? 'bg-teal-50 text-teal-800'
                                : 'bg-blue-50 text-blue-800'
                        "
                        >{{ completed ? 'Completed' : 'In Progress' }}</Badge
                    >
                    <h2 class="mt-3 text-xl leading-7 font-semibold">
                        {{ course.title }}
                    </h2>
                    <p class="mt-2 text-sm text-slate-500">
                        Instructor: {{ course.instructor }}
                    </p>
                    <p
                        class="mt-3 flex items-center gap-2 text-xs text-slate-500"
                    >
                        <BookOpen class="size-4" aria-hidden="true" />{{
                            course.moduleCount
                        }}
                        modules
                    </p>
                </div>
            </div>
            <div>
                <div class="mb-3 flex flex-wrap justify-between gap-2 text-sm">
                    <span
                        >{{ course.completedVideos }} /
                        {{ course.totalVideos }} videos completed</span
                    ><span class="font-semibold text-teal-800"
                        >{{ percentage }}%</span
                    >
                </div>
                <Progress
                    :model-value="percentage"
                    aria-label="Video completion"
                    class="h-2 bg-slate-100 [&_[data-slot=progress-indicator]]:bg-teal-700"
                />
            </div>
            <div v-if="course.nextLesson" class="rounded-lg bg-slate-50 p-4">
                <p class="text-xs font-medium text-slate-500">UP NEXT</p>
                <p class="mt-2 text-sm font-semibold">
                    {{ course.nextLesson.title }}
                </p>
                <p class="mt-1 text-xs text-slate-500">
                    Duration: {{ course.nextLesson.duration }}
                </p>
            </div>
            <Button
                class="h-11 w-full bg-teal-700 text-white hover:bg-teal-800 sm:w-auto"
                @click="
                    emit(
                        'preview',
                        completed ? 'Review Course' : 'Continue Learning',
                    )
                "
                >{{ completed ? 'Review Course' : 'Continue Learning'
                }}<ArrowRight class="size-4" aria-hidden="true"
            /></Button>
            <Alert class="border-slate-200 bg-slate-50"
                ><Info class="size-4" /><AlertTitle>{{
                    refundEligible
                        ? 'Eligible to request a refund'
                        : 'Outside the refund eligibility conditions'
                }}</AlertTitle
                ><AlertDescription class="space-y-2"
                    ><p>
                        Course refunds are available within 14 days of purchase
                        with no more than 3 completed videos. Completing the
                        fourth video removes eligibility.
                    </p>
                    <Button
                        variant="link"
                        class="h-auto p-0 text-teal-800"
                        @click="emit('preview', 'Purchase History & Refunds')"
                        >View purchase history and refund details</Button
                    ></AlertDescription
                ></Alert
            >
            <div
                v-if="completed"
                class="flex items-center gap-2 text-sm text-teal-800"
            >
                <CheckCircle class="size-4" aria-hidden="true" />Course
                completion requirements met.
            </div>
        </CardContent>
    </Card>
</template>
