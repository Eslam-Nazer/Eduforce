<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import AppSidebar from '@/components/AppSidebar.vue';
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { provideDisplayCurrency } from '@/composables/useDisplayCurrency';
import { workspaceBreadcrumbs } from '@/lib/navigation';

const page = usePage();
const user = computed(() => page.props.auth.user);
const breadcrumbs = computed(() => workspaceBreadcrumbs(page.component));
const currency = provideDisplayCurrency();
</script>

<template>
    <SidebarProvider>
        <AppSidebar v-if="user" :user="user" />
        <SidebarInset class="min-w-0">
            <header
                class="bg-background flex min-h-16 flex-wrap items-center gap-3 border-b px-4 py-3 sm:px-6 print:hidden"
            >
                <SidebarTrigger />
                <Separator orientation="vertical" class="h-4" />
                <Breadcrumb class="min-w-0 flex-1">
                    <BreadcrumbList>
                        <BreadcrumbItem
                            ><BreadcrumbLink as-child
                                ><Link href="/">Home</Link></BreadcrumbLink
                            ></BreadcrumbItem
                        >
                        <template
                            v-for="(item, index) in breadcrumbs"
                            :key="item.title"
                        >
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage
                                    v-if="index === breadcrumbs.length - 1"
                                    >{{ item.title }}</BreadcrumbPage
                                >
                                <BreadcrumbLink v-else as-child
                                    ><Link :href="item.href">{{
                                        item.title
                                    }}</Link></BreadcrumbLink
                                >
                            </BreadcrumbItem>
                        </template>
                    </BreadcrumbList>
                </Breadcrumb>
                <Select v-model="currency"
                    ><SelectTrigger class="w-24" aria-label="Display currency"
                        ><SelectValue /></SelectTrigger
                    ><SelectContent
                        ><SelectItem value="EGP">EGP</SelectItem
                        ><SelectItem value="SAR">SAR</SelectItem></SelectContent
                    ></Select
                >
            </header>
            <div class="bg-muted/30 min-w-0 flex-1"><slot /></div>
        </SidebarInset>
    </SidebarProvider>
</template>
