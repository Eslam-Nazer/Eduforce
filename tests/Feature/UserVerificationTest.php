<?php

use App\Mail\VerifiedUserMail;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Inertia\Testing\AssertableInertia as Assert;

test('verification redirects home with a one-time success message', function () {
    $user = User::factory()->unverified()->create();
    $url = URL::temporarySignedRoute('verify', now()->addMinutes(10), [
        'id' => $user->id,
        'hash' => sha1($user->email),
    ]);

    $this->actingAs($user)->get($url)->assertRedirect(route('home'));

    expect($user->fresh()->hasVerifiedEmail())->toBeTrue();

    $this->get(route('home'))->assertInertia(fn (Assert $page) => $page
        ->component('Home')
        ->hasFlash('success', 'Your email address has been verified.'));

    $this->get(route('home'))->assertInertia(fn (Assert $page) => $page
        ->missingFlash('success'));
});

test('an invalid verification signature cannot verify or flash success', function () {
    $user = User::factory()->unverified()->create();

    $this->actingAs($user)
        ->get(route('verify', ['id' => $user->id, 'hash' => sha1($user->email)]))
        ->assertRedirect(route('verification.notice'));

    expect($user->fresh()->hasVerifiedEmail())->toBeFalse();

    $this->get(route('verification.notice'))->assertInertia(fn (Assert $page) => $page
        ->hasFlash('error', 'This verification link is invalid or has expired. Please request a new email.')
        ->missingFlash('success'));
});

test('a guest opening verification gets a sign-in toast and intended URL', function () {
    $url = URL::temporarySignedRoute('verify', now()->addMinutes(10), [
        'id' => 1,
        'hash' => sha1('student@example.com'),
    ]);

    $this->get($url)->assertRedirect(route('login'))
        ->assertSessionHas('url.intended', $url);

    $this->get(route('login'))->assertInertia(fn (Assert $page) => $page
        ->hasFlash('info', 'Please sign in to verify your email address.'));
});

test('an expired verification link shows an error without verifying', function () {
    $user = User::factory()->unverified()->create();
    $url = URL::temporarySignedRoute('verify', now()->subMinute(), [
        'id' => $user->id,
        'hash' => sha1($user->email),
    ]);

    $this->actingAs($user)->get($url)->assertRedirect(route('verification.notice'));
    expect($user->fresh()->hasVerifiedEmail())->toBeFalse();

    $this->get(route('verification.notice'))->assertInertia(fn (Assert $page) => $page
        ->hasFlash('error', 'This verification link is invalid or has expired. Please request a new email.'));
});

test('resend sends only to the signed-in user and enforces a persistent cooldown', function () {
    $this->freezeTime();
    Mail::fake();
    $user = User::factory()->unverified()->create();

    $this->actingAs($user)->post(route('verification.send'), ['email' => 'other@example.com'])
        ->assertRedirect(route('verification.notice'));
    Mail::assertSent(VerifiedUserMail::class, fn (VerifiedUserMail $mail) => $mail->hasTo($user->email));
    $this->get(route('verification.notice'))->assertInertia(fn (Assert $page) => $page
        ->where('email', $user->email)->where('canResend', true)->where('retryAfter', 60)
        ->hasFlash('success', 'A new verification email has been sent.'));

    $this->post(route('verification.send'))->assertRedirect(route('verification.notice'));
    Mail::assertSentCount(1);
    $this->get(route('verification.notice'))->assertInertia(fn (Assert $page) => $page
        ->where('retryAfter', 60));

    $this->travel(61)->seconds();
    $this->post(route('verification.send'))->assertRedirect(route('verification.notice'));
    Mail::assertSentCount(2);
});

test('guests cannot resend and verified users leave the notice without sending', function () {
    Mail::fake();
    $this->post(route('verification.send'))->assertRedirect(route('login'));
    $this->get(route('verification.notice'))->assertInertia(fn (Assert $page) => $page
        ->where('canResend', false));

    $user = User::factory()->create();
    $this->actingAs($user)->get(route('verification.notice'))->assertRedirect(route('home'));
    $this->post(route('verification.send'))->assertRedirect(route('home'));
    Mail::assertNothingSent();
});

test('a delivery failure shows an error without a success message', function () {
    Mail::shouldReceive('to')->once()->andThrow(new RuntimeException('Test mail transport failure'));
    $user = User::factory()->unverified()->create();
    $this->actingAs($user)->post(route('verification.send'))->assertRedirect(route('verification.notice'));
    $this->get(route('verification.notice'))->assertInertia(fn (Assert $page) => $page
        ->hasFlash('error', 'We could not send the verification email. Please try again shortly.')
        ->missingFlash('success'));
});

test('a user cannot verify another account using its signed link', function () {
    $user = User::factory()->unverified()->create();
    $other = User::factory()->unverified()->create();
    $url = URL::temporarySignedRoute('verify', now()->addMinutes(10), [
        'id' => $other->id, 'hash' => sha1($other->email),
    ]);
    $this->actingAs($user)->get($url)->assertForbidden();
    expect($user->fresh()->hasVerifiedEmail())->toBeFalse()
        ->and($other->fresh()->hasVerifiedEmail())->toBeFalse();
});
