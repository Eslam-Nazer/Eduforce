<?php

use Illuminate\Support\Facades\Route;
use Modules\Auth\Http\Controllers\Instructor\InstructorLoginController;
use Modules\Auth\Http\Controllers\Instructor\InstructorLogoutController;
use Modules\Auth\Http\Controllers\Instructor\InstructorRegisterController;
use Modules\Auth\Http\Controllers\Instructor\InstructorVerifyController;
use Modules\Auth\Http\Controllers\Student\StudentLoginController;
use Modules\Auth\Http\Controllers\Student\StudentLogoutController;
use Modules\Auth\Http\Controllers\Student\StudentRegisterController;
use Modules\Auth\Http\Controllers\Student\StudentVerifyController;

Route::middleware(['guest:students'])->prefix('students')->name('students.')->group(function () {
    Route::get('register', [StudentRegisterController::class, 'index'])->name('register');
    Route::post('register', [StudentRegisterController::class, 'store'])->name('register.store');

    Route::get('login', [StudentLoginController::class, 'index'])->name('login');
    Route::post('login', [StudentLoginController::class, 'store'])->name('login.store');
});

Route::middleware(['auth:students'])->prefix('students')->name('students.')->group(function () {

    Route::get('/verify-email', [StudentVerifyController::class, 'index'])->name('verification.notice');

    Route::get('/verify-email/{id}/{hash}', [StudentVerifyController::class, 'verify'])
        ->name('verification.verify')
        ->middleware(['signed', 'throttle:6,1']);

    Route::post('verify-email/resend', [StudentVerifyController::class, 'resend'])
        ->name('verification.resend')
        ->middleware(['throttle:6,1']);

    Route::post('logout', StudentLogoutController::class)->name('logout');
});

Route::middleware(['guest:instructors'])->prefix('instructors')->name('instructors.')->group(function () {
    Route::get('register', [InstructorRegisterController::class, 'index'])->name('register');
    Route::post('register', [InstructorRegisterController::class, 'store'])->name('register.store');

    Route::get('login', [InstructorLoginController::class, 'index'])->name('login');
});

Route::middleware(['auth:instructors'])->prefix('instructors')->name('instructors.')->group(function () {
    Route::get('/verify-email', [InstructorVerifyController::class, 'index'])->name('verification.notice');

    Route::get('/verify-email/{id}/{hash}', [InstructorVerifyController::class, 'verify'])
        ->name('verification.verify')
        ->middleware(['signed', 'throttle:6,1']);

    Route::post('logout', InstructorLogoutController::class)->name('logout');
});
