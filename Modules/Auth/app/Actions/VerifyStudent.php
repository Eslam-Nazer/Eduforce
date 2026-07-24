<?php

namespace Modules\Auth\Actions;

use Illuminate\Auth\Events\Verified;

class VerifyStudent
{
    public function handle($student): bool
    {
        if ($student->hasVerifiedEmail()) {
            return false; // already verified
        }

        if ($student->markEmailAsVerified()) {
            event(new Verified($student));
        }

        return true;
    }
}
