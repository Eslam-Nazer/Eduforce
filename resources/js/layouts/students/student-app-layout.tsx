import { StudentMenuContent } from '@/components/student/student-menu-content';
import { NavUserProvider } from '@/contexts/nav-user-context';
import AppLayout from '@/layouts/app-layout';
import students from '@/routes/students';
import type { BreadcrumbItem, NavItem } from '@/types';

export default function StudentAppLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    const mainNavItems: NavItem[] = [];

    return (
        <NavUserProvider menuContent={StudentMenuContent}>
            <AppLayout
                mainNavItems={mainNavItems}
                dashboardRoute={students.dashboard.url()}
                breadcrumbs={breadcrumbs}
            >
                {children}
            </AppLayout>
        </NavUserProvider>
    );
}
