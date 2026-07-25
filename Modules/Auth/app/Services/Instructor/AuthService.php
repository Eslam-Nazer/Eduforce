<?php

namespace Modules\Auth\Services\Instructor;

use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\Auth\Actions\VerifyInstructor;
use Modules\Auth\Models\Instructor;

class AuthService
{
    public function __construct(
        protected VerifyInstructor $verifyInstructorEmailAction,
    ) {}

    public function register(Request $request): Instructor
    {
        $name = $request->input('name');
        $title = $request->input('title');
        $email = $request->input('email');
        $password = $request->input('password');

        $instructor = Instructor::create([
            'name' => $name,
            'email' => $email,
            'title' => $title,
            'password' => $password,
        ]);

        event(new Registered($instructor));

        Auth::guard('instructors')->login($instructor);

        return $instructor;
    }

    public function verify(Request $request): bool
    {
        $instructor = $request->user('instructors');

        return $this->verifyInstructorEmailAction->handle($instructor);
    }

    public function logout(Request $request): void
    {
        Auth::guard('instructor')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }
}
