@extends('admin.layout')

@section('title', 'Dashboard')

@section('content')
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-sm text-gray-600">Wszyscy użytkownicy</p>
                <p class="text-3xl font-bold text-gray-900">{{ $stats['total_users'] }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                👥
            </div>
        </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-sm text-gray-600">Oczekujący użytkownicy</p>
                <p class="text-3xl font-bold text-yellow-600">{{ $stats['pending_users'] }}</p>
            </div>
            <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">
                ⏳
            </div>
        </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-sm text-gray-600">Wszystkie ogłoszenia</p>
                <p class="text-3xl font-bold text-gray-900">{{ $stats['total_announcements'] }}</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                📢
            </div>
        </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-sm text-gray-600">Oczekujące ogłoszenia</p>
                <p class="text-3xl font-bold text-orange-600">{{ $stats['pending_announcements'] }}</p>
            </div>
            <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
                🔔
            </div>
        </div>
    </div>
</div>

<div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
    <a href="{{ route('admin.users') }}" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
        <h3 class="text-xl font-bold text-gray-900 mb-2">👥 Zarządzaj użytkownikami</h3>
        <p class="text-gray-600">Akceptuj nowe konta i zarządzaj uprawnieniami</p>
    </a>

    <a href="{{ route('admin.announcements') }}" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
        <h3 class="text-xl font-bold text-gray-900 mb-2">📢 Moderuj ogłoszenia</h3>
        <p class="text-gray-600">Akceptuj, odrzucaj i edytuj ogłoszenia</p>
    </a>
</div>
@endsection

