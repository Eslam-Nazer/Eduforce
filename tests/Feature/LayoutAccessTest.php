<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

dataset('workspace pages', [
    ['/settings', 'Settings/Index'],
    ['/my-courses', 'Learning/MyCourses'],
    ['/my-courses/full-stack', 'Learning/Player'],
    ['/my-courses/full-stack/exam', 'Learning/Exam'],
    ['/my-courses/full-stack/exam/results', 'Learning/Results'],
    ['/my-courses/full-stack/certificate', 'Learning/Certificate'],
    ['/messages', 'Messages/Index'],
    ['/purchase-history', 'Purchases/Index'],
    ['/refunds/request', 'Refunds/Create'],
    ['/checkout', 'Checkout/Index'],
    ['/checkout/success', 'Checkout/Success'],
    ['/checkout/failed', 'Checkout/Failed'],
    ['/checkout/cancelled', 'Checkout/Cancelled'],
    ['/consultations/architecture-review/request', 'Consultations/Request'],
    ['/consultations/career-advisory/request', 'Consultations/Request'],
    ['/consultations/service-example/request', 'Consultations/Request'],
    ['/consultations/requests', 'Consultations/Tracking'],
    ['/consultations/checkout', 'Consultations/Checkout'],
    ['/instructor/apply', 'Instructor/Application'],
    ['/instructor', 'Instructor/Dashboard'],
    ['/instructor/courses', 'Instructor/Courses/Index'],
    ['/instructor/courses/example/basics', 'Instructor/Courses/Basics'],
    ['/instructor/courses/example/curriculum', 'Instructor/Courses/Curriculum'],
    ['/instructor/courses/example/exam', 'Instructor/Courses/Exam'],
    ['/instructor/courses/example/publish', 'Instructor/Courses/Publish'],
    ['/instructor/consultations/services', 'Instructor/Consultations/Services'],
    ['/instructor/consultations/requests', 'Instructor/Consultations/Requests'],
    ['/instructor/earnings', 'Instructor/Earnings'],
]);

test('workspace pages require login and expose the actual account after login', function (string $url, string $component) {
    $this->get($url)->assertRedirect(route('login'))->assertSessionHas('url.intended', url($url));

    $user = User::factory()->create(['name' => 'Actual account']);
    $this->actingAs($user)->get($url)->assertInertia(fn (Assert $page) => $page
        ->component($component)
        ->where('auth.user.id', $user->id)
        ->where('auth.user.name', 'Actual account'));
})->with('workspace pages');

test('public pages stay accessible to guests and signed-in users', function (string $url) {
    $this->get($url)->assertOk()->assertInertia(fn (Assert $page) => $page->where('auth.user', null));
    $user = User::factory()->create();
    $this->actingAs($user)->get($url)->assertOk()->assertInertia(fn (Assert $page) => $page->where('auth.user.id', $user->id));
})->with(['/', '/courses/show', '/instructors/ahmed-mansour', '/consultations/architecture-review', '/consultations/career-advisory', '/consultations/service-example']);

test('logout invalidates the session and removes access to personal pages', function () {
    $user = User::factory()->create();
    $this->actingAs($user)->withSession(['personal-data' => 'private']);
    $this->post(route('logout'))->assertRedirect(route('home'))->assertSessionMissing('personal-data');
    $this->assertGuest();
    $this->get('/my-courses')->assertRedirect(route('login'));
});
