<?php

namespace App\Http\Controllers;


use Inertia\Inertia;

class QuizController extends Controller
{
    public function index()
    {
        return Inertia::render('Kuis/Kuis', []);
    }
}
