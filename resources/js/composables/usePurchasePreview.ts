import { computed } from "vue";
import {
    sampleCourseTitle,
    sampleInstructor,
    sampleModules,
} from "@/data/sample-course";
import { sampleInstructorProfile } from "@/data/sample-instructor";
import { useLearningPreview } from "./useLearningPreview";
import type { PurchaseTransaction, RefundEligibility } from "@/types/purchase";

export function refundEligibility(
    transaction: PurchaseTransaction,
    now = Date.now(),
): RefundEligibility {
    if (transaction.amount <= 0)
        return {
            eligible: false,
            reason: "Free services have no payment to refund.",
        };
    if (transaction.kind === "course") {
        const elapsed = now - Date.parse(transaction.purchasedAt);
        if (
            !Number.isFinite(elapsed) ||
            elapsed < 0 ||
            elapsed > 14 * 24 * 60 * 60 * 1000
        )
            return {
                eligible: false,
                reason: "The 14-day course refund window has closed.",
            };
        if (transaction.completedVideos > 3)
            return {
                eligible: false,
                reason: "More than 3 videos have been completed.",
            };
        return {
            eligible: true,
            reason: "Within 14 days of purchase, with no more than 3 completed videos.",
        };
    }
    if (transaction.status === "Completed")
        return {
            eligible: false,
            reason: "This consultation has already been completed.",
        };
    const remaining = Date.parse(transaction.appointment) - now;
    if (!Number.isFinite(remaining) || remaining < 24 * 60 * 60 * 1000)
        return {
            eligible: false,
            reason: "Cancellation must be at least 24 hours before the agreed appointment.",
        };
    return {
        eligible: true,
        reason: "At least 24 hours remain before the agreed appointment.",
    };
}

export function formatPurchaseAmount(transaction: PurchaseTransaction) {
    return transaction.amount === 0
        ? "Free"
        : `${new Intl.NumberFormat("en-US").format(transaction.amount)} ${transaction.currency}`;
}

export function usePurchasePreview() {
    const { completedIds } = useLearningPreview();
    const paid = sampleInstructorProfile.services.find(
        (service) => service.id === "architecture-review",
    )!;
    const free = sampleInstructorProfile.services.find(
        (service) => service.id === "career-advisory",
    )!;
    const transactions = computed<PurchaseTransaction[]>(() => [
        {
            id: "full-stack",
            kind: "course",
            title: sampleCourseTitle,
            instructor: sampleInstructor,
            purchasedAt: "2026-10-07T12:00:00+03:00",
            amount: 2400,
            currency: "EGP",
            reference: "EDF-DEMO-94821",
            completedVideos: completedIds.value.length,
            totalVideos: sampleModules
                .flatMap((module) => module.lessons)
                .filter((lesson) => lesson.kind === "video").length,
        },
        {
            id: "architecture-review",
            kind: "consultation",
            title: paid.title,
            instructor: sampleInstructor,
            purchasedAt: "2026-10-08T12:00:00+03:00",
            amount: paid.egp,
            currency: "EGP",
            reference: "EDF-DEMO-94822",
            appointment: "2026-10-20T15:00:00+03:00",
            status: "Confirmed",
            durationMinutes: paid.durationMinutes,
        },
        {
            id: "career-advisory",
            kind: "consultation",
            title: free.title,
            instructor: sampleInstructor,
            purchasedAt: "2026-10-06T12:00:00+03:00",
            amount: 0,
            currency: "EGP",
            reference: "EDF-DEMO-94823",
            appointment: "2026-10-08T15:00:00+03:00",
            status: "Completed",
            durationMinutes: free.durationMinutes,
        },
    ]);
    return { transactions };
}
