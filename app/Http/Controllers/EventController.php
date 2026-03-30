<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        return Inertia::render('Event/Event', []);
    }


    public function show(string $slug)
    {
        return Inertia::render('Event/DetailEvent', [
            'slug' => (string) $slug,
        ]);
    }
}
