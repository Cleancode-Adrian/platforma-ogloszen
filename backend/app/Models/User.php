<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'is_approved',
        'phone',
        'company',
        'bio',
        'avatar',
        'average_rating',
        'ratings_count',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_approved' => 'boolean',
        ];
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function announcements(): HasMany
    {
        return $this->hasMany(Announcement::class);
    }

    public function savedAnnouncements()
    {
        return $this->belongsToMany(Announcement::class, 'saved_announcements')
            ->withTimestamps();
    }

    public function proposals()
    {
        return $this->hasMany(Proposal::class);
    }

    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }

    public function ratingsGiven()
    {
        return $this->hasMany(Rating::class, 'rater_id');
    }

    public function ratingsReceived()
    {
        return $this->hasMany(Rating::class, 'rated_id');
    }

    public function portfolioItems()
    {
        return $this->hasMany(PortfolioItem::class)->ordered();
    }
}
