<script setup lang="ts">
import { useDisplayCurrency } from '@/composables/useDisplayCurrency';
import { Head, usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import { FlaskConical } from '@lucide/vue';
import CheckoutBilling from '@/components/CheckoutBilling.vue';
import CheckoutPayment from '@/components/CheckoutPayment.vue';
import CheckoutOrderSummary from '@/components/CheckoutOrderSummary.vue';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet';
import type {
    BillingCountry,
    CheckoutBuyer,
    CheckoutOrder,
    CheckoutPaymentMethod,
    Currency,
} from '@/types';

const country = ref<BillingCountry>('EG');
const currency = useDisplayCurrency();
const method = ref<CheckoutPaymentMethod>('hosted');
const previewOpen = ref(false);
const previewTitle = ref('');
function preview(title: string) {
    previewTitle.value = title;
    previewOpen.value = true;
}
// Prices are illustrative; no provider or exchange-rate service is connected.
const order: CheckoutOrder = {
    title: 'Full-Stack Web Development with Node.js & React',
    instructor: 'Ahmed Mansour',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80',
    prices: { EGP: 2400, SAR: 190 },
};
const buyer = computed<CheckoutBuyer>(() => {
    const user = usePage().props.auth.user;
    const name = user?.name ?? '';
    return {
        name,
        email: user?.email ?? '',
        initials: name
            .split(' ')
            .filter(Boolean)
            .map((part) => part[0])
            .slice(0, 2)
            .join(''),
    };
});
const chargeCurrency = computed<Currency>(() =>
    country.value === 'EG' ? 'EGP' : 'SAR',
);
const chargeAmount = computed(() => order.prices[chargeCurrency.value]);
</script>

<template>
    <Head title="Course Checkout" />
    <div class="checkout bg-[#f8fafc] text-slate-900">
        <section class="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
            <h1 class="text-3xl font-bold tracking-tight">
                Complete your purchase
            </h1>
            <p class="mt-3 text-sm leading-6 text-slate-500">
                Review your course selection and choose your billing country and
                display currency.
            </p>
            <Alert class="mt-6 border-0 bg-slate-100 text-slate-700"
                ><FlaskConical class="size-5 text-teal-700" /><AlertTitle
                    class="flex flex-wrap items-center gap-2"
                    >Test payment — no real money will be charged
                    <Badge
                        variant="secondary"
                        class="bg-teal-50 text-[10px] text-teal-800"
                        >SANDBOX PREVIEW</Badge
                    ></AlertTitle
                ><AlertDescription
                    >This is a local preview with sample data. Proceeding opens
                    a preview; it does not contact a payment
                    provider.</AlertDescription
                ></Alert
            >
            <div
                class="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
            >
                <div class="space-y-6">
                    <CheckoutBilling
                        v-model:country="country"
                        v-model:currency="currency"
                        :charge-currency="chargeCurrency"
                        :charge-amount="chargeAmount"
                    /><CheckoutPayment
                        v-model="method"
                        :amount="chargeAmount"
                        :currency="chargeCurrency"
                        @proceed="preview('Payment preview')"
                    />
                </div>
                <CheckoutOrderSummary
                    :order="order"
                    :buyer="buyer"
                    :currency="currency"
                />
            </div>
        </section>

        <Sheet v-model:open="previewOpen"
            ><SheetContent class="bg-white text-slate-900"
                ><SheetHeader
                    ><SheetTitle>{{ previewTitle }}</SheetTitle
                    ><SheetDescription v-if="previewTitle === 'Payment preview'"
                        >Sample payment:
                        {{
                            new Intl.NumberFormat('en-US').format(chargeAmount)
                        }}
                        {{ chargeCurrency }}. A hosted payment provider will be
                        connected later. No payment was made.</SheetDescription
                    ><SheetDescription v-else
                        >This page is coming soon. You are viewing a checkout
                        preview with sample data.</SheetDescription
                    ></SheetHeader
                ><Button
                    class="mx-4 bg-teal-700 text-white hover:bg-teal-800"
                    @click="previewOpen = false"
                    >Back to checkout</Button
                ></SheetContent
            ></Sheet
        >
    </div>
</template>

<style scoped>
.checkout {
    font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
    color-scheme: light;
}
</style>
