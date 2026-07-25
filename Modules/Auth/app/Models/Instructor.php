<?php

namespace Modules\Auth\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Modules\Auth\Notifications\InstructorVerifyEmail;

#[Fillable(['name', 'email', 'title', 'description', 'email_verified_at', 'password', 'remember_token'])]
#[Hidden(['password'])]
class Instructor extends User
{
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function sendEmailVerificationNotification(): void
    {
        $this->notify(new InstructorVerifyEmail());
    }
}
