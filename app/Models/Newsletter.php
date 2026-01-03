<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Newsletter extends Model
{
    use HasFactory;

    protected $fillable = [
        'author_id',
        'title',
        'slug',
        'thumbnail',
        'content',
        'status',
        'published_at',
    ];

    //relasi: Newsletter milik 1 author
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
