<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ArtikelController extends Controller
{
    public function index()
    {
        return Inertia::render('Artikel/Artikel', []);
    }

    public function show(string $slug)
    {
        $validatedData = [
            'slug' => (string) $slug,
        ];

        return Inertia::render('Artikel/DetailArtikel', $validatedData);
    }

    public function showKategori(string $slug)
    {
        $validatedData = [
            'slug' => (string) $slug,
        ];

        return Inertia::render('Artikel/DetailKategoriArtikel', $validatedData);
    }
}
