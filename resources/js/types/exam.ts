export interface ExamOption {
    id: string;
    label: string;
}
export interface ExamQuestion {
    id: string;
    type: 'true-false' | 'single-choice';
    prompt: string;
    options: ExamOption[];
    correctOptionId: string;
    explanation: string;
}
export interface CourseExam {
    passingScore: number;
    questions: ExamQuestion[];
}

export interface ExamAttempt {
    answers: Record<string, string>;
    submittedAt: string;
}
