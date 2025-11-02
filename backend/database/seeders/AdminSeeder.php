<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        User::create([
            'name' => 'Administrator',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'is_approved' => true,
            'email_verified_at' => now(),
        ]);

        // Test users
        User::create([
            'name' => 'Anna Kowalska',
            'email' => 'anna@example.com',
            'password' => Hash::make('password'),
            'role' => 'user',
            'is_approved' => true,
            'phone' => '+48 123 456 789',
            'company' => 'Kancelaria Prawna',
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Jan Nowak',
            'email' => 'jan@example.com',
            'password' => Hash::make('password'),
            'role' => 'user',
            'is_approved' => false, // Czeka na zatwierdzenie
            'email_verified_at' => now(),
        ]);
    }
}

