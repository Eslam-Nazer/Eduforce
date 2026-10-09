<script setup lang="ts">
import { computed, ref } from "vue";
import InstructorLayout from "@/layouts/InstructorLayout.vue";
import InstructorServiceCard from "@/components/InstructorServiceCard.vue";
import InstructorServiceEditor from "@/components/InstructorServiceEditor.vue";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useInstructorServices } from "@/composables/useInstructorServices";
import { useConsultationPreview } from "@/composables/useConsultationPreview";
import type { InstructorService } from "@/types/instructor-consultations";
const { services, notice, save, toggle, remove } = useInstructorServices();
const { localRequests } = useConsultationPreview();
const editing = ref<InstructorService | null>(null);
const deleting = ref<InstructorService | null>(null);
const confirmOpen = ref(false);
const filter = ref("All");
const visible = computed(() =>
    services.value.filter(
        (item) =>
            filter.value === "All" ||
            (filter.value === "Active" ? item.active : !item.active),
    ),
);
function create() {
    editing.value = {
        id: `service-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        title: "",
        description: "",
        category: "General Advisory",
        audience: "Individual learners",
        scope: [],
        durationMinutes: 60,
        baseCurrency: "EGP",
        basePrice: 0,
        egp: 0,
        sar: 0,
        active: false,
    };
}
function edit(item: InstructorService) {
    editing.value = { ...item, scope: [...item.scope] };
}
function submit(item: InstructorService) {
    if (save(item)) editing.value = null;
}
function askDelete(item: InstructorService) {
    if (localRequests.value.some((request) => request.serviceId === item.id)) {
        notice.value =
            "This service has saved request previews. Pause it to hide it from the public profile while keeping those previews.";
        return;
    }
    deleting.value = item;
    confirmOpen.value = true;
}
function confirmDelete() {
    if (!deleting.value) return;
    const id = deleting.value.id;
    remove(id);
    if (editing.value?.id === id) editing.value = null;
    deleting.value = null;
}
</script>
<template>
    <InstructorLayout
        title="Consultation Services"
        active="services"
        description="Offer standalone paid or free sessions, independently of your courses."
        ><div class="flex flex-wrap justify-between gap-3">
            <Tabs v-model="filter"
                ><TabsList
                    ><TabsTrigger
                        v-for="item in ['All', 'Active', 'Paused']"
                        :key="item"
                        :value="item"
                        >{{ item }}</TabsTrigger
                    ></TabsList
                ></Tabs
            ><Button
                class="bg-teal-700 text-white hover:bg-teal-800"
                @click="create"
                >Create consultation service</Button
            >
        </div>
        <p v-if="notice" role="status" class="text-sm text-teal-800">
            {{ notice }}
        </p>
        <div
            class="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,1fr)]"
        >
            <div class="space-y-5">
                <div class="grid gap-3 sm:grid-cols-3">
                    <Card
                        v-for="metric in [
                            {
                                label: 'Configured services',
                                value: services.length,
                            },
                            {
                                label: 'Active services',
                                value: services.filter((item) => item.active)
                                    .length,
                            },
                            {
                                label: 'Free services',
                                value: services.filter(
                                    (item) => item.basePrice === 0,
                                ).length,
                            },
                        ]"
                        :key="metric.label"
                        ><CardContent class="p-5"
                            ><p class="text-xs text-slate-500">
                                {{ metric.label }}
                            </p>
                            <p class="mt-3 text-2xl font-bold">
                                {{ metric.value }}
                            </p></CardContent
                        ></Card
                    >
                </div>
                <h2 class="font-semibold">Configured services</h2>
                <InstructorServiceCard
                    v-for="service in visible"
                    :key="service.id"
                    :service="service"
                    @edit="edit(service)"
                    @visibility="toggle(service.id)"
                    @remove="askDelete(service)"
                />
                <p
                    v-if="!visible.length"
                    class="rounded-xl border bg-white p-8 text-sm text-slate-500"
                >
                    No services match this filter.
                </p>
                <div class="rounded-xl bg-teal-50 p-5">
                    <h3 class="font-semibold">Public instructor profile</h3>
                    <p class="my-3 text-sm text-slate-600">
                        Only active services appear in this tab's public
                        preview.
                    </p>
                    <Button variant="outline" as-child
                        ><a
                            href="/instructors/ahmed-mansour#consultation-services"
                            >Open public view</a
                        ></Button
                    >
                </div>
            </div>
            <InstructorServiceEditor
                v-if="editing"
                :key="editing.id"
                :service="editing"
                @save="submit"
                @cancel="editing = null"
            />
            <div
                v-else
                class="rounded-xl border border-dashed p-6 text-sm leading-6 text-slate-500"
            >
                Choose Edit service or Create consultation service to open the
                editor. Service changes are local previews; existing sample
                purchase and request records retain their original details.
            </div>
        </div>
        <AlertDialog v-model:open="confirmOpen"
            ><AlertDialogContent
                ><AlertDialogHeader
                    ><AlertDialogTitle
                        >Delete this local service?</AlertDialogTitle
                    ><AlertDialogDescription
                        >{{ deleting?.title }} will be removed from this tab's
                        service list and public preview. Existing sample records
                        remain unchanged.</AlertDialogDescription
                    ></AlertDialogHeader
                ><AlertDialogFooter
                    ><AlertDialogCancel>Keep service</AlertDialogCancel
                    ><AlertDialogAction @click="confirmDelete"
                        >Delete local service</AlertDialogAction
                    ></AlertDialogFooter
                ></AlertDialogContent
            ></AlertDialog
        ></InstructorLayout
    >
</template>
