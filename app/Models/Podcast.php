<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Podcast extends Model
{
    use HasFactory;

    protected $table = 'podcasts';
    protected $fillable = [
        'title',
        'slug',
        'thumbnail',
        'videoId',
        'youtubeUrl',
        'date',
        'description',
    ];
}
