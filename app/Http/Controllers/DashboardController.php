<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends Controller
{

    public function dashboard()
    {
        return Inertia::render('Dasboard/Dashboard', []);
    }

    public function artikel()
    {
        return Inertia::render('Dasboard/ArtikelDashboard', []);
    }

    public function komentar()
    {
        return Inertia::render('Dasboard/Komentar', []);
    }

    public function createArtikel()
    {
        return Inertia::render('Dasboard/CreateArtikelPage', []);
    }

    public function editArtikel(string $slug)
    {
        return Inertia::render('Dasboard/EditArtikelPage', ["slug" => $slug]);
    }

    public function accountSettings()
    {
        return Inertia::render('Dasboard/AccountSettings', []);
    }
}
