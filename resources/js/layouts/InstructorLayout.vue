<script setup lang="ts">
import { Head } from "@inertiajs/vue3";
import { ref } from "vue";
import {
    BookOpen,
    LayoutDashboard,
    GraduationCap,
    MessageCircle,
    Menu,
} from "@lucide/vue";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
defineProps<{
    title: string;
    description?: string;
    active?: "dashboard" | "courses" | "services" | "requests" | "earnings";
}>();
const menuOpen = ref(false);
</script>
<template>
    <Head :title="title" />
    <div class="instructor-workspace min-h-screen bg-slate-50 text-slate-900">
        <aside
            class="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col border-r border-slate-200 bg-white p-5 lg:flex"
        >
            <a
                href="/instructor"
                class="flex items-center gap-2 text-xl font-bold"
                ><BookOpen class="size-6 text-teal-700" />Eduforce
                <span
                    class="rounded bg-teal-50 px-2 py-1 text-[10px] text-teal-800"
                    >Portal</span
                ></a
            >
            <p
                class="mt-10 mb-3 text-[10px] font-semibold tracking-wider text-slate-400"
            >
                MAIN NAVIGATION
            </p>
            <nav class="space-y-2" aria-label="Instructor navigation">
                <Button
                    as-child
                    variant="ghost"
                    class="w-full justify-start"
                    :class="
                        active === 'dashboard'
                            ? 'bg-teal-700 text-white hover:bg-teal-800 hover:text-white'
                            : ''
                    "
                    ><a href="/instructor"
                        ><LayoutDashboard class="size-4" />Dashboard</a
                    ></Button
                ><Button
                    as-child
                    variant="ghost"
                    class="w-full justify-start"
                    :class="
                        active === 'courses'
                            ? 'bg-teal-700 text-white hover:bg-teal-800 hover:text-white'
                            : ''
                    "
                    ><a href="/instructor/courses"
                        ><GraduationCap class="size-4" />Courses</a
                    ></Button
                ><Button
                    v-for="item in [
                        {
                            key: 'services',
                            title: 'Consultation Services',
                            href: '/instructor/consultations/services',
                        },
                        {
                            key: 'requests',
                            title: 'Consultation Requests',
                            href: '/instructor/consultations/requests',
                        },
                        {
                            key: 'earnings',
                            title: 'Earnings & Transactions',
                            href: '/instructor/earnings',
                        },
                    ]"
                    :key="item.key"
                    as-child
                    variant="ghost"
                    class="w-full justify-start"
                    :class="
                        active === item.key
                            ? 'bg-teal-700 text-white hover:bg-teal-800 hover:text-white'
                            : ''
                    "
                    ><a :href="item.href">{{ item.title }}</a></Button
                >
            </nav>
            <div
                class="mt-auto rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-500"
            >
                Instructor workspace preview<br /><span
                    class="font-medium text-teal-800"
                    >Ahmed Mansour</span
                >
            </div>
        </aside>
        <div class="lg:pl-60">
            <header
                class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 py-4 sm:px-8"
            >
                <div class="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="icon"
                        class="lg:hidden"
                        aria-label="Open instructor navigation"
                        @click="menuOpen = true"
                        ><Menu class="size-4"
                    /></Button>
                    <p class="text-sm font-semibold">Instructor Portal</p>
                </div>
                <div class="flex items-center gap-4 text-xs">
                    <a href="/my-courses" class="text-teal-800"
                        >Switch to learning</a
                    ><a
                        href="/messages"
                        aria-label="Messages"
                        class="text-slate-600"
                        ><MessageCircle class="size-4" /></a
                    ><a
                        href="/settings"
                        class="flex size-8 items-center justify-center rounded-full bg-teal-50 font-semibold text-teal-800"
                        aria-label="Account settings"
                        >AM</a
                    >
                </div>
            </header>
            <main class="mx-auto max-w-7xl space-y-6 px-5 py-8 sm:px-8">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">
                        {{ title }}
                    </h1>
                    <p
                        v-if="description"
                        class="mt-2 text-sm leading-6 text-slate-500"
                    >
                        {{ description }}
                    </p>
                </div>
                <p
                    class="rounded-lg border border-teal-100 bg-teal-50 p-4 text-xs leading-6 text-teal-900"
                >
                    Local instructor preview. Course drafts, services and
                    workspace settings are saved in this tab. Request scenarios
                    reset on navigation. Nothing is uploaded, transmitted,
                    charged or published to the platform.
                </p>
                <slot />
            </main>
        </div>
        <Sheet v-model:open="menuOpen"
            ><SheetContent side="left" class="bg-white text-slate-900"
                ><SheetHeader
                    ><SheetTitle>Instructor navigation</SheetTitle
                    ><SheetDescription
                        >Choose a workspace page.</SheetDescription
                    ></SheetHeader
                >
                <nav class="space-y-3 p-4">
                    <Button as-child variant="outline" class="w-full"
                        ><a href="/instructor">Dashboard</a></Button
                    ><Button as-child variant="outline" class="w-full"
                        ><a href="/instructor/courses">Courses</a></Button
                    ><Button
                        v-for="item in [
                            {
                                title: 'Consultation Services',
                                href: '/instructor/consultations/services',
                            },
                            {
                                title: 'Consultation Requests',
                                href: '/instructor/consultations/requests',
                            },
                            {
                                title: 'Earnings & Transactions',
                                href: '/instructor/earnings',
                            },
                        ]"
                        :key="item.href"
                        as-child
                        variant="outline"
                        class="w-full"
                        ><a :href="item.href">{{ item.title }}</a></Button
                    ><Button as-child variant="outline" class="w-full"
                        ><a href="/my-courses">Switch to learning</a></Button
                    >
                </nav></SheetContent
            ></Sheet
        >
    </div>
</template>
<style scoped>
.instructor-workspace {
    font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
    color-scheme: light;
}
</style>
