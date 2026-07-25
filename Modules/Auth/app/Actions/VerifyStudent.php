<?php

namespace Modules\Auth\Actions;

use Illuminate\Auth\Events\Verified;
use Modules\Auth\Models\Student;

class VerifyStudent
{
    public function handle(Student $student): bool
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
