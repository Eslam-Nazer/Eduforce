import { computed, ref } from "vue";
import { sampleInstructorProfile } from "@/data/sample-instructor";
import type { InstructorService } from "@/types/instructor-consultations";
const key = "eduforce.instructor-services.v1";
const services = ref<InstructorService[]>(
    sampleInstructorProfile.services.map((item) => ({
        ...item,
        scope: [...item.scope],
        active: true,
        baseCurrency: "EGP",
        basePrice: item.egp,
    })),
);
const notice = ref("");
let loaded = false;
export function useInstructorServices() {
    if (!loaded && typeof window !== "undefined") {
        loaded = true;
        try {
            const saved: unknown = JSON.parse(
                sessionStorage.getItem(key) ?? "null",
            );
            if (saved !== null) {
                if (
                    !Array.isArray(saved) ||
                    saved.length > 100 ||
                    !saved.every(valid) ||
                    new Set(saved.map((item) => item.id)).size !== saved.length
                )
                    throw new Error("Invalid service data");
                services.value = saved;
            }
        } catch {
            notice.value =
                "Saved services could not be read. Sample services are shown.";
        }
    }
    function persist() {
        try {
            sessionStorage.setItem(key, JSON.stringify(services.value));
            notice.value = "Services saved in this tab only.";
        } catch {
            notice.value =
                "Storage unavailable. Changes remain in memory and may be lost on reload.";
        }
    }
    function save(item: InstructorService) {
        if (!valid(item)) {
            notice.value =
                "Service could not be saved. Check field limits and use no more than 30 scope lines.";
            return false;
        }
        const index = services.value.findIndex(
            (service) => service.id === item.id,
        );
        if (index < 0) {
            if (services.value.length >= 100) {
                notice.value = "This preview supports up to 100 services.";
                return false;
            }
            services.value.push(item);
        } else services.value[index] = item;
        persist();
        return true;
    }
    function toggle(id: string) {
        const item = services.value.find((service) => service.id === id);
        if (item) {
            item.active = !item.active;
            persist();
        }
    }
    function remove(id: string) {
        services.value = services.value.filter((item) => item.id !== id);
        persist();
    }
    return {
        services,
        publicServices: computed(() =>
            services.value.filter((item) => item.active),
        ),
        notice,
        save,
        toggle,
        remove,
    };
}
function valid(value: unknown): value is InstructorService {
    if (!value || typeof value !== "object") return false;
    const item = value as InstructorService;
    return (
        typeof item.id === "string" &&
        /^[a-z0-9-]{1,100}$/.test(item.id) &&
        typeof item.title === "string" &&
        !!item.title.trim() &&
        item.title.length <= 100 &&
        typeof item.description === "string" &&
        !!item.description.trim() &&
        item.description.length <= 1200 &&
        typeof item.category === "string" &&
        item.category.length <= 100 &&
        typeof item.audience === "string" &&
        item.audience.length <= 200 &&
        Array.isArray(item.scope) &&
        item.scope.length <= 30 &&
        item.scope.every(
            (line) => typeof line === "string" && line.length <= 1200,
        ) &&
        [30, 45, 60, 90].includes(item.durationMinutes) &&
        typeof item.active === "boolean" &&
        ["EGP", "SAR"].includes(item.baseCurrency) &&
        Number.isFinite(item.basePrice) &&
        item.basePrice >= 0 &&
        item.basePrice <= 1000000 &&
        Number.isFinite(item.egp) &&
        item.egp >= 0 &&
        Number.isFinite(item.sar) &&
        item.sar >= 0
    );
}
