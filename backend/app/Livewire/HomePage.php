<?php

namespace App\Livewire;

use App\Models\Announcement;
use App\Models\Category;
use Livewire\Component;
use Illuminate\Support\Facades\Cache;

class HomePage extends Component
{
    public function render()
    {
        // Cache dla performance
        $categories = Cache::remember('home.categories', 3600, function () {
            return Category::withCount('announcements')
                ->where('is_active', true)
                ->orderBy('order')
                ->get();
        });

        $featuredAnnouncements = Cache::remember('home.featured', 600, function () {
            return Announcement::with(['category', 'user', 'tags'])
                ->published()
                ->where('is_urgent', true)
                ->latest()
                ->take(6)
                ->get();
        });

        $stats = Cache::remember('home.stats', 1800, function () {
            return [
                'announcements' => Announcement::published()->count(),
                'freelancers' => \App\Models\User::where('role', 'freelancer')->where('is_approved', true)->count(),
                'categories' => Category::where('is_active', true)->count(),
            ];
        });

        return view('livewire.home-page', [
            'categories' => $categories,
            'featuredAnnouncements' => $featuredAnnouncements,
            'stats' => $stats,
        ])->layout('layouts.app', [
            'title' => 'WebFreelance - Znajdź najlepszego freelancera dla swojego projektu',
            'description' => 'Platforma łącząca klientów z zweryfikowanymi freelancerami. Publikuj zlecenia i otrzymuj oferty od najlepszych specjalistów w branży.',
        ]);
    }
}

