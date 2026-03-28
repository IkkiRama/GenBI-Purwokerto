<?php

namespace App\Http\Controllers;

use \App\Models\Podcast;
use Inertia\Inertia;

class PodcastController extends Controller
{
    public function index()
    {
        return Inertia::render('Podcast');
    }

    public function show(string $slug)
    {
        $validatedData = [
            'slug' => (string) $slug,
        ];

        return Inertia::render('DetailPodcast', $validatedData);
    }
}
