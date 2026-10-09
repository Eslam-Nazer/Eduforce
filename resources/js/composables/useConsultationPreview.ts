import { ref } from "vue";
import { sampleInstructorProfile } from "@/data/sample-instructor";
import { useInstructorServices } from "./useInstructorServices";
import type {
    ConsultationRequestDraft,
    ConsultationRequestPreview,
} from "@/types/instructor";
const storageKey = "eduforce.consultation-preview.v1";
const localRequests = ref<ConsultationRequestPreview[]>([]);
const storageNotice = ref("");
let loaded = false;
function load() {
    if (loaded || typeof window === "undefined") return;
    loaded = true;
    try {
        const value: unknown = JSON.parse(
            sessionStorage.getItem(storageKey) ?? "[]",
        );
        if (!Array.isArray(value)) return;
        localRequests.value = value.filter(
            (item): item is ConsultationRequestPreview => {
                if (!item || typeof item !== "object") return false;
                const entry = item as Record<string, unknown>;
                return (
                    typeof entry.id === "string" &&
                    entry.id.startsWith("local-") &&
                    [
                        ...sampleInstructorProfile.services,
                        ...useInstructorServices().services.value,
                    ].some((service) => service.id === entry.serviceId) &&
                    entry.status === "Requested" &&
                    entry.sample === false &&
                    typeof entry.subject === "string" &&
                    !!entry.subject.trim() &&
                    entry.subject.length <= 100 &&
                    typeof entry.context === "string" &&
                    !!entry.context.trim() &&
                    entry.context.length <= 1200 &&
                    typeof entry.preferredTime === "string" &&
                    entry.preferredTime.length <= 200 &&
                    (entry.timeZone === "Africa/Cairo" ||
                        entry.timeZone === "Asia/Riyadh") &&
                    Array.isArray(entry.messages) &&
                    entry.messages.every(
                        (message) =>
                            message &&
                            typeof message.id === "string" &&
                            typeof message.text === "string" &&
                            message.text.length <= 2000,
                    )
                );
            },
        );
    } catch {
        storageNotice.value =
            "Saved previews could not be read. This tab can still use local previews.";
    }
}
function persist() {
    try {
        sessionStorage.setItem(storageKey, JSON.stringify(localRequests.value));
    } catch {
        storageNotice.value =
            "Browser storage is unavailable. Previews remain in memory and may be lost on reload.";
    }
}
export function useConsultationPreview() {
    load();
    function create(serviceId: string, draft: ConsultationRequestDraft) {
        const request: ConsultationRequestPreview = {
            ...draft,
            id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            serviceId,
            status: "Requested",
            sample: false,
            messages: [],
        };
        localRequests.value.unshift(request);
        persist();
        return request.id;
    }
    function addMessage(id: string, text: string) {
        const request = localRequests.value.find((item) => item.id === id);
        if (!request || !text.trim()) return;
        request.messages.push({
            id: `message-${Date.now()}-${request.messages.length}`,
            text: text.trim().slice(0, 2000),
        });
        persist();
    }
    return { localRequests, storageNotice, create, addMessage };
}
