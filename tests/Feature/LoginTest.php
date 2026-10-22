<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\URL;

test('a verified user can sign in and the session is regenerated', function () {
    $user = User::factory()->create(['password' => Hash::make('Password123!')]);
    $this->get(route('login'))->assertOk();
    $oldSession = session()->getId();

    $this->post(route('login.store'), [
        'email' => $user->email, 'password' => 'Password123!', 'remember' => true,
    ])->assertRedirect(route('home'));

    $this->assertAuthenticatedAs($user);

    expect(session()->getId())->not->toBe($oldSession);
});

test('an unverified user signs in and continues to the intended verification link', function () {
    $user = User::factory()->unverified()->create(['password' => Hash::make('Password123!')]);
    $url = URL::temporarySignedRoute('verify', now()->addMinutes(10), [
        'id' => $user->id, 'hash' => sha1($user->email),
    ]);

    $this->get($url)->assertRedirect(route('login'));

    $this->post(route('login.store'), [
        'email' => $user->email, 'password' => 'Password123!',
    ])->assertRedirect($url);

    $this->get($url)->assertRedirect(route('home'));
    expect($user->fresh()->hasVerifiedEmail())->toBeTrue();
});

test('an unverified user without an intended URL goes to verification notice', function () {
    $user = User::factory()->unverified()->create(['password' => Hash::make('Password123!')]);
    $this->post(route('login.store'), [
        'email' => $user->email, 'password' => 'Password123!',
    ])->assertRedirect(route('verification.notice'));
    $this->assertAuthenticatedAs($user);
});

test('incorrect credentials are rejected and repeated attempts are limited', function () {
    $user = User::factory()->create(['password' => Hash::make('Password123!')]);

    for ($attempt = 0; $attempt < 5; $attempt++) {
        $this->from(route('login'))->post(route('login.store'), [
            'email' => $user->email, 'password' => 'wrong-password',
        ])->assertSessionHasErrors('email');
    }

    $this->post(route('login.store'), [
        'email' => $user->email, 'password' => 'Password123!',
    ])->assertSessionHasErrors('email');

    $this->assertGuest();

    $this->travel(61)->seconds();

    $this->post(route('login.store'), [
        'email' => $user->email, 'password' => 'Password123!',
    ])->assertRedirect(route('home'));

    $this->assertAuthenticatedAs($user);
});
