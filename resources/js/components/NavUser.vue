<script setup lang="ts">
import {
    ChevronsUpDown,
    CreditCard,
    LogOut,
    User as UserIcon,
} from '@lucide/vue';
import { Link } from '@inertiajs/vue3';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import type { User } from '@/types';

defineProps<{
    user: User;
}>();

const { isMobile, setOpenMobile } = useSidebar();
</script>

<template>
    <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <SidebarMenuButton
                        size="lg"
                        class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                        <Avatar class="h-8 w-8 rounded-lg">
                            <AvatarImage
                                :src="user.avatar ?? ''"
                                :alt="user.name"
                            />
                            <AvatarFallback class="rounded-lg">
                                <UserIcon class="size-4" />
                            </AvatarFallback>
                        </Avatar>
                        <div
                            class="grid flex-1 text-left text-sm leading-tight"
                        >
                            <span class="truncate font-medium">{{
                                user.name
                            }}</span>
                            <span class="truncate text-xs">{{
                                user.email
                            }}</span>
                        </div>
                        <ChevronsUpDown class="ml-auto size-4" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    class="w-(--reka-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                    :side="isMobile ? 'bottom' : 'right'"
                    align="end"
                    :side-offset="4"
                >
                    <DropdownMenuGroup>
                        <DropdownMenuItem as-child
                            ><Link
                                @click="setOpenMobile(false)"
                                href="/settings"
                                ><UserIcon />Account settings</Link
                            ></DropdownMenuItem
                        >
                        <DropdownMenuItem as-child
                            ><Link
                                @click="setOpenMobile(false)"
                                href="/purchase-history"
                                ><CreditCard />Purchase history</Link
                            ></DropdownMenuItem
                        >
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem as-child
                        ><Link
                            @click="setOpenMobile(false)"
                            href="/logout"
                            method="post"
                            as="button"
                            class="w-full"
                            ><LogOut />Log out</Link
                        ></DropdownMenuItem
                    >
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
