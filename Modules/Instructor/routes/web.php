<?php

use Illuminate\Support\Facades\Route;
use Modules\Instructor\Http\Controllers\DashboardController;

Route::middleware(['auth:instructors', 'verified:instructors.verification.notice'])
    ->name('instructors.')
    ->prefix('instructors')
    ->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    });
