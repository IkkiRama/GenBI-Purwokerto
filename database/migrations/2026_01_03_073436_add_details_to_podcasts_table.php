<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('podcasts', function (Blueprint $table) {
            // menambahkan kolom slug (unique) setelah title
            $table->string('slug')->unique()->nullable()->after('title');
            //menambahkan kolom thumbnail setelah slug
            $table->string('thumbnail')->nullable()->after('slug');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('podcasts', function (Blueprint $table) {
            //
        });
    }
};
