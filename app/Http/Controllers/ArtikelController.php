<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ArtikelController extends Controller
{
    public function index()
    {
        return Inertia::render('Artikel', []);
    }

    public function show(string $slug)
    {
        $validatedData = [
            'slug' => (string) $slug,
        ];

        return Inertia::render('DetailArtikel', $validatedData);
    }

    public function showKategori(string $slug)
    {
        $validatedData = [
            'slug' => (string) $slug,
        ];

        return Inertia::render('DetailKategoriArtikel', $validatedData);
    }
}
