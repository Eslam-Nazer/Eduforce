import { Form, Head, router } from '@inertiajs/react';
import instructorLogoutController from '@/actions/Modules/Auth/Http/Controllers/Instructor/InstructorLogoutController';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';


export default function VerifyEmail({ status }: { status?: string }) {

    const resent = () => {
        router.post(
            ''
        );
    }

    return (
        <>
            <Head title="Email verification" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}

            <Form  className="space-y-6 text-center">
                {({ processing }) => (
                    <>
                        <Button onClick={resent} disabled={processing} variant="secondary">
                            {processing && <Spinner />}
                            Resend verification email
                        </Button>

                        <TextLink
                            href={instructorLogoutController()}
                            className="mx-auto block text-sm"
                        >
                            Log out
                        </TextLink>
                    </>
                )}
            </Form>
        </>
    );
}

VerifyEmail.layout = {
    title: 'Instructor Email verification',
    description:
        'Please verify your email address by clicking on the link we just emailed to you.',
};
