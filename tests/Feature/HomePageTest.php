<?php

test('Load the home page', function () {
    $this->get(route('home'))->assertOk();
});
