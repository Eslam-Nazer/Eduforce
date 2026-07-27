import { InstructorMenuContent } from '@/components/instructor/instructor-menu-content';
import { NavUserProvider } from '@/contexts/nav-user-context';
import AppLayout from '@/layouts/app-layout';
import instructors from '@/routes/instructors';
import type { BreadcrumbItem, NavItem } from '@/types';

export default function InstructorAppLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    const mainNavItems: NavItem[] = [];

    return (
        <NavUserProvider menuContent={InstructorMenuContent}>
            <AppLayout
                mainNavItems={mainNavItems}
                dashboardRoute={instructors.dashboard.url()}
                breadcrumbs={breadcrumbs}
            >
                {children}
            </AppLayout>
        </NavUserProvider>
    );
}
