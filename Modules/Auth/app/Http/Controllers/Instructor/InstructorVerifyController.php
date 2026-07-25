<?php

namespace Modules\Auth\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Modules\Auth\Services\Instructor\AuthService;

class InstructorVerifyController extends Controller
{
    public function __construct(
        protected AuthService $authService,
    ) {}

    public function index(): Response
    {
        return inertia('instructor/auth/verify-email');
    }

    public function verify(Request $request)
    {
        $result = $this->authService->verify($request);

        return redirect()->route('instructors.dashboard', ['verified' => $result]);
    }
}
