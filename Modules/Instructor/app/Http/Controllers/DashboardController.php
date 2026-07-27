<?php

namespace Modules\Instructor\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return inertia('instructor/dashboard');
    }
}
