<?php

namespace Modules\Auth\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Inertia\Response;
use Modules\Auth\Http\Requests\Student\RegisterRequest;
use Modules\Auth\Services\Student\AuthService;

class StudentRegisterController extends Controller
{
    public function __construct(
        protected AuthService $authService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $passwordRules = Password::default()->toPasswordRulesString();
        return inertia('auth/student/register', [
            'passwordRules' =>$passwordRules
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RegisterRequest $request): void
    {
        $this->authService->register($request);
    }
}
