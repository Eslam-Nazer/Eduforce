<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Home')->name('home');
Route::inertia('/checkout', 'Checkout/Index')->name('checkout');
Route::inertia('/checkout/success', 'Checkout/Success')->name('checkout.success');
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
