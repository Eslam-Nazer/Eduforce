<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\VerificationController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/register', [RegisterController::class, 'index'])->name('register');
Route::post('/register', [RegisterController::class, 'store'])->name('register.store');
Route::get('/login', [LoginController::class, 'index'])->name('login');
Route::post('/login', [LoginController::class, 'store'])->name('login.store');
Route::get('/verify-email', [VerificationController::class, 'index'])->name('verification.notice');
Route::get('/verify/{id}/{hash}', [VerificationController::class, 'verify'])->name('verify')->middleware('auth', 'signed');
Route::middleware('auth')->group(function () {
    Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');
    Route::post('/email/verification-notification', [VerificationController::class, 'store'])->name('verification.send');
});
// ----------------------
Route::inertia('/forgot-password', 'Auth/ForgotPassword')->name('password.request');
Route::inertia('/reset-password', 'Auth/ResetPassword')->name('password.reset');
Route::inertia('/courses/show', 'Courses/Show')->name('courses.show');
Route::inertia('/instructors/ahmed-mansour', 'Instructors/Show')->name('instructors.show');
Route::inertia('/consultations/architecture-review', 'Consultations/Show', ['serviceId' => 'architecture-review'])->name('consultations.architecture');
Route::inertia('/consultations/career-advisory', 'Consultations/Show', ['serviceId' => 'career-advisory'])->name('consultations.career');
Route::get('/consultations/{serviceId}', fn (string $serviceId) => inertia('Consultations/Show', ['serviceId' => $serviceId]))->where('serviceId', 'service-[a-z0-9-]+')->name('consultations.local.show');

Route::middleware('auth')->group(function () {
    Route::inertia('/settings', 'Settings/Index')->name('settings');
    Route::inertia('/my-courses', 'Learning/MyCourses')->name('learning.courses');
    Route::inertia('/my-courses/full-stack', 'Learning/Player')->name('learning.player');
    Route::inertia('/my-courses/full-stack/exam', 'Learning/Exam')->name('learning.exam');
    Route::inertia('/my-courses/full-stack/exam/results', 'Learning/Results')->name('learning.results');
    Route::inertia('/my-courses/full-stack/certificate', 'Learning/Certificate')->name('learning.certificate');
    Route::inertia('/checkout', 'Checkout/Index')->name('checkout');
    Route::inertia('/checkout/success', 'Checkout/Success')->name('checkout.success');
    Route::inertia('/checkout/failed', 'Checkout/Failed')->name('checkout.failed');
    Route::inertia('/checkout/cancelled', 'Checkout/Cancelled')->name('checkout.cancelled');
    Route::get('/courses/course/checkout', fn () => redirect()->route('checkout'));
    Route::get('/courses/course/checkout/success', fn () => redirect()->route('checkout.success'));
    Route::get('/courses/course/checkout/failed', fn () => redirect()->route('checkout.failed'));
    Route::get('/courses/course/checkout/cancelled', fn () => redirect()->route('checkout.cancelled'));
    Route::inertia('/consultations/architecture-review/request', 'Consultations/Request', ['serviceId' => 'architecture-review'])->name('consultations.architecture.request');
    Route::inertia('/consultations/career-advisory/request', 'Consultations/Request', ['serviceId' => 'career-advisory'])->name('consultations.career.request');
    Route::get('/consultations/{serviceId}/request', fn (string $serviceId) => inertia('Consultations/Request', ['serviceId' => $serviceId]))->where('serviceId', 'service-[a-z0-9-]+')->name('consultations.local.request');
    Route::inertia('/consultations/requests', 'Consultations/Tracking')->name('consultations.requests');
    Route::inertia('/consultations/checkout', 'Consultations/Checkout')->name('consultations.checkout');
    Route::inertia('/messages', 'Messages/Index')->name('messages.index');
    Route::inertia('/purchase-history', 'Purchases/Index')->name('purchases.index');
    Route::inertia('/refunds/request', 'Refunds/Create')->name('refunds.create');
    Route::inertia('/instructor/apply', 'Instructor/Application')->name('instructor.apply');
    Route::inertia('/instructor', 'Instructor/Dashboard')->name('instructor.dashboard');
    Route::inertia('/instructor/courses', 'Instructor/Courses/Index')->name('instructor.courses.index');
    Route::inertia('/instructor/consultations/services', 'Instructor/Consultations/Services')->name('instructor.consultations.services');
    Route::inertia('/instructor/consultations/requests', 'Instructor/Consultations/Requests')->name('instructor.consultations.requests');
    Route::inertia('/instructor/earnings', 'Instructor/Earnings')->name('instructor.earnings');
    Route::get('/instructor/courses/{courseId}/{step}', function (string $courseId, string $step) {
        $pages = ['basics' => 'Basics', 'curriculum' => 'Curriculum', 'exam' => 'Exam', 'publish' => 'Publish'];
        abort_unless(isset($pages[$step]), 404);

        return inertia('Instructor/Courses/'.$pages[$step], ['courseId' => $courseId]);
    })->name('instructor.courses.builder');
});
