<?php

namespace Modules\Auth\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Validation\Rules\Password;
use Inertia\Response;
use Modules\Auth\Http\Requests\Student\RegisterRequest;
use Modules\Auth\Services\Student\AuthService;

class StudentRegisterController extends Controller
{
    public function __construct(
        protected AuthService $authService
    ) {}

    public function index(): Response
    {
        $passwordRules = Password::default()->toPasswordRulesString();

        return inertia('students/auth/register', [
            'passwordRules' => $passwordRules,
        ]);
    }

    public function store(RegisterRequest $request)
    {
        $this->authService->register($request);

        return redirect()->route('students.verification.notice');
    }
}
