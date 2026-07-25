<?php

namespace Modules\Auth\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Inertia\Response;
use Modules\Auth\Http\Requests\Instructor\RegisterRequest;
use Modules\Auth\Services\Instructor\AuthService;

class InstructorRegisterController extends Controller
{
    public function __construct(
        protected AuthService $authService,
    ) {}

    public function index(): Response
    {
        return inertia('instructor/auth/register', [
            'passwordRule' => Password::default()->toPasswordRulesString(),
        ]);
    }

    public function store(RegisterRequest $request)
    {
        $this->authService->register($request);

        return redirect()->route('instructors.verification.notice');
    }
}
