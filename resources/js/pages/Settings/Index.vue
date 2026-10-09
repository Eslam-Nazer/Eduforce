<script setup lang="ts">
import { Head, router } from "@inertiajs/vue3";
import { computed, ref } from "vue";
import { UserRound, Globe, LockKeyhole, GraduationCap, Info } from "@lucide/vue";
import MarketplaceHeader from "@/components/MarketplaceHeader.vue";
import MarketplaceFooter from "@/components/MarketplaceFooter.vue";
import AccountProfileForm from "@/components/account/AccountProfile.vue";
import AccountPreferencesForm from "@/components/account/AccountPreferences.vue";
import AccountPassword from "@/components/account/AccountPassword.vue";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import type { AccountProfile, AccountPreferences, AccountSection } from "@/types";

const profile = ref<AccountProfile>({
    name: "Kareem Tarek",
    email: "kareem.tarek@example.com",
    bio: "Learning software engineering and practical skills across MENA.",
});
const preferences = ref<AccountPreferences>({ country: "EG", currency: "EGP" });
const section = ref<AccountSection>("profile");
const savedMessage = ref("");
const previewTitle = ref("");
const previewOpen = ref(false);
const strength = computed(
    () =>
        (profile.value.name.trim() ? 40 : 0) +
        (profile.value.email ? 40 : 0) +
        (profile.value.bio.trim() ? 20 : 0),
);
function preview(title: string) {
    previewTitle.value = title;
    previewOpen.value = true;
}
function saved(message: string) {
    savedMessage.value = message;
}
</script>

<template>
    <Head title="Account Settings" />
    <div class="account-settings min-h-screen bg-[#f8fafc] text-slate-900">
        <MarketplaceHeader
            v-model:currency="preferences.currency"
            :account-name="profile.name"
            @browse="router.visit('/')"
            @preview="preview"
        />
        <div class="bg-slate-100">
            <Breadcrumb class="mx-auto max-w-7xl px-5 py-4 sm:px-8"
                ><BreadcrumbList
                    ><BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem
                    ><BreadcrumbSeparator /><BreadcrumbItem
                        ><BreadcrumbPage>Account Settings</BreadcrumbPage></BreadcrumbItem
                    ></BreadcrumbList
                ></Breadcrumb
            >
        </div>
        <main class="mx-auto max-w-7xl space-y-6 px-5 py-8 sm:px-8 sm:py-10">
            <div
                class="flex flex-wrap items-center justify-between gap-5 rounded-xl bg-teal-50 p-5 sm:p-8"
            >
                <div>
                    <Badge variant="secondary" class="bg-white text-teal-800"
                        >ACCOUNT PREVIEW</Badge
                    >
                    <h1 class="mt-3 text-3xl font-bold tracking-tight">Account Settings</h1>
                    <p class="mt-3 text-sm leading-6 text-slate-500">
                        Manage your personal profile, regional preferences, and password.
                    </p>
                </div>
                <div class="w-48 rounded-lg bg-white p-4">
                    <p class="flex justify-between gap-3 text-xs">
                        <span>Profile completeness</span
                        ><span class="font-semibold text-teal-800">{{ strength }}%</span>
                    </p>
                    <Progress
                        :model-value="strength"
                        aria-label="Profile completeness"
                        class="mt-3 h-2 bg-slate-200 [&_[data-slot=progress-indicator]]:bg-teal-700"
                    />
                </div>
            </div>
            <Alert v-if="savedMessage" role="status" class="border-teal-100 bg-teal-50"
                ><Info class="size-4" /><AlertTitle>Local preview updated</AlertTitle
                ><AlertDescription>{{ savedMessage }}</AlertDescription></Alert
            >
            <Tabs
                v-model="section"
                orientation="vertical"
                class="grid items-start gap-6 lg:grid-cols-[240px_1fr]"
                @update:model-value="savedMessage = ''"
            >
                <aside class="space-y-4 lg:sticky lg:top-6">
                    <Card class="border-slate-200 bg-white p-2 shadow-sm"
                        ><TabsList
                            aria-label="Settings sections"
                            class="grid h-auto w-full gap-1 bg-transparent p-0 sm:grid-cols-2 lg:grid-cols-1"
                        >
                            <TabsTrigger
                                value="profile"
                                class="h-11 justify-start gap-2 px-3 text-slate-700 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-800 data-[state=active]:shadow-none"
                                ><UserRound class="size-4" aria-hidden="true" />Profile
                                Details</TabsTrigger
                            >
                            <TabsTrigger
                                value="preferences"
                                class="h-11 justify-start gap-2 px-3 text-slate-700 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-800 data-[state=active]:shadow-none"
                                ><Globe class="size-4" aria-hidden="true" />Regional &amp;
                                Billing</TabsTrigger
                            >
                            <TabsTrigger
                                value="password"
                                class="h-11 justify-start gap-2 px-3 text-slate-700 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-800 data-[state=active]:shadow-none"
                                ><LockKeyhole class="size-4" aria-hidden="true" />Security &amp;
                                Password</TabsTrigger
                            >
                            <TabsTrigger
                                value="instructor"
                                class="h-11 justify-start gap-2 px-3 text-slate-700 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-800 data-[state=active]:shadow-none"
                                ><GraduationCap class="size-4" aria-hidden="true" />Teach on
                                Eduforce</TabsTrigger
                            >
                        </TabsList></Card
                    ><Card class="border-0 bg-slate-100 shadow-none"
                        ><CardContent class="p-4"
                            ><p class="text-xs text-slate-500">ACTIVE MARKET REGION</p>
                            <p class="mt-2 text-sm font-semibold">
                                {{ preferences.country === "EG" ? "Egypt" : "Saudi Arabia" }}
                            </p>
                            <p class="mt-1 text-xs text-teal-800">
                                {{ preferences.currency }} · local preview
                            </p></CardContent
                        ></Card
                    >
                </aside>
                <div class="min-w-0">
                    <TabsContent value="profile" force-mount v-show="section === 'profile'"
                        ><AccountProfileForm v-model="profile" @saved="saved"
                    /></TabsContent>
                    <TabsContent value="preferences" force-mount v-show="section === 'preferences'"
                        ><AccountPreferencesForm v-model="preferences" @saved="saved"
                    /></TabsContent>
                    <TabsContent value="password" force-mount v-show="section === 'password'"
                        ><AccountPassword @saved="saved"
                    /></TabsContent>
                    <TabsContent value="instructor" force-mount v-show="section === 'instructor'"
                        ><Card
                            id="instructor"
                            class="scroll-mt-6 border-slate-200 bg-white shadow-sm"
                            ><CardHeader
                                ><CardTitle class="flex items-center gap-2 text-lg"
                                    ><GraduationCap
                                        class="size-5 text-teal-700"
                                        aria-hidden="true"
                                    />Instructor Account Status</CardTitle
                                ><CardDescription
                                    >The same account can support learning and
                                    teaching.</CardDescription
                                ></CardHeader
                            ><CardContent class="space-y-4"
                                ><Badge variant="secondary" class="bg-amber-50 text-amber-800"
                                    >Instructor role: not activated</Badge
                                >
                                <p class="text-sm leading-6 text-slate-500">
                                    Apply to share your skills. Instructor applications are reviewed
                                    by the platform Admin.
                                </p>
                                <Button
                                    class="h-11 bg-teal-700 text-white hover:bg-teal-800"
                                    @click="preview('Instructor Application')"
                                    >Apply to Become an Instructor</Button
                                ></CardContent
                            ></Card
                        >
                    </TabsContent>
                </div></Tabs
            >
        </main>
        <MarketplaceFooter @preview="preview" />
        <Sheet v-model:open="previewOpen"
            ><SheetContent class="bg-white text-slate-900"
                ><SheetHeader
                    ><SheetTitle>{{ previewTitle }}</SheetTitle
                    ><SheetDescription
                        >This page is coming soon. You are viewing sample account settings; no
                        account changes or application were sent.</SheetDescription
                    ></SheetHeader
                ></SheetContent
            ></Sheet
        >
    </div>
</template>

<style scoped>
.account-settings {
    font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
    color-scheme: light;
}
</style>
