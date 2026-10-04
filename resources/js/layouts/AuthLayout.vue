<script setup lang="ts">
import AppBreadcrumn from "@/components/AppBreadcrumn.vue";
import AppSidebar from "@/components/AppSidebar.vue";
import SidebarProvider from "@/components/ui/sidebar/SidebarProvider.vue";

</script>

<template>
    <SidebarProvider>
        <AppSidebar :user="$page.props.auth.user" />
        <SidebarInset class="flex flex-1 flex-col">
            <AppBreadcrumn />
            <main class="p-4">
                <slot />
            </main>
        </SidebarInset>
    </SidebarProvider>
</template>
