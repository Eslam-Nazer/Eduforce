import { createInertiaApp } from '@inertiajs/vue3';
import AppLayout from './layouts/AppLayout.vue';
import { ZiggyVue } from 'ziggy-js';
import { createApp, createSSRApp, h } from 'vue';
import AppToaster from '@/components/AppToaster.vue';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    progress: {
        color: '#4B5563',
    },
    layout: (name) => (name.startsWith('Auth/') ? [] : AppLayout),
    setup({ el, App, props, plugin }) {
        const factory =
            !el || el.hasAttribute('data-server-rendered')
                ? createSSRApp
                : createApp;
        const app = factory({
            render: () => [h(App, props), h(AppToaster)],
        });
        app.use(plugin);
        const ziggy = props.initialPage.props.ziggy as any;
        app.use(ZiggyVue, {
            ...ziggy,
            location: new URL(ziggy.location),
        });
        if (el) app.mount(el);
        return app;
    },
});
