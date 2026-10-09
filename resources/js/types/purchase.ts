import type { Currency } from "./course";

interface PurchaseBase {
    id: string;
    title: string;
    instructor: string;
    purchasedAt: string;
    amount: number;
    currency: Currency;
    reference: string;
}

export type PurchaseTransaction = PurchaseBase &
    (
        | { kind: "course"; completedVideos: number; totalVideos: number }
        | {
              kind: "consultation";
              appointment: string;
              status: "Confirmed" | "Completed";
              durationMinutes: number;
          }
    );

export interface RefundEligibility {
    eligible: boolean;
    reason: string;
}
export interface RefundDraft {
    transactionId: string;
    reason: string;
    details: string;
}
