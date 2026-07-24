<?php

namespace Modules\Auth\Actions;

use Modules\Auth\Models\Student;
use Modules\Auth\Notifications\StudentVerifyEmail;

class ResendStudentVerificationEmail
{
    public function handle(Student $student): void
    {
        if ($student->hasVerifiedEmail()) {
            return;
        }

        $student->notify(new StudentVerifyEmail);
    }
}
