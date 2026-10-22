<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import MarketplaceHeader from '@/components/MarketplaceHeader.vue';
import MarketplaceFooter from '@/components/MarketplaceFooter.vue';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet';
import { provideDisplayCurrency } from '@/composables/useDisplayCurrency';

const page = usePage();
const isAccountForm = computed(() => page.component.startsWith('Auth/'));
const currency = provideDisplayCurrency();
const legalTitle = ref('');
const legalOpen = ref(false);
function openLegal(title: string) {
    legalTitle.value = title;
    legalOpen.value = true;
}
</script>

<template>
    <div class="bg-muted/30 text-foreground flex min-h-screen flex-col">
        <MarketplaceHeader v-model:currency="currency" />
        <main
            v-if="isAccountForm"
            class="flex flex-1 items-center justify-center px-5 py-8"
        >
            <div class="w-full max-w-md"><slot /></div>
        </main>
        <div v-else class="flex-1"><slot /></div>
        <MarketplaceFooter @preview="openLegal" />
        <Sheet v-model:open="legalOpen"
            ><SheetContent
                ><SheetHeader
                    ><SheetTitle>{{ legalTitle }}</SheetTitle
                    ><SheetDescription
                        >This document will be available when the platform
                        launches.</SheetDescription
                    ></SheetHeader
                ></SheetContent
            ></Sheet
        >
    </div>
</template>
