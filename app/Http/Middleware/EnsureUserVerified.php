<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserVerified
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, $redirectTo): Response
    {
        $user = $request->user();
        dd(route($redirectTo . '.verification.notice'), $user, $user->hasVerifiedEmail(), $user instanceof MustVerifyEmail);
        return $next($request);
    }
}
