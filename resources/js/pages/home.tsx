import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
export default function Home() {
    const student = () => router.get('/students/register');
    const instructor = () => router.get('/instructors/register');

    return (
        <>
            <Button onClick={student}>Student</Button>
            <Button onClick={instructor}>Instructor</Button>
        </>
    );
}

Home.layout = {
    title: "Home Page",
    description: "Choose where are you going!"
};
