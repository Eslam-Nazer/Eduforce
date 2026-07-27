<?php

namespace Modules\Auth\Services\Instructor;

use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Modules\Auth\Actions\AttemptLogin;
use Modules\Auth\Actions\VerifyInstructor;
use Modules\Auth\Models\Instructor;

class AuthService
{
    public function __construct(
        protected VerifyInstructor $verifyInstructorEmailAction,
        protected AttemptLogin $attemptLogin,
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

    public function login(Request $request): void
    {
        $email = $request->input('email');
        $password = $request->input('password');

        if (! $this->attemptLogin->handle('instructors', $email, $password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }
    }

    public function verify(Request $request): bool
    {
        $instructor = $request->user('instructors');

        return $this->verifyInstructorEmailAction->handle($instructor);
    }

    public function logout(Request $request): void
    {
        Auth::guard('instructors')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }
}
