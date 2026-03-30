<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{
    public function index()
    {
        return Inertia::render('Auth/Login', []);
    }

    public function authSuccess()
    {
        return Inertia::render('Auth/AuthSuccess', []);
    }

}
