<script setup lang="ts">
import { ref } from 'vue';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

defineProps<{ lessonId: string; title: string; source: string }>();
const emit = defineEmits<{
    ended: [lessonId: string];
    playback: [playing: boolean];
}>();
const failed = ref(false);
</script>

<template>
    <div class="space-y-3">
        <div class="overflow-hidden rounded-xl bg-slate-950">
            <video
                :key="lessonId"
                :src="source"
                controls
                playsinline
                preload="metadata"
                :aria-label="title"
                class="aspect-video w-full"
                @playing="
                    failed = false;
                    emit('playback', true);
                "
                @pause="emit('playback', false)"
                @waiting="emit('playback', false)"
                @seeking="emit('playback', false)"
                @ended="
                    emit('playback', false);
                    emit('ended', lessonId);
                "
                @error="
                    failed = true;
                    emit('playback', false);
                "
            >
                Your browser does not support video playback.
            </video>
        </div>
        <p class="text-xs leading-5 text-slate-500">
            Playback preview uses the same short demonstration clip for each
            lesson. Listed lesson durations describe the sample curriculum.
        </p>
        <Alert v-if="failed" variant="destructive"
            ><AlertTitle>Video unavailable</AlertTitle
            ><AlertDescription
                >The demonstration clip could not load. You can still explore
                the curriculum and use Mark as Completed &amp;
                Next.</AlertDescription
            ></Alert
        >
    </div>
</template>
