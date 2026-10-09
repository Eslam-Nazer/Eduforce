<script setup lang="ts">
import { computed, ref } from "vue";
import { router } from "@inertiajs/vue3";
import InstructorLayout from "@/layouts/InstructorLayout.vue";
import InstructorCourseCard from "@/components/InstructorCourseCard.vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useInstructorWorkspace } from "@/composables/useInstructorWorkspace";
const { courses, notice, createCourse, deleteDraft } = useInstructorWorkspace();
const search = ref("");
const filter = ref("All");
const sort = ref("updated");
const removing = ref<string | null>(null);
const confirmOpen = ref(false);
const visible = computed(() =>
    courses.value
        .filter(
            (course) =>
                (filter.value === "All" || course.status === filter.value) &&
                course.title
                    .toLowerCase()
                    .includes(search.value.trim().toLowerCase()),
        )
        .toSorted((a, b) =>
            sort.value === "title"
                ? a.title.localeCompare(b.title)
                : Date.parse(b.updatedAt) - Date.parse(a.updatedAt),
        ),
);
function create() {
    const id = createCourse();
    if (id) router.visit(`/instructor/courses/${id}/basics`);
}
function remove(id: string) {
    removing.value = id;
    confirmOpen.value = true;
}
</script>
<template>
    <InstructorLayout
        title="Course Management"
        active="courses"
        description="Create, edit and publish courses from your instructor workspace."
        ><div class="flex justify-end">
            <Button
                class="bg-teal-700 text-white hover:bg-teal-800"
                @click="create"
                >Create new course</Button
            >
        </div>
        <p
            class="rounded-lg border border-teal-100 bg-white p-4 text-sm leading-6"
        >
            Approved instructors publish when they are ready. There is no
            administrative course review gate in the initial scope.
        </p>
        <p v-if="notice" role="status" class="text-sm text-teal-800">
            {{ notice }}
        </p>
        <div class="flex flex-wrap items-center justify-between gap-4">
            <Tabs v-model="filter"
                ><TabsList
                    ><TabsTrigger
                        v-for="value in ['All', 'Published', 'Draft']"
                        :key="value"
                        :value="value"
                        >{{ value }} ({{
                            courses.filter(
                                (course) =>
                                    value === "All" || course.status === value,
                            ).length
                        }})</TabsTrigger
                    ></TabsList
                ></Tabs
            >
            <div class="flex w-full gap-3 sm:w-auto">
                <Input
                    v-model="search"
                    aria-label="Search courses"
                    placeholder="Search courses…"
                    class="sm:w-64"
                /><Select v-model="sort"
                    ><SelectTrigger
                        aria-label="Sort courses"
                        class="w-40 shrink-0"
                        ><SelectValue /></SelectTrigger
                    ><SelectContent
                        ><SelectItem value="updated">Last updated</SelectItem
                        ><SelectItem value="title"
                            >Title A–Z</SelectItem
                        ></SelectContent
                    ></Select
                >
            </div>
        </div>
        <div class="space-y-5">
            <InstructorCourseCard
                v-for="course in visible"
                :key="course.id"
                :course="course"
                @remove="remove"
            />
            <p
                v-if="!visible.length"
                role="status"
                class="rounded-lg border bg-white p-8 text-center text-sm text-slate-500"
            >
                No courses match your filters.
            </p>
        </div>
        <AlertDialog v-model:open="confirmOpen"
            ><AlertDialogContent
                ><AlertDialogHeader
                    ><AlertDialogTitle
                        >Delete this local draft?</AlertDialogTitle
                    ><AlertDialogDescription
                        >This removes the draft from the preview in this tab.
                        Published courses are
                        unaffected.</AlertDialogDescription
                    ></AlertDialogHeader
                ><AlertDialogFooter
                    ><AlertDialogCancel>Cancel</AlertDialogCancel
                    ><AlertDialogAction
                        @click="removing && deleteDraft(removing)"
                        >Delete draft</AlertDialogAction
                    ></AlertDialogFooter
                ></AlertDialogContent
            ></AlertDialog
        ></InstructorLayout
    >
</template>
