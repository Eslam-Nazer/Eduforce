<?php

namespace Modules\Auth\Services\Student;

use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Modules\Auth\Actions\AttemptLogin;
use Modules\Auth\Actions\ResendStudentVerificationEmail;
use Modules\Auth\Actions\VerifyStudent;
use Modules\Auth\Models\Student;
use Illuminate\Foundation\Auth\User as Authenticatable;

class AuthService
{
    public function __construct(
        protected AttemptLogin $loginActions,
        protected VerifyStudent $verifyEmailActions,
        protected ResendStudentVerificationEmail $resendStudentVerificationEmail,
    ) {}

    public function register(Request $request): Student
    {
        $name = $request->input('name');
        $email = $request->input('email');
        $password = $request->input('password');

        $student = Student::create([
            'name' => $name,
            'email' => $email,
            'password' => $password,
        ]);

        event(new Registered($student));

        Auth::guard('students')->login($student);

        return $student;
    }

    public function verify(Request $request): bool
    {
        $student = $request->user('students');

        return $this->verifyEmailActions->handle($student);
    }

    public function resend(Student $student): void
    {
        $this->resendStudentVerificationEmail->handle($student);
    }

    public function login(Request $request): void
    {
        $email = $request->input('email');
        $password = $request->input('password');
        $remember = $request->boolean('remember');

        if (! $this->loginActions->handle('students', $email, $password, $remember)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }
    }

    public function logout(Request $request): void
    {
        Auth::guard('students')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }
}
