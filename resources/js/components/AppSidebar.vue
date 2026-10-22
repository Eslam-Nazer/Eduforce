<script setup lang="ts">
import AppSidebarFooter from '@/components/AppSidebarFooter.vue';
import AppSidebarHeader from '@/components/AppSidebarHeader.vue';
import Sidebar from '@/components/ui/sidebar/Sidebar.vue';
import SidebarContent from '@/components/ui/sidebar/SidebarContent.vue';
import type { User } from '@/types';
import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import {
    BookOpen,
    CalendarDays,
    GraduationCap,
    LayoutDashboard,
    MessageCircle,
    Receipt,
    Settings,
    Wallet,
} from '@lucide/vue';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarRail,
    useSidebar,
} from '@/components/ui/sidebar';

defineProps<{
    user: User;
}>();

const page = usePage();
const { setOpenMobile } = useSidebar();
const currentPath = computed(() => page.url.split('?')[0]);
const learning = [
    { title: 'My courses', href: '/my-courses', icon: GraduationCap },
    {
        title: 'My consultations',
        href: '/consultations/requests',
        icon: CalendarDays,
    },
    { title: 'Messages', href: '/messages', icon: MessageCircle },
    { title: 'Purchase history', href: '/purchase-history', icon: Receipt },
    { title: 'Account settings', href: '/settings', icon: Settings },
];
const instructor = [
    { title: 'Dashboard', href: '/instructor', icon: LayoutDashboard },
    { title: 'Courses', href: '/instructor/courses', icon: BookOpen },
    {
        title: 'Consultation services',
        href: '/instructor/consultations/services',
        icon: CalendarDays,
    },
    {
        title: 'Consultation requests',
        href: '/instructor/consultations/requests',
        icon: MessageCircle,
    },
    { title: 'Earnings', href: '/instructor/earnings', icon: Wallet },
];
function isActive(href: string) {
    return (
        currentPath.value === href ||
        (href !== '/instructor' && currentPath.value?.startsWith(`${href}/`))
    );
}
</script>

<template>
    <Sidebar collapsible="icon" class="print:hidden">
        <AppSidebarHeader />
        <SidebarContent>
            <SidebarGroup
                v-for="group in [
                    { title: 'Learning', items: learning },
                    { title: 'Instructor preview', items: instructor },
                ]"
                :key="group.title"
            >
                <SidebarGroupLabel>{{ group.title }}</SidebarGroupLabel>
                <SidebarMenu>
                    <SidebarMenuItem
                        v-for="item in group.items"
                        :key="item.href"
                    >
                        <SidebarMenuButton
                            as-child
                            :is-active="isActive(item.href)"
                            :tooltip="item.title"
                            ><Link
                                @click="setOpenMobile(false)"
                                :href="item.href"
                                :aria-current="
                                    isActive(item.href) ? 'page' : undefined
                                "
                                ><component :is="item.icon" /><span>{{
                                    item.title
                                }}</span></Link
                            ></SidebarMenuButton
                        >
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup
                ><SidebarMenu
                    ><SidebarMenuItem
                        ><SidebarMenuButton as-child tooltip="Browse courses"
                            ><Link @click="setOpenMobile(false)" href="/"
                                ><BookOpen /><span>Browse courses</span></Link
                            ></SidebarMenuButton
                        ></SidebarMenuItem
                    ><SidebarMenuItem
                        ><SidebarMenuButton
                            as-child
                            tooltip="Become an instructor"
                            ><Link
                                @click="setOpenMobile(false)"
                                href="/instructor/apply"
                                ><GraduationCap /><span
                                    >Become an instructor</span
                                ></Link
                            ></SidebarMenuButton
                        ></SidebarMenuItem
                    ></SidebarMenu
                ></SidebarGroup
            >
        </SidebarContent>
        <AppSidebarFooter :user="user" />
        <SidebarRail />
    </Sidebar>
</template>
