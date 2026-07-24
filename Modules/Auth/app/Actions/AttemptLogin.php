<?php

namespace Modules\Auth\Actions;

use Illuminate\Support\Facades\Auth;

class AttemptLogin
{
    public function handle(string $guard, string $email, string $password, bool $remember = false): bool
    {
        return Auth::guard($guard)->attempt(['email' => $email, 'password' => $password], $remember);
    }
}
