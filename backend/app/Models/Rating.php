<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Rating extends Model
{
    use HasFactory;

    protected $fillable = [
        'announcement_id',
        'rater_id',
        'rated_id',
        'rating',
        'comment',
    ];

    protected $casts = [
        'rating' => 'integer',
    ];

    public function announcement(): BelongsTo
    {
        return $this->belongsTo(Announcement::class);
    }

    public function rater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'rater_id');
    }

    public function rated(): BelongsTo
    {
        return $this->belongsTo(User::class, 'rated_id');
    }

    protected static function booted()
    {
        static::created(function (Rating $rating) {
            $rating->updateUserAverage();
        });

        static::updated(function (Rating $rating) {
            $rating->updateUserAverage();
        });

        static::deleted(function (Rating $rating) {
            $rating->updateUserAverage();
        });
    }

    protected function updateUserAverage()
    {
        $user = User::find($this->rated_id);
        if ($user) {
            $average = Rating::where('rated_id', $this->rated_id)->avg('rating');
            $count = Rating::where('rated_id', $this->rated_id)->count();

            $user->update([
                'average_rating' => round($average, 2),
                'ratings_count' => $count,
            ]);
        }
    }
}

