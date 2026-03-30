<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class SitemapController extends Controller
{
    public function index()
    {
        // URL API untuk sitemap
        $sitemapUrl = config('services.api.base_url') . "/api/sitemap.xml";
        // $sitemapUrl = config('services.api.base_url') . "/api/sitemap.xml";

        try {
            // Inisialisasi Guzzle Client
            $client = new Client();

            // Kirim request GET ke URL
            $response = $client->get($sitemapUrl);

            // Cek status response
            if ($response->getStatusCode() !== 200) {
                return response("Failed to fetch sitemap data", $response->getStatusCode());
            }

            // Ambil isi response
            $xmlContent = $response->getBody()->getContents();

            // Return response dengan header XML
            return response($xmlContent, 200)
                ->header('Content-Type', 'application/xml');

        } catch (\Exception $e) {
            // Log error untuk debugging
            Log::error("Error fetching sitemap: " . $e->getMessage());

            // Return error response
            return response("Error fetching sitemap data", 500);
        }
    }
}
