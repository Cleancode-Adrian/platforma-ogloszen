<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\LoginController;
use Illuminate\Support\Facades\Route;

use App\Livewire\HomePage;
use App\Livewire\AnnouncementsList;
use App\Livewire\ShowAnnouncement;
use App\Livewire\Dashboard;

// Public pages
Route::get('/', HomePage::class)->name('home');
Route::get('/announcements', AnnouncementsList::class)->name('announcements.index');
Route::get('/announcements/{id}', ShowAnnouncement::class)->name('announcements.show');

// Auth routes (Laravel Breeze style)
Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return view('auth.login');
    })->name('login');

    Route::post('/login', [\App\Http\Controllers\Auth\AuthController::class, 'login']);

    Route::get('/register', function () {
        return view('auth.register');
    })->name('register');

    Route::post('/register', [\App\Http\Controllers\Auth\AuthController::class, 'register']);
});

// Protected routes
Route::middleware('auth')->group(function () {
    Route::post('/logout', [\App\Http\Controllers\Auth\AuthController::class, 'logout'])->name('logout');
    Route::get('/dashboard', Dashboard::class)->name('dashboard');

    // TODO: Add more protected routes
    // Route::get('/announcements/create', CreateAnnouncement::class)->name('announcements.create');
    // Route::get('/saved', SavedAnnouncements::class)->name('saved.index');
    // Route::get('/messages', Messages::class)->name('messages.index');
    // Route::get('/messages/{userId}', ShowMessages::class)->name('messages.show');
    // Route::get('/profile', ProfileEdit::class)->name('profile.edit');
    // Route::get('/proposals', MyProposals::class)->name('proposals.index');
    // Route::get('/portfolio', Portfolio::class)->name('portfolio.index');
});

// Admin Login
Route::get('/admin/login', [LoginController::class, 'showLogin'])->name('admin.login');
Route::post('/admin/login', [LoginController::class, 'login'])->name('admin.login.post');
Route::post('/admin/logout', [LoginController::class, 'logout'])->name('admin.logout');

// Admin Panel Routes (require authentication)
Route::prefix('admin')->name('admin.')->middleware(['web', 'auth'])->group(function () {
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/users', [AdminController::class, 'users'])->name('users');
    Route::get('/users/{id}/view', [AdminController::class, 'viewUser'])->name('users.view');
    Route::get('/users/{id}/edit', [AdminController::class, 'editUser'])->name('users.edit');
    Route::post('/users/{id}/update', [AdminController::class, 'updateUser'])->name('users.update');
    Route::post('/users/{id}/approve', [AdminController::class, 'approveUser'])->name('users.approve');
    Route::post('/users/{id}/delete', [AdminController::class, 'deleteUser'])->name('users.delete');
    Route::post('/users/{id}/change-password', [AdminController::class, 'changeUserPassword'])->name('users.change-password');

    Route::get('/announcements', [AdminController::class, 'announcements'])->name('announcements');
    Route::get('/announcements/{id}/edit', [AdminController::class, 'editAnnouncement'])->name('announcements.edit');
    Route::post('/announcements/{id}/update', [AdminController::class, 'updateAnnouncement'])->name('announcements.update');
    Route::post('/announcements/{id}/approve', [AdminController::class, 'approveAnnouncement'])->name('announcements.approve');
    Route::post('/announcements/{id}/reject', [AdminController::class, 'rejectAnnouncement'])->name('announcements.reject');
});
