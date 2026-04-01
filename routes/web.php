<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ArtikelController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\GaleriController;
use App\Http\Controllers\OrganisasiController;
use App\Http\Controllers\PodcastController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\TentangController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\SubscriberController;
use App\Http\Controllers\DeveloperController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\GamesController;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

Route::controller(HomeController::class)->group(function () {
    Route::get('/', 'index')->name('home');
    Route::get('/genbi-point', 'genbiPoint')->name('genbi-point');
});

Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');

/*
|--------------------------------------------------------------------------
| EVENT
|--------------------------------------------------------------------------
*/
Route::prefix('event')->name('event.')->controller(EventController::class)->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/{slug}', 'show')->name('detail');
});

/*
|--------------------------------------------------------------------------
| PROFIL & ORGANISASI
|--------------------------------------------------------------------------
*/
Route::get('/tentang', [TentangController::class, 'index'])->name('tentang');

Route::prefix('organisasi')->name('organisasi.')->controller(OrganisasiController::class)->group(function () {
    Route::get('/', 'index')->name('index');

    Route::get('/sejarah-kepengurusan', 'sejarahKepengurusan')->name('sejarah');
    Route::get('/sejarah-kepengurusan/{periode}', 'perKepengurusan')->name('sejarah.periode');

    Route::get('/struktur/{periode}/{bidang}', 'detailBidang')->name('struktur.detail');
});

/*
|--------------------------------------------------------------------------
| MEDIA
|--------------------------------------------------------------------------
*/
Route::prefix('artikel')->name('artikel.')->controller(ArtikelController::class)->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/kategori/{slug}', 'showKategori')->name('kategori');
    Route::get('/{slug}', 'show')->name('detail');
});

Route::prefix('podcast')->name('podcast.')->controller(PodcastController::class)->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/{slug}', 'show')->name('detail');
});

Route::prefix('galeri')->name('galeri.')->controller(GaleriController::class)->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/{slug}', 'show')->name('detail');
});

Route::prefix('newsletter')->name('newsletter.')->controller(NewsletterController::class)->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/{slug}', 'show')->name('detail');
});

/*
|--------------------------------------------------------------------------
| LAINNYA
|--------------------------------------------------------------------------
*/
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::get('/sejarah-developer', [DeveloperController::class, 'index'])->name('developer');

/*
|--------------------------------------------------------------------------
| KUIS
|--------------------------------------------------------------------------
*/
Route::prefix('kuis')->name('kuis.')->controller(QuizController::class)->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/mulai/{uuid}', 'start')->name('start');
});

/*
|--------------------------------------------------------------------------
| SUBSCRIBE
|--------------------------------------------------------------------------
*/
Route::post('/subscribe', [SubscriberController::class, 'store'])->name('subscribe.store');

/*
|--------------------------------------------------------------------------
| AUTH
|--------------------------------------------------------------------------
*/
Route::controller(AuthController::class)->group(function () {
    Route::get('/login', 'index')->name('login');
    Route::get('/auth-success', 'authSuccess')->name('auth.success');
});

/*
|--------------------------------------------------------------------------
| DASHBOARD
|--------------------------------------------------------------------------
*/
Route::prefix('dashboard')->name('dashboard.')->controller(DashboardController::class)->group(function () {

    Route::get('/', 'dashboard')->name('index');

    // ARTIKEL
    Route::prefix('artikel')->name('artikel.')->group(function () {
        Route::get('/', 'artikel')->name('index');
        Route::get('/buat', 'createArtikel')->name('create');
        Route::get('/edit/{slug}', 'editArtikel')->name('edit');
        Route::get('/komentar', 'komentar')->name('komentar');
    });

    // SETTINGS
    Route::get('/settings', 'accountSettings')->name('settings');
});

/*
|--------------------------------------------------------------------------
| GAMES
|--------------------------------------------------------------------------
*/
Route::prefix('games')->controller(GamesController::class)->group(function () {

    // GAME MAKRO
    Route::prefix('game-makro')->group(function () {

        Route::get('/respon-kebijakan-makro', 'ResponKebijakanMakro')->name('games.makro.respon');
        Route::get('/world-crisis-simulator', 'WorldCrisisSimulator')->name('games.makro.world');
        Route::get('/macro-tycoon', 'MacroTycoon')->name('games.makro.tycoon');
        Route::get('/country-simulator', 'CountrySimulator')->name('games.makro.country');
        Route::get('/sawitisasi-simulator', 'SawitisasiSimulator')->name('games.makro.sawit');
        Route::get('/is-lm-simulator', 'IsLmSimulator')->name('games.makro.islm');

    });

    /*
    |--------------------------------------------------------------------------
    | GAME METOPEN
    |--------------------------------------------------------------------------
    */
    Route::prefix('game-metopen')->name('metopen.')->group(function () {
        Route::get('/metopen-game', 'MetopenGame')->name('game');
        Route::get('/methodology-suggestion', 'MethodologySuggestion')->name('methodology');
        Route::get('/moderasi-mediasi', 'ModerasiMediasi')->name('moderasi');
    });

    /*
    |--------------------------------------------------------------------------
    | GAME STATISTIK
    |--------------------------------------------------------------------------
    */
    Route::prefix('game-statistik')->name('statistik.')->group(function () {
        Route::get('/z-score-reader', 'ZScoreReader')->name('zscore');
        Route::get('/t-table-reader', 'TTableReader')->name('ttable');
        Route::get('/sample-kalkulator', 'SampleKalkulator')->name('sample');
    });

});
