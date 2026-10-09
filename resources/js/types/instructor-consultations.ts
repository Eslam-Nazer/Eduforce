import type {
    ConsultationService,
    ConsultationRequestPreview,
} from "./instructor";
import type { Currency } from "./course";

export interface InstructorService extends ConsultationService {
    active: boolean;
    baseCurrency: Currency;
    basePrice: number;
}
export interface InstructorRequest extends ConsultationRequestPreview {
    learner: string;
    meetingUrl: string;
    proposal: string;
}
export interface InstructorTransaction {
    id: string;
    kind: "course" | "consultation";
    learner: string;
    title: string;
    date: string;
    amount: number;
    currency: Currency;
    status: "Paid sample" | "Refunded sample" | "Free activity";
}
