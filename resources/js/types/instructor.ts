import type { Course } from "./course";

export interface ConsultationRequestDraft {
    subject: string;
    context: string;
    preferredTime: string;
    timeZone: "Africa/Cairo" | "Asia/Riyadh";
}

export type ConsultationRequestStatus =
    | "Requested"
    | "Discussing"
    | "Time Agreed"
    | "Confirmed"
    | "Completed"
    | "Rejected"
    | "Cancelled";
export interface ConsultationDiscussionMessage {
    id: string;
    text: string;
}
export interface ConsultationRequestPreview extends ConsultationRequestDraft {
    id: string;
    serviceId: string;
    status: ConsultationRequestStatus;
    sample: boolean;
    appointment?: string;
    messages: ConsultationDiscussionMessage[];
}

export interface ConsultationService {
    id: string;
    title: string;
    category: string;
    description: string;
    durationMinutes: number;
    egp: number;
    sar: number;
    scope: string[];
    audience: string;
}

export interface InstructorProfile {
    name: string;
    initials: string;
    headline: string;
    bio: string;
    languages: string[];
    stack: string;
    focus: string;
    timeZone: string;
    contactEnabled: boolean;
    courses: Course[];
    services: ConsultationService[];
}
