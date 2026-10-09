<script setup lang="ts">
import { BookOpen } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

withDefaults(defineProps<{ browseHref?: string }>(), {
    browseHref: "/#courses",
});

const emit = defineEmits<{
    preview: [title: string];
}>();
const links = ["Terms of Service", "Privacy Policy"];
const year = new Date().getFullYear();
</script>

<template>
    <footer class="border-t border-slate-200 bg-white text-slate-500">
        <div class="mx-auto max-w-7xl px-5 py-8 sm:px-8">
            <div
                class="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between"
            >
                <div class="flex items-start gap-3 text-sm sm:items-center">
                    <BookOpen
                        class="size-5 shrink-0 text-teal-800"
                        aria-hidden="true"
                    />
                    <p class="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span class="text-base font-semibold text-slate-900"
                            >Eduforce</span
                        >
                        <span aria-hidden="true">—</span>
                        <span
                            >Skills &amp; practitioner courses across MENA</span
                        >
                    </p>
                </div>
                <nav
                    aria-label="Footer navigation"
                    class="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
                >
                    <Button
                        variant="link"
                        as-child
                        class="h-auto p-0 text-sm font-normal text-slate-500 hover:text-teal-700 hover:no-underline"
                    >
                        <a :href="browseHref">Browse Courses</a>
                    </Button>
                    <Button
                        as-child
                        variant="link"
                        class="h-auto p-0 text-sm font-normal text-slate-500 hover:text-teal-700 hover:no-underline"
                        ><a href="/instructor/apply"
                            >Become an Instructor</a
                        ></Button
                    >
                    <Button
                        v-for="link in links"
                        :key="link"
                        variant="link"
                        class="h-auto p-0 text-sm font-normal text-slate-500 hover:text-teal-700 hover:no-underline"
                        @click="emit('preview', link)"
                        >{{ link }}</Button
                    >
                </nav>
            </div>
            <Separator class="my-6 bg-slate-100" />
            <div
                class="flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"
            >
                <p>© {{ year }} Eduforce Inc. All rights reserved.</p>
                <p>EGP &amp; SAR multi-currency support</p>
            </div>
        </div>
    </footer>
</template>
