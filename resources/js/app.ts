import { createInertiaApp } from "@inertiajs/vue3";
import AuthLayout from "./layouts/AuthLayout.vue";
import AppLayout from "./layouts/AppLayout.vue";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    progress: {
        color: "#4B5563",
    },
    layout: (name) => (name.startsWith("Auth/") ? AuthLayout : AppLayout),
});
