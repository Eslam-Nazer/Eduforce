<?php

namespace Modules\Auth\Actions;

use Illuminate\Auth\Events\Verified;
use Modules\Auth\Models\Instructor;

class VerifyInstructor
{
    public function handle(Instructor $instructor): bool
    {
        if ($instructor->hasVerifiedEmail()) {
            return false;
        }

        if ($instructor->markEmailAsVerified()) {
            event(new Verified($instructor));
        }

        return true;
    }
}
