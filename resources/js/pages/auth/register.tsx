import { Form, Head } from '@inertiajs/react';
import StudentRegisterForm from '@/components/student/auth/student-register-form';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    return (
        <>
            <Head title="Register" />
            <Tabs defaultValue="student">
                <TabsList>
                    <TabsTrigger value="student">Student</TabsTrigger>
                    <TabsTrigger value="instructor">Instructor</TabsTrigger>
                </TabsList>
                <TabsContent value="student">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sign up as student</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <StudentRegisterForm
                                passwordRules={passwordRules}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="instructor">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sign up as instructor</CardTitle>
                        </CardHeader>
                        <CardContent>

                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    );
}

Register.layout = {
    title: 'Create an account',
    description: 'Enter your details below to create your account'
};
