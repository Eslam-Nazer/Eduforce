<?php

namespace Modules\Auth\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Modules\Auth\Services\Student\AuthService;

class StudentLogoutController extends Controller
{
    public function __construct(
        protected AuthService $authService
    ) {}

    public function __invoke(Request $request): RedirectResponse
    {
        $this->authService->logout($request);
        return redirect()->route('students.login');
    }
}
