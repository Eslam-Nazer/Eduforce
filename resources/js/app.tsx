import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
// import AuthLayout from '@/layouts/auth-layout';
// import SettingsLayout from '@/layouts/settings/layout';
import AuthLayout from '@/layouts/auth-layout';
import InstructorAppLayout from '@/layouts/instructor/instructor-app-layout';
import InstructorAuthLayout from '@/layouts/instructor/instructor-auth-layout';
import StudentAppLayout from '@/layouts/students/student-app-layout';
import StudentAuthLayout from '@/layouts/students/student-auth-layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name === 'welcome':
                return null;
            // case name.startsWith('auth/'):
            //     return AuthLayout;
            // case name.startsWith('settings/'):
            //     return [AppLayout, SettingsLayout];
            case name.startsWith('students/auth'):
                return StudentAuthLayout;
            case name.startsWith('students/'):
                return StudentAppLayout;
            case name.startsWith('instructor/auth'):
                return InstructorAuthLayout
            case name.startsWith('instructor/'):
                return InstructorAppLayout
            default:
                return AuthLayout;
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
