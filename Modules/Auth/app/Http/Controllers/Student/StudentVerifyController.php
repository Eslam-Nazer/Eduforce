<?php

namespace Modules\Auth\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Modules\Auth\Services\Student\AuthService;

class StudentVerifyController extends Controller
{
    public function __construct(
        protected AuthService $authService
    ) {}

    public function index(Request $request): Response
    {
        return inertia('students/auth/verify-email', [
            'status' => $request->session()->get('status'),
        ]);
    }

    public function verify(EmailVerificationRequest $request): RedirectResponse
    {
        $result = $this->authService->verify($request);

        return redirect()->route('students.dashboard', ['verified' => $result]);
    }

    public function resend(Request $request): RedirectResponse
    {
        $student = $request->user('students');

        $this->authService->resend($student);

        return redirect()->back()->with(['success' => 'Email resent successfully.']);
    }
}
