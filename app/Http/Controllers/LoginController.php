<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Service\LoginService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class LoginController extends Controller
{
    public function __construct(
        protected LoginService $loginService
    ) {}

    public function index(Request $request): Response|RedirectResponse
    {
        if ($request->user()) {
            return redirect()->route($request->user()->hasVerifiedEmail() ? 'home' : 'verification.notice');
        }

        return inertia('Auth/Login');
    }

    public function store(LoginRequest $request): RedirectResponse
    {
        $this->loginService->login($request);

        return redirect()->intended(route(auth()->user()->hasVerifiedEmail() ? 'home' : 'verification.notice'));
    }

    public function destroy(): RedirectResponse
    {
        $this->loginService->logout();

        return redirect()->route('home');
    }
}
