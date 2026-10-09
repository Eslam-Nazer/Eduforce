import type { Currency } from './course';

export interface EnrolledCourse {
    id: string;
    title: string;
    instructor: string;
    image: string;
    moduleCount: number;
    completedVideos: number;
    totalVideos: number;
    purchasedAt: string;
    orderReference: string;
    amountPaid: number;
    paidCurrency: Currency;
    exam: { passingScore: number; passed: boolean } | null;
    nextLesson: { title: string; duration: string } | null;
}
