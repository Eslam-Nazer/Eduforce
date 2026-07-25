<?php

namespace Modules\Auth\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Auth\Services\Instructor\AuthService;

class InstructorLogoutController extends Controller
{
    public function __construct(
        protected AuthService $authService,
    ) {}

   public function __invoke(Request $request)
   {
        $this->authService->logout($request);

        return redirect()->route('instructors.login');
   }
}
