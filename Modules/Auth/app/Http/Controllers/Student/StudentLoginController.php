<?php

namespace Modules\Auth\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Laravel\Fortify\Features;
use Modules\Auth\Http\Requests\LoginRequest;
use Modules\Auth\Services\Student\AuthService;


class StudentLoginController extends Controller
{
    public function __construct(
        protected AuthService $authService
    ) {}

    public function index(Request $request): Response
    {
        return inertia('students/auth/login', [
            'canResetPassword' => Features::enabled(Features::resetPasswords()),
            'status' => $request->session()->get('status'),
        ]);
    }

    public function store(LoginRequest $request): RedirectResponse
    {
        $this->authService->login($request);

        return redirect()->route('students.dashboard');
    }
}
