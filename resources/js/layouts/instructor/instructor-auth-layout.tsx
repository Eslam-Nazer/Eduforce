import AuthLayout from '@/layouts/auth-layout';

export default function InstructorAuthLayout({
    title = '',
    description = '',
    children,
}: {
    title?: string;
    description?: string;
    children: React.ReactNode;
}) {
    return (
        <AuthLayout title={title} description={description}>
            {children}
        </AuthLayout>
    );
}
