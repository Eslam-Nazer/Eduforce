<?php

namespace Modules\Auth\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use Inertia\Response;
use Laravel\Fortify\Features;
use Modules\Auth\Http\Requests\Instructor\LoginRequest;
use Modules\Auth\Services\Instructor\AuthService;

class InstructorLoginController extends Controller
{
    public function __construct(
        protected AuthService $authService
    ) {}

    public function index(): Response
    {
        return inertia('instructor/auth/login', [
            'canResetPassword' => Features::enabled(Features::resetPasswords()),
            'status' => request()->session()->get('status'),
        ]);
    }

    public function store(LoginRequest $request)
    {
        $this->authService->login($request);

        redirect()->route('instructors.dashboard');
    }
}
