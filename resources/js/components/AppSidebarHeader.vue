<script setup lang="ts">
import { BookOpenText } from '@lucide/vue';
import { Link } from '@inertiajs/vue3';
import SidebarHeader from '@/components/ui/sidebar/SidebarHeader.vue';
import SidebarMenu from '@/components/ui/sidebar/SidebarMenu.vue';
import SidebarMenuItem from '@/components/ui/sidebar/SidebarMenuItem.vue';
import SidebarMenuButton from '@/components/ui/sidebar/SidebarMenuButton.vue';

const appName = import.meta.env.VITE_APP_NAME;
</script>

<template>
    <SidebarHeader>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton size="lg" as-child
                    ><Link href="/" aria-label="Eduforce home">
                        <div class="flex items-center gap-3">
                            <div
                                class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
                            >
                                <BookOpenText class="size-4" />
                            </div>
                            <div class="flex flex-col gap-0.5 leading-none">
                                <span class="font-semibold">{{ appName }}</span>
                                <span class="text-muted-foreground text-xs"
                                    >Learning workspace</span
                                >
                            </div>
                        </div>
                    </Link></SidebarMenuButton
                >
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarHeader>
</template>
