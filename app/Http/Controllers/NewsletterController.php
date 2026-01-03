<?php

namespace App\Http\Controllers;

use App\Models\Newsletter;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class NewsletterController extends Controller
{
    public function index()
    {
        // ambil data newsletter dan urutkan dari yang terbaru (with author biar tau penulisnya)
        $newsletters = Newsletter::with('author')
        ->where('status','published')// filtering status, nampilin cuma yang berstatus published
        ->latest()
        ->get();

        return Inertia::render('Newsletter/Index', ['newsletters' => $newsletters]);
    
    }

    public function store(Request $request)
    {
        // validasi data input
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required',
            'thumbnail' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048', //max2mb
            'status' => 'required|in:draft,published,archived',
        ]);

        // handle upload gambar (kalau ada)
        if ($request->hasFile('thumbnail')) {
            // simpan ke folder: storage/app/public/newsletter
            $data['thumbnail'] = $request->file('thumbnail')->store('newsletters','public');
        }

        // tambahan data otomatis
        $data['author_id'] = $request->user()->id; // ambil id user yang sedang login
        $data['slug'] = Str::slug($data['title']); // bikin slug dari judul

        // cek status
        if ($data['status'] === 'published') {
            $data['published_at'] = now();
        }

        // simpan ke database
        Newsletter::create($data);

        return redirect()->back()->with('succes','Newsletter berhasil dibuat');
    }

    public function show($slug)
    {
        $newsletter = Newsletter::with('author')
        ->where('slug', $slug)
        ->where('status','published')
        ->firstOrFail();

        return Inertia::render('Newsletter/Detail', ['newsletter' => $newsletter]);
    }

    public function manage()
    {
        $newsletters = Newsletter::with('author')->latest()->get();
        return response()->json($newsletters);
    }

    public function update(Request $request, $id)
    {
        $newsletter = Newsletter::findOrFail($id);

        // validasi admin ganti status
        $data = $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'nullable',
            'thumbnail' => 'nullable|imag|mimes:jpg,jpeg,png,webp|max:2048',
            'status' => 'required|in:draft,published,archived',
        ]);

        // cek pergantian gambar
        if ($request->hasFile('thumbnail')) {
            //hapus gambar lama
            if ($newsletter->thumbnail) {
                Storage::disk('public')->delete($newsletter->thumbnail);
            }
            // upload gambar baru
            $data['thumbnail'] = $request->file('thumbnail')->store('newsletter','public');
        }

        // update slug kalau ada perubahan judul
        if ($request->filled('title') && $request->title !== $newsletter->title) {
            $data['slug'] = Str::slug($request->title);
        }

        // logic perubahan status, kalau berubah jadi published, dan sebelumnya belum ada tanggalnya -> set tanggal sekarang
        if ($request->status === 'publsihed' && is_null($newsletter->published_at)) {
            $data['publsihed_at'] = now();
        }

        $newsletter->update($data);

        return redirect()->back()->with('success', 'Newsletter berhasil diperbarui');
    }

    public function destroy($id)
    {
        $newsletter = Newsletter::findOrFail($id);

        // hapus gambar
        if ($newsletter->thumbnail) {
            Storage::disk('public')->delete($newsletter->thumbnail);
        }

        $newsletter->delete();

        return redirect()->back()->with('succes','Newsletter berhasil dihapus');
    }
}
