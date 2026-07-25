import { Head } from '@inertiajs/react';
import InstructorRegisterForm from '@/components/instructor/auth/instructor-register-form';

export default function Register({ passwordRules }: { passwordRules: string }) {
    return (
        <>
            <Head title="Instructor Register" />
            <InstructorRegisterForm passwordRules={passwordRules} />
        </>
    );
}
