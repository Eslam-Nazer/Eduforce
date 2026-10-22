<script setup lang="ts">
import { BookOpen, Globe } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { Currency } from '@/types';

const currency = defineModel<Currency>('currency', { required: true });
withDefaults(defineProps<{ browseHref?: string }>(), {
    browseHref: '/#courses',
});
const page = usePage();
const user = computed(() => page.props.auth.user);
</script>

<template>
    <header class="border-b border-slate-200 bg-white">
        <div
            class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-5 sm:px-8"
        >
            <div class="flex flex-wrap items-center gap-6 lg:gap-9">
                <Link
                    href="/"
                    class="flex items-center gap-2 text-lg font-bold tracking-tight"
                >
                    <BookOpen class="size-6 text-teal-700" aria-hidden="true" />
                    Eduforce
                </Link>
                <nav
                    aria-label="Main navigation"
                    class="flex items-center gap-6 text-sm"
                >
                    <a :href="browseHref" class="font-medium text-slate-900"
                        >Browse Courses</a
                    >
                    <Button
                        as-child
                        variant="ghost"
                        class="text-slate-500 hover:text-teal-700"
                    >
                        <a href="/instructor/apply">Become an Instructor</a>
                    </Button>
                </nav>
            </div>
            <div class="flex items-center gap-4 text-sm">
                <Select v-model="currency">
                    <SelectTrigger
                        aria-label="Display currency"
                        class="w-36 border-slate-200 bg-white text-slate-900"
                        ><Globe
                            class="size-4 text-slate-500"
                            aria-hidden="true" /><SelectValue
                    /></SelectTrigger>
                    <SelectContent
                        ><SelectItem value="EGP">EGP (£)</SelectItem
                        ><SelectItem value="SAR">SAR</SelectItem></SelectContent
                    >
                </Select>
                <DropdownMenu v-if="user">
                    <DropdownMenuTrigger as-child
                        ><Button variant="outline" class="max-w-48"
                            ><span class="truncate">{{
                                user.name
                            }}</span></Button
                        ></DropdownMenuTrigger
                    >
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem as-child
                            ><Link href="/my-courses"
                                >My courses</Link
                            ></DropdownMenuItem
                        >
                        <DropdownMenuItem as-child
                            ><Link href="/settings"
                                >Account settings</Link
                            ></DropdownMenuItem
                        >
                        <DropdownMenuSeparator />
                        <DropdownMenuItem as-child
                            ><Link
                                href="/logout"
                                method="post"
                                as="button"
                                class="w-full"
                                >Log out</Link
                            ></DropdownMenuItem
                        >
                    </DropdownMenuContent>
                </DropdownMenu>
                <template v-else>
                    <Button
                        as-child
                        variant="ghost"
                        class="text-slate-600 hover:text-teal-700"
                        ><a href="/login">Sign in</a></Button
                    >
                    <Button
                        as-child
                        class="bg-teal-700 text-white hover:bg-teal-800"
                        ><a href="/register">Sign up</a></Button
                    >
                </template>
            </div>
        </div>
    </header>
</template>
