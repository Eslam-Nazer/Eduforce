<?php

use App\Mail\VerifiedUserMail;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    Mail::fake();
});

test('guest can view the registration page', function () {
    $this->get(route('register'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('Auth/Register'));
});

test('guest can register and send hin a verification mail', function () {

    $name = 'Ahmed';
    $email = 'ahmed@example.com';
    $password = 'P@ssw0rd!';

    $this->post(route('register.store'), [
        'name' => $name,
        'email' => $email,
        'password' => $password,
        'password_confirmation' => $password,
    ])
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('verification.notice'))
        ->assertSessionHas('verification_email', $email);

    $this->assertDatabaseCount('users', '1');

    $user = User::sole();

    expect($user->name)->toBe($name)
        ->and($user->email)->toBe($email)
        ->and($user->email_verified_at)->toBeNull()
        ->and(Hash::check($password, $user->password))->toBeTrue();

    Mail::assertSent(VerifiedUserMail::class, function (VerifiedUserMail $mail) use ($user) {
        return $mail->hasTo($user->email)
        && $mail->name === $user->name
        && $mail->actionText === 'Verify email'
        && filled($mail->actionUrl);
    });

    Mail::assertSentCount(1);
});

test('registration rejects an existing email without sending mail', function () {
    $user = User::factory()->create([
        'email' => 'ahmed@example.com',
    ]);

    $this->post(route('register.store'), [
        'name' => 'Another User',
        'email' => $user->email,
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ])
        ->assertSessionHasErrors('email');

    $this->assertDatabaseCount('users', 1);

    expect($user->fresh()->name)->toBe($user->name);

    Mail::assertNothingSent();
});

test('registration rejects mismatched password confirmation, requires confirmation, password or short password', function () {
    $this->post(route('register.store'), [
        'name' => 'Ahmed Ali',
        'email' => 'ahmed@example.com',
        'password' => 'password123',
        'password_confirmation' => 'different123',
    ])
        ->assertSessionHasErrors('password');

    $this->post(route('register.store'), [
        'name' => 'Ahmed Ali',
        'email' => 'ahmed@example.com',
        'password' => 'password123',
    ])
        ->assertSessionHasErrors('password');

    $this->post(route('register.store'), [
        'name' => 'Ahmed Ali',
        'email' => 'ahmed@example.com',
        'password' => 'short',
        'password_confirmation' => 'short',
    ])
        ->assertSessionHasErrors('password');

    $this->post('/register', [
        'name' => 'Ahmed Ali',
        'email' => 'ahmed@example.com',
    ])->assertSessionHasErrors('password');

    $this->assertDatabaseCount('users', 0);

    Mail::assertNothingSent();
});

test('registration rejects an invaild email address or requires email address', function () {
    $this->post(route('register.store'), [
        'name' => 'Ahmed Ali',
        'email' => 'not-an-email',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ])
        ->assertSessionHasErrors('email');

    $this->post(route('register.store'), [
        'name' => 'Ahmed Ali',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ])
        ->assertSessionHasErrors('email');

    $this->assertDatabaseCount('users', 0);

    Mail::assertNothingSent();
});

test('registration requires a name', function () {
    $this->post('/register', [
        'email' => 'ahmed@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ])->assertSessionHasErrors('name');

    $this->assertDatabaseCount('users', 0);

    Mail::assertNothingSent();
});

test('registration ignores a supplied email verification date', function () {
    $this->post(route('register.store'), [
        'name' => 'Ahmed Ali',
        'email' => 'ahmed@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
        'email_verified_at' => now()->toDateTimeString(),
    ])
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('verification.notice'));

    expect(User::sole()->email_verified_at)->toBeNull();

    Mail::assertSent(VerifiedUserMail::class);
    Mail::assertSentCount(1);
});
