<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { ChevronLeft, ChevronRight, Search } from '@lucide/vue';
import { computed, ref } from 'vue';
import CourseCard from '@/components/CourseCard.vue';
import MarketplaceHeader from '@/components/MarketplaceHeader.vue';
import MarketplaceFooter from '@/components/MarketplaceFooter.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';

import type { Course, Currency } from '@/types';

// Illustrative catalogue and prices only; no live exchange rate or backend requests.
const courses: Course[] = [
    {
        id: 1,
        title: 'Full-Stack Web Development with Node.js & React',
        category: 'Development',
        instructor: 'Ahmed Mansour',
        egp: 2400,
        sar: 190,
        image: 'photo-1498050108023-c5249f4df085',
    },
    {
        id: 2,
        title: 'Fintech Product Management for MENA Markets',
        category: 'Business',
        instructor: 'Layla Al-Otaibi',
        egp: 3100,
        sar: 245,
        image: 'photo-1486406146926-c627a92ad1ab',
    },
    {
        id: 3,
        title: 'UI/UX Design Systems with Figma',
        category: 'Design',
        instructor: 'Kareem El-Sayed',
        egp: 1850,
        sar: 145,
        image: 'photo-1558655146-9f40138edfeb',
    },
    {
        id: 4,
        title: 'B2B Performance Marketing & Growth Strategies',
        category: 'Marketing',
        instructor: 'Nourhan Taha',
        egp: 1600,
        sar: 125,
        image: 'photo-1460925895917-afdab827c52f',
    },
    {
        id: 5,
        title: 'Financial Modeling & Valuation for Startups',
        category: 'Business',
        instructor: 'Omar Farooq',
        egp: 2800,
        sar: 220,
        image: 'photo-1454165804606-c3d57bc86b40',
    },
    {
        id: 6,
        title: 'Cloud Architecture on AWS: Associate to Professional',
        category: 'Development',
        instructor: 'Ahmed Mansour',
        egp: 3400,
        sar: 270,
        image: 'photo-1558494949-ef010cbdcc31',
    },
    {
        id: 7,
        title: 'Mobile App Development with Flutter & Dart',
        category: 'Development',
        instructor: 'Kareem El-Sayed',
        egp: 2200,
        sar: 175,
        image: 'photo-1512941937669-90a1b58e7e9c',
    },
    {
        id: 8,
        title: 'Brand Identity Design & Strategic Positioning',
        category: 'Design',
        instructor: 'Yasmine Mostafa',
        egp: 1950,
        sar: 155,
        image: 'photo-1541462608143-67571c6738dd',
    },
];
const categories = [
    'All',
    'Development',
    'Design',
    'Business',
    'Marketing',
] as const;
const category = ref<(typeof categories)[number]>('All');
const search = ref('');
const query = ref('');
const currency = ref<Currency>('EGP');
const filteredCourses = computed(() =>
    courses.filter(
        (course) =>
            (category.value === 'All' || course.category === category.value) &&
            `${course.title} ${course.instructor} ${course.category}`
                .toLowerCase()
                .includes(query.value.toLowerCase()),
    ),
);
const previewOpen = ref(false);
const previewTitle = ref('');
function preview(title: string) {
    previewTitle.value = title;
    previewOpen.value = true;
}
function resetFilters() {
    search.value = '';
    query.value = '';
    category.value = 'All';
}
</script>

<template>
    <Head title="Browse Courses" />
    <div class="marketplace min-h-screen bg-[#f8fafc] text-slate-900">
        <MarketplaceHeader
            v-model:currency="currency"
            @browse="resetFilters"
            @preview="preview"
        />

        <main
            id="courses"
            class="mx-auto max-w-7xl px-5 pt-10 pb-12 sm:px-8 sm:pt-12"
        >
            <section aria-labelledby="catalogue-heading">
                <p
                    class="mb-3 text-xs font-semibold tracking-[0.14em] text-teal-800"
                >
                    COURSE MARKETPLACE
                </p>
                <h1
                    id="catalogue-heading"
                    class="text-3xl font-bold tracking-tight sm:text-4xl"
                >
                    Find your next skill
                </h1>
                <p class="mt-3 text-sm leading-6 text-slate-500">
                    Browse practical courses by industry practitioners across
                    Egypt &amp; Saudi Arabia with lifetime access.
                </p>
                <form
                    class="mt-6 flex max-w-3xl gap-2"
                    role="search"
                    @submit.prevent="query = search.trim()"
                >
                    <div class="relative min-w-0 flex-1">
                        <Search
                            class="pointer-events-none absolute top-3 left-3 size-4 text-slate-400"
                            aria-hidden="true"
                        />
                        <Input
                            v-model="search"
                            aria-label="Search courses, topics, or instructors"
                            placeholder="Search courses, topics, or instructors..."
                            class="h-10 border-slate-200 bg-white pl-10 text-slate-900 placeholder:text-slate-400 focus-visible:border-teal-600 focus-visible:ring-teal-600/20"
                        />
                    </div>
                    <Button
                        type="submit"
                        class="h-10 bg-teal-700 px-6 text-white hover:bg-teal-800"
                        >Search</Button
                    >
                </form>
                <ToggleGroup
                    type="single"
                    :model-value="category"
                    :spacing="1"
                    class="mt-3 max-w-full flex-wrap rounded-lg bg-slate-100 p-1"
                    aria-label="Course categories"
                    @update:model-value="
                        (value) =>
                            (category =
                                categories.find((item) => item === value) ??
                                'All')
                    "
                >
                    <ToggleGroupItem
                        v-for="item in categories"
                        :key="item"
                        :value="item"
                        class="h-8 rounded-md px-3 text-xs text-slate-500 data-[state=on]:bg-white data-[state=on]:text-slate-900 data-[state=on]:shadow-sm"
                        >{{ item }}</ToggleGroupItem
                    >
                </ToggleGroup>
            </section>

            <div
                class="mt-7 mb-6 flex flex-wrap items-center justify-between gap-2 text-xs"
            >
                <p aria-live="polite" class="font-medium">
                    Showing {{ filteredCourses.length }}
                    {{ filteredCourses.length === 1 ? 'course' : 'courses' }}
                </p>
                <p class="text-slate-500">
                    Prices displayed in {{ currency }} (approx.
                    {{ currency === 'EGP' ? 'SAR' : 'EGP' }} shown). Lifetime
                    access included.
                </p>
            </div>
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <CourseCard
                    v-for="course in filteredCourses"
                    :key="course.id"
                    :course="course"
                    :currency="currency"
                    @view-details="preview($event.title)"
                />
            </div>
            <div
                v-if="!filteredCourses.length"
                class="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center"
            >
                <Search
                    class="mx-auto mb-4 size-8 text-slate-400"
                    aria-hidden="true"
                />
                <h2 class="font-semibold">No courses found</h2>
                <p class="mt-2 text-sm text-slate-500">
                    Try another topic, instructor, or category.
                </p>
                <Button variant="outline" class="mt-5" @click="resetFilters"
                    >Clear filters</Button
                >
            </div>
            <div
                class="mt-7 flex items-center justify-between gap-4 border-t border-slate-200 pt-6"
            >
                <p class="text-xs text-slate-500">
                    Showing
                    {{
                        filteredCourses.length
                            ? '1–' + filteredCourses.length
                            : '0'
                    }}
                    of {{ filteredCourses.length }} courses
                </p>
                <Pagination
                    :total="filteredCourses.length"
                    :items-per-page="8"
                    :page="1"
                    aria-label="Catalogue pagination"
                    class="mx-0 w-auto"
                >
                    <PaginationContent>
                        <PaginationPrevious
                            disabled
                            size="icon"
                            class="size-8 border border-slate-200"
                            ><ChevronLeft class="size-4"
                        /></PaginationPrevious>
                        <PaginationItem
                            v-if="filteredCourses.length"
                            :value="1"
                            is-active
                            class="size-8 bg-teal-700 text-white hover:bg-teal-800"
                            >1</PaginationItem
                        >
                        <PaginationNext
                            disabled
                            size="icon"
                            class="size-8 border border-slate-200"
                            ><ChevronRight class="size-4"
                        /></PaginationNext>
                    </PaginationContent>
                </Pagination>
            </div>
        </main>

        <MarketplaceFooter @preview="preview" />
        <Sheet v-model:open="previewOpen">
            <SheetContent class="bg-white text-slate-900">
                <SheetHeader>
                    <SheetTitle>{{ previewTitle }}</SheetTitle>
                    <SheetDescription
                        >This page is coming soon. You’re viewing a catalogue
                        preview with sample courses and
                        prices.</SheetDescription
                    >
                </SheetHeader>
                <Button
                    class="mx-4 bg-teal-700 text-white hover:bg-teal-800"
                    @click="previewOpen = false"
                    >Back to courses</Button
                >
            </SheetContent>
        </Sheet>
    </div>
</template>

<style scoped>
.marketplace {
    font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
    color-scheme: light;
}
</style>
