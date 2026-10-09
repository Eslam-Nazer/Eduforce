import type { Category, Currency } from "./course";

export interface InstructorLesson {
    id: string;
    title: string;
    kind: "video" | "file";
    fileName: string;
    durationSeconds: number;
    summary: string;
}
export interface InstructorModule {
    id: string;
    title: string;
    lessons: InstructorLesson[];
}
export interface InstructorQuestion {
    id: string;
    kind: "multiple-choice" | "true-false";
    prompt: string;
    options: { id: string; text: string }[];
    correctOptionId: string;
}
export interface InstructorCourse {
    id: string;
    status: "Draft" | "Published";
    title: string;
    summary: string;
    description: string;
    category: Category;
    prerequisites: string;
    outcomes: string[];
    coverName: string;
    currency: Currency;
    price: number;
    modules: InstructorModule[];
    examEnabled: boolean;
    passingScore: number;
    questions: InstructorQuestion[];
    updatedAt: string;
}
