<?php

use Illuminate\Support\Facades\Route;
use Modules\Auth\Http\Controllers\Student\StudentRegisterController;


//Route::middleware(['guest'])->name('auth.')->group(callback: function () {
//    Route::resource('register', RegisterController::class)->only(['index', 'store'])->names('register');
//    Route::resource('login', LoginController::class)->only(['index', 'store'])->names('login');
//});

Route::middleware(['guest:students'])->prefix('students')->name('students.')->group(function () {
    Route::resource('register', StudentRegisterController::class);
});
