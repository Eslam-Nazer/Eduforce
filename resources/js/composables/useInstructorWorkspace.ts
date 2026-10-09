import { computed, ref } from "vue";
import { sampleInstructorCourses } from "@/data/sample-instructor-courses";
import type {
    InstructorCourse,
    InstructorQuestion,
} from "@/types/instructor-workspace";

const key = "eduforce:instructor-workspace:preview:v1";
export const newPreviewId = () =>
    `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
export function validQuestion(question: InstructorQuestion) {
    return (
        !!question.prompt.trim() &&
        question.options.length >= 2 &&
        question.options.every((option) => !!option.text.trim()) &&
        question.options.some(
            (option) => option.id === question.correctOptionId,
        )
    );
}
export function courseReadiness(course: InstructorCourse) {
    const videos = course.modules
        .flatMap((module) => module.lessons)
        .filter((lesson) => lesson.kind === "video");
    return [
        {
            title: "Course basics",
            ready:
                !!course.title.trim() &&
                !!course.summary.trim() &&
                !!course.description.trim() &&
                !!course.category &&
                course.outcomes.some((outcome) => !!outcome.trim()),
            step: "basics",
        },
        { title: "Cover image", ready: !!course.coverName, step: "basics" },
        {
            title: "Pricing",
            ready: Number.isFinite(course.price) && course.price > 0,
            step: "basics",
        },
        {
            title: "Curriculum",
            ready:
                videos.length > 0 &&
                course.modules.every(
                    (module) =>
                        !!module.title.trim() &&
                        module.lessons.length > 0 &&
                        module.lessons.every(
                            (lesson) =>
                                !!lesson.title.trim() &&
                                !!lesson.fileName &&
                                (lesson.kind === "file" ||
                                    lesson.durationSeconds > 0),
                        ),
                ),
            step: "curriculum",
        },
        {
            title: course.examEnabled
                ? "Enabled final exam"
                : "Final exam disabled (optional)",
            ready:
                !course.examEnabled ||
                (Number.isFinite(course.passingScore) &&
                    course.passingScore >= 1 &&
                    course.passingScore <= 100 &&
                    course.questions.length > 0 &&
                    course.questions.every(validQuestion)),
            step: "exam",
        },
    ];
}
function validSavedCourse(value: unknown): value is InstructorCourse {
    if (!value || typeof value !== "object") return false;
    const course = value as InstructorCourse;
    return (
        typeof course.id === "string" &&
        ["Draft", "Published"].includes(course.status) &&
        [
            "title",
            "summary",
            "description",
            "prerequisites",
            "coverName",
            "updatedAt",
        ].every(
            (field) =>
                typeof course[field as keyof InstructorCourse] === "string",
        ) &&
        ["Development", "Design", "Business", "Marketing"].includes(
            course.category,
        ) &&
        ["EGP", "SAR"].includes(course.currency) &&
        Number.isFinite(course.price) &&
        Number.isFinite(course.passingScore) &&
        typeof course.examEnabled === "boolean" &&
        Array.isArray(course.outcomes) &&
        course.outcomes.every((item) => typeof item === "string") &&
        Array.isArray(course.modules) &&
        course.modules.every(
            (module) =>
                typeof module.id === "string" &&
                typeof module.title === "string" &&
                Array.isArray(module.lessons) &&
                module.lessons.every(
                    (lesson) =>
                        typeof lesson.id === "string" &&
                        typeof lesson.title === "string" &&
                        ["video", "file"].includes(lesson.kind) &&
                        typeof lesson.fileName === "string" &&
                        typeof lesson.summary === "string" &&
                        Number.isFinite(lesson.durationSeconds),
                ),
        ) &&
        Array.isArray(course.questions) &&
        course.questions.every(
            (question) =>
                typeof question.id === "string" &&
                typeof question.prompt === "string" &&
                ["multiple-choice", "true-false"].includes(question.kind) &&
                typeof question.correctOptionId === "string" &&
                Array.isArray(question.options) &&
                question.options.every(
                    (option) =>
                        typeof option.id === "string" &&
                        typeof option.text === "string",
                ),
        )
    );
}
export function useInstructorWorkspace(courseId?: string) {
    const courses = ref<InstructorCourse[]>(
        JSON.parse(JSON.stringify(sampleInstructorCourses)),
    );
    const contactEnabled = ref(true);
    const notice = ref("");
    try {
        const raw =
            typeof window !== "undefined"
                ? window.sessionStorage.getItem(key)
                : null;
        if (raw) {
            const saved = JSON.parse(raw);
            if (
                Array.isArray(saved.courses) &&
                saved.courses.every(validSavedCourse) &&
                new Set(
                    saved.courses.map((course: InstructorCourse) => course.id),
                ).size === saved.courses.length &&
                typeof saved.contactEnabled === "boolean"
            ) {
                courses.value = saved.courses;
                contactEnabled.value = saved.contactEnabled;
            } else
                notice.value =
                    "The saved preview was invalid. Sample data has been restored.";
        }
    } catch {
        notice.value =
            "Storage is unavailable. Changes can only stay on this page.";
    }
    const course = computed({
        get: () => courses.value.find((item) => item.id === courseId),
        set: (value) => {
            const index = courses.value.findIndex(
                (item) => item.id === courseId,
            );
            if (value && index >= 0) courses.value[index] = value;
        },
    });
    function save() {
        if (course.value) course.value.updatedAt = new Date().toISOString();
        try {
            window.sessionStorage.setItem(
                key,
                JSON.stringify({
                    courses: courses.value,
                    contactEnabled: contactEnabled.value,
                }),
            );
            notice.value = "Local preview saved in this tab.";
            return true;
        } catch {
            notice.value =
                "Could not save this preview. Keep this page open to retain your changes.";
            return false;
        }
    }
    function createCourse() {
        const id = newPreviewId();
        courses.value.push({
            id,
            status: "Draft",
            title: "",
            summary: "",
            description: "",
            category: "Development",
            prerequisites: "",
            outcomes: [""],
            coverName: "",
            currency: "EGP",
            price: 0,
            modules: [],
            examEnabled: false,
            passingScore: 70,
            questions: [],
            updatedAt: new Date().toISOString(),
        });
        return save() ? id : null;
    }
    function deleteDraft(id: string) {
        const previous = courses.value;
        courses.value = courses.value.filter(
            (item) => item.id !== id || item.status !== "Draft",
        );
        if (save()) return true;
        courses.value = previous;
        return false;
    }
    function publish() {
        if (
            !course.value ||
            !courseReadiness(course.value).every((item) => item.ready)
        )
            return false;
        const previous = course.value.status;
        course.value.status = "Published";
        if (save()) return true;
        course.value.status = previous;
        return false;
    }
    return {
        courses,
        course,
        contactEnabled,
        notice,
        save,
        createCourse,
        deleteDraft,
        publish,
    };
}
