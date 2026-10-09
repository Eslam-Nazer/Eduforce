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
