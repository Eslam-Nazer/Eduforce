<?php

use Illuminate\Support\Facades\Route;
use Modules\Student\Http\Controllers\DashboardController;

Route::middleware(['auth:students', 'verified:students.verification.notice'])
    ->prefix('students')
    ->name('students.')
    ->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    });
