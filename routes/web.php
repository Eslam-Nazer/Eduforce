<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Home')->name('home');
Route::inertia('/checkout', 'Checkout/Index')->name('checkout');
Route::inertia('/checkout/success', 'Checkout/Success')->name('checkout.success');
Route::inertia('/login', 'Auth/Login')->name('login');
Route::inertia('/register', 'Auth/Register')->name('register');
Route::inertia('/forgot-password', 'Auth/ForgotPassword')->name('password.request');
Route::inertia('/reset-password', 'Auth/ResetPassword')->name('password.reset');
Route::inertia('/settings', 'Settings/Index')->name('settings');
Route::inertia('/my-courses', 'Learning/MyCourses')->name('learning.courses');
Route::inertia('/my-courses/full-stack', 'Learning/Player')->name('learning.player');
Route::inertia('/my-courses/full-stack/exam', 'Learning/Exam')->name('learning.exam');
Route::inertia('/my-courses/full-stack/exam/results', 'Learning/Results')->name('learning.results');
Route::inertia('/my-courses/full-stack/certificate', 'Learning/Certificate')->name('learning.certificate');
Route::inertia('/checkout/failed', 'Checkout/Failed')->name('checkout.failed');
Route::inertia('/instructors/ahmed-mansour', 'Instructors/Show')->name('instructors.show');
Route::inertia('/consultations/architecture-review', 'Consultations/Show', ['serviceId' => 'architecture-review'])->name('consultations.architecture');
Route::inertia('/consultations/career-advisory', 'Consultations/Show', ['serviceId' => 'career-advisory'])->name('consultations.career');
Route::inertia('/consultations/architecture-review/request', 'Consultations/Request', ['serviceId' => 'architecture-review'])->name('consultations.architecture.request');
Route::inertia('/consultations/career-advisory/request', 'Consultations/Request', ['serviceId' => 'career-advisory'])->name('consultations.career.request');
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
Route::get('/consultations/{serviceId}/request', fn (string $serviceId) => inertia('Consultations/Request', ['serviceId' => $serviceId]))->where('serviceId', 'service-[a-z0-9-]+')->name('consultations.local.request');
Route::get('/consultations/{serviceId}', fn (string $serviceId) => inertia('Consultations/Show', ['serviceId' => $serviceId]))->where('serviceId', 'service-[a-z0-9-]+')->name('consultations.local.show');
Route::get('/instructor/courses/{courseId}/{step}', function (string $courseId, string $step) {
    $pages = ['basics' => 'Basics', 'curriculum' => 'Curriculum', 'exam' => 'Exam', 'publish' => 'Publish'];
    abort_unless(isset($pages[$step]), 404);

    return inertia('Instructor/Courses/'.$pages[$step], ['courseId' => $courseId]);
})->name('instructor.courses.builder');

// Route::prefix('courses')->group(function () {
//     Route::get('/show', function () {
//         return inertia('Courses/Show');
//     }); // TODO: we need change it to {course} to show it

//     Route::prefix('course/checkout')->group(function () {
//         Route::get('/', function () {
//             return inertia('Checkout/Index');
//         });

//         Route::get('success', function () {
//             return inertia('Checkout/Success');
//         });

//         Route::get('failed', function () {
//             return inertia('Checkout/Failed');
//         });

//         Route::get('cancelled', function () {
//             return inertia('Checkout/Cancelled');
//         });
//     });
// });
