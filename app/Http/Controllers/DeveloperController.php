<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DeveloperController extends Controller
{
    public function index()
    {
        return Inertia::render('Tentang Kami/Developer', []);
    }
}
