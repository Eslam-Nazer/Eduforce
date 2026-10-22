type WorkspacePage = { title: string; href: string; parent?: string };

export const workspacePages: Record<string, WorkspacePage> = {
    'Settings/Index': { title: 'Account settings', href: '/settings' },
    'Learning/MyCourses': { title: 'My courses', href: '/my-courses' },
    'Learning/Player': {
        title: 'Course lessons',
        href: '/my-courses/full-stack',
        parent: 'Learning/MyCourses',
    },
    'Learning/Exam': {
        title: 'Course exam',
        href: '/my-courses/full-stack/exam',
        parent: 'Learning/Player',
    },
    'Learning/Results': {
        title: 'Exam results',
        href: '/my-courses/full-stack/exam/results',
        parent: 'Learning/Exam',
    },
    'Learning/Certificate': {
        title: 'Certificate',
        href: '/my-courses/full-stack/certificate',
        parent: 'Learning/Player',
    },
    'Messages/Index': { title: 'Messages', href: '/messages' },
    'Purchases/Index': { title: 'Purchase history', href: '/purchase-history' },
    'Refunds/Create': {
        title: 'Request a refund',
        href: '/refunds/request',
        parent: 'Purchases/Index',
    },
    'Consultations/Request': {
        title: 'Request a consultation',
        href: '/consultations/requests',
    },
    'Consultations/Tracking': {
        title: 'My consultations',
        href: '/consultations/requests',
    },
    'Consultations/Checkout': {
        title: 'Consultation checkout',
        href: '/consultations/checkout',
        parent: 'Consultations/Tracking',
    },
    'Checkout/Index': { title: 'Checkout', href: '/checkout' },
    'Checkout/Success': {
        title: 'Payment success',
        href: '/checkout/success',
        parent: 'Checkout/Index',
    },
    'Checkout/Failed': {
        title: 'Payment failed',
        href: '/checkout/failed',
        parent: 'Checkout/Index',
    },
    'Checkout/Cancelled': {
        title: 'Payment cancelled',
        href: '/checkout/cancelled',
        parent: 'Checkout/Index',
    },
    'Instructor/Application': {
        title: 'Instructor application',
        href: '/instructor/apply',
    },
    'Instructor/Dashboard': {
        title: 'Instructor dashboard',
        href: '/instructor',
    },
    'Instructor/Courses/Index': {
        title: 'Courses',
        href: '/instructor/courses',
        parent: 'Instructor/Dashboard',
    },
    'Instructor/Courses/Basics': {
        title: 'Basics and pricing',
        href: '',
        parent: 'Instructor/Courses/Index',
    },
    'Instructor/Courses/Curriculum': {
        title: 'Curriculum',
        href: '',
        parent: 'Instructor/Courses/Index',
    },
    'Instructor/Courses/Exam': {
        title: 'Exam settings',
        href: '',
        parent: 'Instructor/Courses/Index',
    },
    'Instructor/Courses/Publish': {
        title: 'Preview and publish',
        href: '',
        parent: 'Instructor/Courses/Index',
    },
    'Instructor/Consultations/Services': {
        title: 'Consultation services',
        href: '/instructor/consultations/services',
        parent: 'Instructor/Dashboard',
    },
    'Instructor/Consultations/Requests': {
        title: 'Consultation requests',
        href: '/instructor/consultations/requests',
        parent: 'Instructor/Dashboard',
    },
    'Instructor/Earnings': {
        title: 'Earnings',
        href: '/instructor/earnings',
        parent: 'Instructor/Dashboard',
    },
};

export function workspaceBreadcrumbs(component: string) {
    const breadcrumbs: WorkspacePage[] = [];
    let current: WorkspacePage | undefined = workspacePages[component];
    while (current) {
        breadcrumbs.unshift(current);
        current = current.parent ? workspacePages[current.parent] : undefined;
    }
    return breadcrumbs;
}
