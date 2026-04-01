<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class GamesController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | GAME MAKRO
    |--------------------------------------------------------------------------
    */

    public function ResponKebijakanMakro()
    {
        return Inertia::render('Games/Game Makro/Respon Kebijakan Ekonomi Makro/ResponKebijakanEkonomiMakro');
        // return Inertia::render('Games/GameMakro/ResponKebijakanMakro/ResponKebijakanMakro');
    }

    public function WorldCrisisSimulator()
    {
        return Inertia::render('Games/Game Makro/World Crisis Simulator/WorldCrisisSimulator');
    }

    public function MacroTycoon()
    {
        return Inertia::render('Games/Makro/MacroTycoon');
    }

    public function CountrySimulator()
    {
        return Inertia::render('Games/Makro/CountrySimulator');
    }

    public function SawitisasiSimulator()
    {
        return Inertia::render('Games/Makro/SawitisasiSimulator');
    }

    public function IsLmSimulator()
    {
        return Inertia::render('Games/Makro/IsLmSimulator');
    }

    /*
    |--------------------------------------------------------------------------
    | GAME METOPEN
    |--------------------------------------------------------------------------
    */

    public function MetopenGame()
    {
        return Inertia::render('Games/Metopen/MetopenGame');
    }

    public function MethodologySuggestion()
    {
        return Inertia::render('Games/Metopen/MethodologySuggestion');
    }

    public function ModerasiMediasi()
    {
        return Inertia::render('Games/Metopen/ModerasiMediasi');
    }

    /*
    |--------------------------------------------------------------------------
    | GAME STATISTIK
    |--------------------------------------------------------------------------
    */

    public function ZScoreReader()
    {
        return Inertia::render('Games/Statistik/ZScoreReader');
    }

    public function TTableReader()
    {
        return Inertia::render('Games/Statistik/TTableReader');
    }

    public function SampleKalkulator()
    {
        return Inertia::render('Games/Statistik/SampleKalkulator');
    }
}
