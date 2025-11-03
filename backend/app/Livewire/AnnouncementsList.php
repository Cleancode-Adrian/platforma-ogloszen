<?php

namespace App\Livewire;

use App\Models\Announcement;
use App\Models\Category;
use App\Models\Tag;
use Livewire\Component;
use Livewire\WithPagination;
use Livewire\Attributes\Url;

class AnnouncementsList extends Component
{
    use WithPagination;

    #[Url(as: 'q')]
    public $search = '';

    #[Url]
    public $category = '';

    #[Url]
    public $minBudget = '';

    #[Url]
    public $maxBudget = '';

    public $selectedTags = [];

    public function updatingSearch()
    {
        $this->resetPage();
    }

    public function updatingCategory()
    {
        $this->resetPage();
    }

    public function clearFilters()
    {
        $this->reset(['search', 'category', 'minBudget', 'maxBudget', 'selectedTags']);
        $this->resetPage();
    }

    public function render()
    {
        $query = Announcement::with(['user', 'category', 'tags'])
            ->published()
            ->latest();

        // Search filter
        if ($this->search) {
            $query->where(function ($q) {
                $q->where('title', 'like', "%{$this->search}%")
                  ->orWhere('description', 'like', "%{$this->search}%");
            });
        }

        // Category filter
        if ($this->category) {
            $query->whereHas('category', function ($q) {
                $q->where('slug', $this->category);
            });
        }

        // Budget filters
        if ($this->minBudget) {
            $query->where('budget_min', '>=', $this->minBudget);
        }
        if ($this->maxBudget) {
            $query->where('budget_max', '<=', $this->maxBudget);
        }

        // Tags filter
        if (!empty($this->selectedTags)) {
            $query->whereHas('tags', function ($q) {
                $q->whereIn('tags.id', $this->selectedTags);
            });
        }

        $announcements = $query->paginate(12);
        $categories = Category::where('is_active', true)->orderBy('order')->get();
        $tags = Tag::orderBy('name')->get();

        return view('livewire.announcements-list', [
            'announcements' => $announcements,
            'categories' => $categories,
            'tags' => $tags,
        ])->layout('layouts.app', [
            'title' => 'Przeglądaj ogłoszenia - WebFreelance',
            'description' => 'Znajdź idealne zlecenie dla siebie. Setki projektów czeka na freelancerów takich jak Ty.',
        ]);
    }
}

