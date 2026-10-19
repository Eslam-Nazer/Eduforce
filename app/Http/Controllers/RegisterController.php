<?php

namespace App\Http\Controllers;

use App\Http\Requests\Register\StoreRegisterRequest;
use App\Service\RegisterService;
use Inertia\Response;

class RegisterController extends Controller
{
    public function __construct(
        protected RegisterService $registerService,
    ) {}

    public function index(): Response
    {
        return inertia('Auth/Register');
    }

    public function store(StoreRegisterRequest $request)
    {
        $this->registerService->store($request);

        $request->session()->put('verification_email', $request->validated('email'));

        return redirect()->route('verification.notice');
    }
}
