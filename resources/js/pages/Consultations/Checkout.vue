<script setup lang="ts">
import { Head, router } from "@inertiajs/vue3";
import { computed, ref } from "vue";
import { FlaskConical, Info } from "@lucide/vue";
import MarketplaceHeader from "@/components/MarketplaceHeader.vue";
import MarketplaceFooter from "@/components/MarketplaceFooter.vue";
import CheckoutBilling from "@/components/CheckoutBilling.vue";
import CheckoutPayment from "@/components/CheckoutPayment.vue";
import ConsultationCheckoutSummary from "@/components/ConsultationCheckoutSummary.vue";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { sampleInstructorProfile as instructor } from "@/data/sample-instructor";
import { sampleConsultationRequests } from "@/data/sample-consultation-requests";
import { useConsultationPreview } from "@/composables/useConsultationPreview";
import type { Currency } from "@/types/course";
import type { BillingCountry, CheckoutPaymentMethod } from "@/types/checkout";
const { localRequests } = useConsultationPreview();
const requestId =
    typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("request")
        : null;
const request = computed(() =>
    [...localRequests.value, ...sampleConsultationRequests].find(
        (item) => item.id === requestId,
    ),
);
const service = computed(() =>
    instructor.services.find((item) => item.id === request.value?.serviceId),
);
const eligible = computed(
    () =>
        !!request.value?.appointment &&
        request.value.status === "Time Agreed" &&
        !!service.value &&
        service.value.egp > 0,
);
const country = ref<BillingCountry>("EG");
const currency = ref<Currency>("EGP");
const method = ref<CheckoutPaymentMethod>("hosted");
const chargeCurrency = computed<Currency>(() =>
    country.value === "EG" ? "EGP" : "SAR",
);
const chargeAmount = computed(
    () =>
        (chargeCurrency.value === "EGP"
            ? service.value?.egp
            : service.value?.sar) ?? 0,
);
const sheetOpen = ref(false);
const sheetTitle = ref("");
const paymentPreview = ref(false);
function preview(title: string) {
    paymentPreview.value = false;
    sheetTitle.value = title;
    sheetOpen.value = true;
}
function proceed() {
    if (!eligible.value) return;
    paymentPreview.value = true;
    sheetTitle.value = "Consultation Payment Preview";
    sheetOpen.value = true;
}
const trackingHref = computed(() =>
    request.value
        ? `/consultations/requests?request=${encodeURIComponent(request.value.id)}`
        : "/consultations/requests",
);
</script>
<template>
    <Head title="Consultation Checkout" />
    <div class="consultation-checkout min-h-screen bg-slate-50 text-slate-900">
        <MarketplaceHeader
            v-model:currency="currency"
            account-name="Kareem Tarek"
            @browse="router.visit('/')"
            @preview="preview"
        />
        <main class="mx-auto max-w-7xl space-y-7 px-5 py-8 sm:px-8">
            <nav
                aria-label="Breadcrumb"
                class="flex flex-wrap gap-2 text-sm text-slate-500"
            >
                <a :href="trackingHref" class="text-teal-800"
                    >Consultation Requests</a
                ><span>/</span
                ><span>{{ service?.title ?? "Consultation" }}</span
                ><span>/</span><span aria-current="page">Checkout</span>
            </nav>
            <template v-if="eligible && request && service"
                ><div>
                    <h1 class="text-3xl font-bold">
                        Complete Consultation Payment
                    </h1>
                    <p class="mt-3 text-sm text-slate-600">
                        Review the agreed appointment with
                        {{ instructor.name }}.
                    </p>
                </div>
                <Alert class="border-teal-100 bg-teal-50"
                    ><FlaskConical class="size-4" /><AlertTitle
                        >Test Payment Preview</AlertTitle
                    ><AlertDescription
                        >No real money is charged. No payment provider or live
                        sandbox transaction is connected.</AlertDescription
                    ></Alert
                >
                <div
                    class="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]"
                >
                    <div class="min-w-0 space-y-6">
                        <CheckoutBilling
                            v-model:country="country"
                            v-model:currency="currency"
                            :charge-currency="chargeCurrency"
                            :charge-amount="chargeAmount"
                        /><Card class="border-slate-200 bg-white shadow-sm"
                            ><CardContent class="p-5 sm:p-6"
                                ><h2 class="text-lg font-semibold">
                                    Cancellation & Refund Policy
                                </h2>
                                <p
                                    class="mt-3 text-sm leading-6 text-slate-600"
                                >
                                    Cancel at least 24 hours before the agreed
                                    appointment to be eligible for a refund.
                                </p></CardContent
                            ></Card
                        ><CheckoutPayment
                            v-model="method"
                            :amount="chargeAmount"
                            :currency="chargeCurrency"
                            @proceed="proceed"
                        />
                    </div>
                    <aside
                        aria-label="Reservation summary"
                        class="lg:sticky lg:top-6"
                    >
                        <ConsultationCheckoutSummary
                            :request="request"
                            :service="service"
                            :currency="currency"
                            :charge-currency="chargeCurrency"
                            :charge-amount="chargeAmount"
                        />
                    </aside>
                </div>
            </template>
            <div v-else class="rounded-xl border border-slate-200 bg-white p-6">
                <h1 class="text-2xl font-semibold">
                    Payment is not available for this request
                </h1>
                <p class="mt-3 text-sm leading-6 text-slate-600">
                    {{
                        service?.egp === 0
                            ? "This service is free and does not require checkout."
                            : "Select a paid request with an agreed appointment. New, closed or already confirmed requests cannot proceed to payment here."
                    }}
                </p>
                <Button as-child variant="outline" class="mt-5"
                    ><a :href="trackingHref">Back to Requests</a></Button
                >
            </div>
        </main>
        <MarketplaceFooter @preview="preview" />
        <Sheet v-model:open="sheetOpen"
            ><SheetContent class="overflow-y-auto bg-white text-slate-900"
                ><SheetHeader
                    ><SheetTitle>{{ sheetTitle }}</SheetTitle
                    ><SheetDescription>{{
                        paymentPreview
                            ? "Local payment review only. Nothing has been charged or confirmed."
                            : "This destination is not connected in this preview."
                    }}</SheetDescription></SheetHeader
                >
                <div
                    v-if="paymentPreview && request && service"
                    class="space-y-5 px-4 pb-6"
                >
                    <p class="font-semibold">{{ service.title }}</p>
                    <p class="text-2xl font-bold">
                        {{ chargeAmount }} {{ chargeCurrency }}
                    </p>
                    <Alert class="border-teal-100 bg-teal-50"
                        ><Info class="size-4" /><AlertTitle
                            >No payment processed</AlertTitle
                        ><AlertDescription
                            >The request remains Time Agreed. No meeting link or
                            confirmed appointment is created by this
                            preview.</AlertDescription
                        ></Alert
                    ><Button as-child variant="outline"
                        ><a :href="trackingHref"
                            >Back to Request Details</a
                        ></Button
                    >
                </div></SheetContent
            ></Sheet
        >
    </div>
</template>
<style scoped>
.consultation-checkout {
    font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
    color-scheme: light;
}
</style>
