import { createInertiaApp, usePage } from "@inertiajs/vue3";
import AuthLayout from "./layouts/AuthLayout.vue";
import AppLayout from "./layouts/AppLayout.vue";
import { ZiggyVue } from "ziggy-js";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    progress: {
        color: "#4B5563",
    },
    layout: (name) =>
        name.startsWith("Auth/") && usePage().props.auth.user
            ? AuthLayout
            : AppLayout,
    withApp(app, { page }) {
        const ziggy = page.props.ziggy as any;
        app.use(ZiggyVue, {
            ...ziggy,
            location: new URL(ziggy.location),
        });
    },
});
