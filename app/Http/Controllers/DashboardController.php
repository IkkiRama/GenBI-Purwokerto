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

    public function createArtikel()
    {
        return Inertia::render('Dasboard/CreateArtikel', []);
    }

    public function accountSettings()
    {
        return Inertia::render('Dasboard/AccountSettings', []);
    }
}
