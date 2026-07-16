<?php

namespace Modules\Auth\Services\Student;

use Illuminate\Http\Request;
use Modules\Auth\Actions\AttemptLogin;
use Modules\Auth\Models\Student;

class AuthService
{
    public function __construct(
        protected AttemptLogin $loginActions,
    ) {}

    public function register(Request $request): Student
    {
        $name = $request->input('name');
        $email = $request->input('email');
        $password = $request->input('password');

        return Student::create([
            'name' => $name,
            'email' => $email,
            'password' => $password,
        ]);
    }

    public function login(Request $request): ?string
    {
        $email = $request->input('email');
        $password = $request->input('password');
        $remember = $request->boolean('remember');

        return $this->loginActions->execute($email, $password, $remember);
    }
}
