<script setup lang="ts">
import NavUser from "@/components/NavUser.vue";
import SidebarFooter from "@/components/ui/sidebar/SidebarFooter.vue";
import { User } from "@/types";

const props = defineProps<{
    user: User;
}>();
</script>

<template>
    <SidebarFooter>
        <NavUser :user="props.user" />
    </SidebarFooter>
</template>
