<?php

namespace Modules\Auth\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;

class InstructorLoginController extends Controller
{
    public function index(): Response
    {
        return inertia('');
    }
}
