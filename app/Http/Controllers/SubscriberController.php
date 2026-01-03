<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    public function store(Request $request)
    {
        // validasi input
        $request->validate([
            // kasih tipe uniqe biar ngga ada email yang sama
            'email' => 'required|email|unique:subscribers,email',
        ],[
            // pesan error jika ada email yang sama
            'email.unique' => 'Email ini sudah terdaftar sebagai subscriber.',
            'email.required' => 'Email wajib di isi.',
            'email.email' => 'Email tidak valid',
        ]);

        //simpan ke database
        Subscriber::create([
            'email' => $request->email,
            'is_active' => true, // default
        ]);

        // kembalikan pesan sukses
        return redirect()->back()->with('success','Terimakasih telah berlangganan');
    }
}
