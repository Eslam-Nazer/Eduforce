<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import type { InstructorCourse } from "@/types/instructor-workspace";
const course = defineModel<InstructorCourse>("course", { required: true });
const emit = defineEmits<{ save: []; continue: [] }>();
function cover(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file && file.type.startsWith("image/"))
        course.value.coverName = file.name;
}
</script>
<template>
    <form class="space-y-6" @submit.prevent="emit('continue')">
        <div class="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div class="space-y-6">
                <Card class="bg-white"
                    ><CardContent class="space-y-5 p-5 sm:p-6"
                        ><h2 class="text-lg font-semibold">
                            1. Course identity
                        </h2>
                        <div class="space-y-2">
                            <Label for="course-title">Course title *</Label
                            ><Input
                                id="course-title"
                                v-model="course.title"
                                required
                                maxlength="150"
                            />
                        </div>
                        <div class="space-y-2">
                            <Label for="course-summary">Short summary *</Label
                            ><Input
                                id="course-summary"
                                v-model="course.summary"
                                required
                                maxlength="240"
                            />
                        </div>
                        <div class="grid gap-4 sm:grid-cols-2">
                            <div class="space-y-2">
                                <Label for="course-category">Category</Label
                                ><Select v-model="course.category"
                                    ><SelectTrigger
                                        id="course-category"
                                        class="w-full"
                                        ><SelectValue /></SelectTrigger
                                    ><SelectContent
                                        ><SelectItem
                                            v-for="category in [
                                                'Development',
                                                'Design',
                                                'Business',
                                                'Marketing',
                                            ]"
                                            :key="category"
                                            :value="category"
                                            >{{ category }}</SelectItem
                                        ></SelectContent
                                    ></Select
                                >
                            </div>
                            <div>
                                <p class="text-sm font-medium">
                                    Interface language
                                </p>
                                <p class="mt-3 text-sm text-slate-500">
                                    English · initial interface
                                </p>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <Label for="course-description"
                                >Course description *</Label
                            ><Textarea
                                id="course-description"
                                v-model="course.description"
                                required
                                maxlength="10000"
                                rows="7"
                                placeholder="Describe what the course covers."
                            /></div></CardContent></Card
                ><Card class="bg-white"
                    ><CardContent class="space-y-5 p-5 sm:p-6"
                        ><h2 class="text-lg font-semibold">
                            2. Learning outcomes & prerequisites
                        </h2>
                        <div
                            v-for="(_, index) in course.outcomes"
                            :key="index"
                            class="space-y-2"
                        >
                            <Label :for="`outcome-${index}`"
                                >Learning outcome {{ index + 1 }}</Label
                            >
                            <div class="flex gap-2">
                                <Input
                                    :id="`outcome-${index}`"
                                    v-model="course.outcomes[index]"
                                    maxlength="300"
                                /><Button
                                    type="button"
                                    variant="outline"
                                    :disabled="course.outcomes.length === 1"
                                    :aria-label="`Remove learning outcome ${index + 1}`"
                                    @click="course.outcomes.splice(index, 1)"
                                    >Remove</Button
                                >
                            </div>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            @click="course.outcomes.push('')"
                            >Add learning outcome</Button
                        >
                        <div class="space-y-2">
                            <Label for="prerequisites">Prerequisites</Label
                            ><Textarea
                                id="prerequisites"
                                v-model="course.prerequisites"
                                maxlength="2000"
                                rows="3"
                            /></div></CardContent
                ></Card>
            </div>
            <aside class="space-y-6">
                <Card class="bg-white"
                    ><CardContent class="space-y-4 p-5"
                        ><h2 class="font-semibold">3. Cover image</h2>
                        <div
                            class="flex aspect-video items-center justify-center rounded-lg bg-slate-100 p-4 text-center text-xs text-slate-500"
                        >
                            {{ course.coverName || "No cover selected" }}
                        </div>
                        <Label for="course-cover"
                            >Choose an image reference</Label
                        ><Input
                            id="course-cover"
                            type="file"
                            accept="image/*"
                            @change="cover"
                        />
                        <p class="text-xs leading-5 text-slate-500">
                            Only the filename is saved in this preview. No image
                            is uploaded.
                        </p></CardContent
                    ></Card
                ><Card class="bg-white"
                    ><CardContent class="space-y-4 p-5"
                        ><h2 class="font-semibold">4. Pricing</h2>
                        <div class="space-y-2">
                            <Label for="base-currency">Base currency</Label
                            ><Select v-model="course.currency"
                                ><SelectTrigger
                                    id="base-currency"
                                    class="w-full"
                                    ><SelectValue /></SelectTrigger
                                ><SelectContent
                                    ><SelectItem value="EGP">EGP</SelectItem
                                    ><SelectItem value="SAR"
                                        >SAR</SelectItem
                                    ></SelectContent
                                ></Select
                            >
                        </div>
                        <div class="space-y-2">
                            <Label for="base-price"
                                >One-time course price *</Label
                            ><Input
                                id="base-price"
                                :model-value="course.price"
                                type="number"
                                min="0.01"
                                step="0.01"
                                required
                                @update:model-value="
                                    course.price = Number($event)
                                "
                            />
                        </div>
                        <p
                            class="rounded-lg bg-teal-50 p-3 text-xs leading-5 text-teal-900"
                        >
                            The instructor sets the base price. Cross-currency
                            conversion will use the configured exchange-rate
                            service when integrated.
                        </p></CardContent
                    ></Card
                >
            </aside>
        </div>
        <div class="flex flex-wrap justify-end gap-3">
            <Button type="button" variant="outline" @click="emit('save')"
                >Save local draft</Button
            ><Button
                type="submit"
                class="bg-teal-700 text-white hover:bg-teal-800"
                >Save & continue to curriculum</Button
            >
        </div>
    </form>
</template>
