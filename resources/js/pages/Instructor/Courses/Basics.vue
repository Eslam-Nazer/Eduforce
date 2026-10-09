<script setup lang="ts">
import { router } from "@inertiajs/vue3";
import CourseBuilderLayout from "@/layouts/CourseBuilderLayout.vue";
import CourseBasicsForm from "@/components/CourseBasicsForm.vue";
import { useInstructorWorkspace } from "@/composables/useInstructorWorkspace";
const props = defineProps<{ courseId: string }>();
const { course, notice, save } = useInstructorWorkspace(props.courseId);
function navigate(step: string) {
    if (save()) router.visit(`/instructor/courses/${props.courseId}/${step}`);
}
</script>
<template>
    <CourseBuilderLayout
        :course="course"
        step="basics"
        :notice="notice"
        @navigate="navigate"
        ><CourseBasicsForm
            v-if="course"
            v-model:course="course"
            @save="save"
            @continue="navigate('curriculum')"
    /></CourseBuilderLayout>
</template>
