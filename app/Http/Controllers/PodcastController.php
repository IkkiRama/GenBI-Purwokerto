<?php

namespace App\Http\Controllers;

use \App\Models\Podcast;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PodcastController extends Controller
{
    public function index()
    {
        $podcasts = Podcast::latest()->get();

        return Inertia::render('Podcast',['podcast' => $podcasts]);
    }

    public function show($slug)
    {
        // cari podcast berdasarkan slug
        $podcast = Podcast::where('slug', $slug)->firstOrFail();
        
        return Inertia::render('PodcastDetail', ['podcast' => $podcast]);
    }
}
