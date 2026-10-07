<script setup lang="ts">
import { BookOpen, Globe } from '@lucide/vue';
import { Button } from '@/components/ui/button';
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
const emit = defineEmits<{
    browse: [];
    preview: [title: string];
}>();
</script>

<template>
    <header class="border-b border-slate-200 bg-white">
        <div
            class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-5 sm:px-8"
        >
            <div class="flex flex-wrap items-center gap-6 lg:gap-9">
                <a
                    href="#"
                    class="flex items-center gap-2 text-lg font-bold tracking-tight"
                    @click.prevent="emit('browse')"
                >
                    <BookOpen class="size-6 text-teal-700" aria-hidden="true" />
                    Eduforce
                </a>
                <nav
                    aria-label="Main navigation"
                    class="flex items-center gap-6 text-sm"
                >
                    <a :href="browseHref" class="font-medium text-slate-900"
                        >Browse Courses</a
                    >
                    <Button
                        variant="ghost"
                        class="text-slate-500 hover:text-teal-700"
                        @click="emit('preview', 'Become an Instructor')"
                    >
                        Become an Instructor
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
                <Button
                    variant="ghost"
                    class="text-slate-600 hover:text-teal-700"
                    @click="emit('preview', 'Sign in')"
                >
                    Sign in
                </Button>
                <Button
                    class="bg-teal-700 text-white hover:bg-teal-800"
                    @click="emit('preview', 'Sign up')"
                    >Sign up</Button
                >
            </div>
        </div>
    </header>
</template>
