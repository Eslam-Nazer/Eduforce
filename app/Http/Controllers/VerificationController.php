<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Inertia\Inertia;
use Inertia\Response;

class VerificationController extends Controller
{
    public function index(Request $request): Response|RedirectResponse
    {
        $user = $request->user();

        if ($user?->hasVerifiedEmail()) {
            return redirect()->route('home');
        }

        return inertia('Auth/VerifyEmail', [
            'email' => $user->email ?? session('verification_email'),
            'canResend' => $user !== null,
            'retryAfter' => $user ? RateLimiter::availableIn('verification-resend:'.$user->id) : 0,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();
        if ($user->hasVerifiedEmail()) {
            return redirect()->route('home');
        }

        $key = 'verification-resend:'.$user->id;
        if (RateLimiter::tooManyAttempts($key, 1)) {
            Inertia::flash('info', 'Please wait before requesting another verification email.');

            return redirect()->route('verification.notice');
        }

        RateLimiter::hit($key, 60);
        try {
            $user->sendEmailVerificationNotification();
        } catch (\Throwable $exception) {
            report($exception);
            Inertia::flash('error', 'We could not send the verification email. Please try again shortly.');

            return redirect()->route('verification.notice');
        }

        Inertia::flash('success', 'A new verification email has been sent.');

        return redirect()->route('verification.notice');
    }

    public function verify(EmailVerificationRequest $request): RedirectResponse
    {
        if ($request->user()?->hasVerifiedEmail()) {
            Inertia::flash('success', 'Your email address has been already verified!');

            return redirect()->route('home');
        }
        $request->fulfill();

        Inertia::flash('success', 'Your email address has been verified.');

        return redirect()->route('home');
    }
}
