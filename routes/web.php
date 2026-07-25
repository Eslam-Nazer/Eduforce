<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('home');
});

require __DIR__.'/settings.php';
