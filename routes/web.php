<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Home')->name('home');

Route::prefix('courses')->group(function () {
    Route::get('/show', function () {
        return inertia('Courses/Show');
    }); // TODO: we need change it to {course} to show it
});
