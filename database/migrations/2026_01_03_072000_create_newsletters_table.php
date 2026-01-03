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
        Schema::create('newsletters', function (Blueprint $table) {
            $table->id();
            // relasi table users (fk -> users.id), 'constrained' otomatis agar user valid
            $table->foreignId('author_id')->constrained('users')->onDelete('cascade');
            $table->string('title'); // judul
            $table->string('slug')->unique(); // slug
            $table->string('thumbnail')->nullable(); // thumbnail
            $table->longText('content'); // konten
            // status publikasi (enum: draft, published, archived)
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->timestamp('published_at')->nullable(); // tanggal publikasi
            $table->timestamps(); // created at dan updated at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('newsletters');
    }
};
