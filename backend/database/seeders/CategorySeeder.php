<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Strona firmowa', 'icon' => 'fa-solid fa-building', 'color' => '#3B82F6'],
            ['name' => 'E-commerce', 'icon' => 'fa-solid fa-shopping-cart', 'color' => '#10B981'],
            ['name' => 'Aplikacja web', 'icon' => 'fa-solid fa-laptop-code', 'color' => '#8B5CF6'],
            ['name' => 'WordPress', 'icon' => 'fa-brands fa-wordpress', 'color' => '#F97316'],
            ['name' => 'Landing page', 'icon' => 'fa-solid fa-rocket', 'color' => '#EF4444'],
            ['name' => 'Redesign', 'icon' => 'fa-solid fa-paint-brush', 'color' => '#14B8A6'],
            ['name' => 'UI/UX Design', 'icon' => 'fa-solid fa-palette', 'color' => '#A855F7'],
            ['name' => 'SEO', 'icon' => 'fa-solid fa-search', 'color' => '#F59E0B'],
        ];

        foreach ($categories as $index => $category) {
            Category::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'icon' => $category['icon'],
                'color' => $category['color'],
                'is_active' => true,
                'order' => $index,
            ]);
        }
    }
}

