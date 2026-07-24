import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem, NavItem } from '@/types';
import { RouteDefinition } from '@/wayfinder';

export default function AppLayout({
    breadcrumbs = [],
    children,
    mainNavItems = [],
    dashboardRoute,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
    mainNavItems: NavItem[];
    dashboardRoute: string;
}) {
    return (
        <AppLayoutTemplate
            dashboardRoute={dashboardRoute}
            mainNavItems={mainNavItems}
            breadcrumbs={breadcrumbs}
        >
            {children}
        </AppLayoutTemplate>
    );
}
