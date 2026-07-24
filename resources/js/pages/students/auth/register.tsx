import { Head } from '@inertiajs/react';
import StudentRegisterForm from '@/components/student/auth/student-register-form';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    return (
        <>
            <Head title="Student Register" />
            <StudentRegisterForm
                passwordRules={passwordRules}
            />
        </>
    );
}

Register.layout = {
    title: 'Create an account',
    description: 'Enter your details below to create your account'
};
