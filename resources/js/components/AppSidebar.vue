<script setup lang="ts">
import AppSidebarFooter from "@/components/AppSidebarFooter.vue";
import AppSidebarHeader from "@/components/AppSidebarHeader.vue";
import Sidebar from "@/components/ui/sidebar/Sidebar.vue";
import SidebarContent from "@/components/ui/sidebar/SidebarContent.vue";
import { User } from "@/types";

const props = defineProps<{
    user: User;
}>();
</script>

<template>
    <Sidebar collapsible="icon">
        <AppSidebarHeader />
        <SidebarContent />
        <AppSidebarFooter :user="user" />
    </Sidebar>
</template>
