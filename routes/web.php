<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ArtikelController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\GaleriController;
use App\Http\Controllers\OrganisasiController;
use App\Http\Controllers\PodcastController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\TentangController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\SubscriberController;
use Illuminate\Support\Facades\Route;

// Public Routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');

Route::get('/event', [EventController::class, 'index'])->name('event');
Route::get('/event/{slug}', [EventController::class, 'show'])->name('detailEvent');

Route::get('/tentang', [TentangController::class, 'index'])->name('tentang');
Route::get('/organisasi', [OrganisasiController::class, 'index'])->name('organisasi');

Route::get('/sejarah-kepengurusan', [OrganisasiController::class, 'sejarahKepengurusan'])->name('sejarah-kepengurusan');
Route::get('/sejarah-kepengurusan/{periode}', [OrganisasiController::class, 'perKepengurusan'])->name('perperiode-sejarah-kepengurusan');
Route::get('/organisasi/struktur/{periode}/{bidang}', [OrganisasiController::class, 'detailBidang'])->name('detailBidang');

Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::get('/genbi-point', [HomeController::class, 'genbiPoint'])->name('genbi-point');

Route::get('/artikel', [ArtikelController::class, 'index'])->name('artikel');
Route::get('/artikel/{slug}', [ArtikelController::class, 'show'])->name('detail-artikel');
Route::get('/artikel/kategori/{slug}', [ArtikelController::class, 'showKategori'])->name('detail-artikel');

Route::get('/podcast', [PodcastController::class, 'index'])->name('podcast');
Route::get('/podcast/{slug}', [PodcastController::class, 'show'])->name('detail-podcast');

Route::get('/galeri', [GaleriController::class, 'index'])->name('galeri');
Route::get('/galeri/{slug}', [GaleriController::class, 'show'])->name('detail-galeri');

Route::get('/newsletter', [NewsletterController::class, 'index'])->name('newsletter');
Route::get('/newsletter/{slug}', [NewsletterController::class, 'show'])->name('detail-newsletter');

Route::post('/subscribe', [SubscriberController::class, 'store'])->name('subscribe.store');

