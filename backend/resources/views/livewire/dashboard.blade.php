<div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {{-- Header --}}
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Panel użytkownika</h1>
            <p class="text-gray-600">Witaj, {{ auth()->user()->name }}! 👋</p>
        </div>

        {{-- Stats Cards --}}
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm font-medium">Wszystkie</span>
                    <span class="text-2xl">📊</span>
                </div>
                <div class="text-3xl font-bold text-gray-900">{{ $stats['total'] }}</div>
            </div>

            <div class="card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm font-medium">Oczekujące</span>
                    <span class="text-2xl">⏳</span>
                </div>
                <div class="text-3xl font-bold text-yellow-600">{{ $stats['pending'] }}</div>
            </div>

            <div class="card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm font-medium">Opublikowane</span>
                    <span class="text-2xl">✅</span>
                </div>
                <div class="text-3xl font-bold text-green-600">{{ $stats['approved'] }}</div>
            </div>

            <div class="card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm font-medium">Odrzucone</span>
                    <span class="text-2xl">❌</span>
                </div>
                <div class="text-3xl font-bold text-red-600">{{ $stats['rejected'] }}</div>
            </div>
        </div>

        {{-- Quick Actions --}}
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 mb-8 text-white">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-bold mb-2">Dodaj nowe ogłoszenie</h2>
                    <p class="text-blue-100">Znajdź idealnego freelancera dla swojego projektu</p>
                </div>
                <a href="{{ route('announcements.create') }}" class="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
                    ➕ Dodaj ogłoszenie
                </a>
            </div>
        </div>

        {{-- Announcements Table --}}
        <div class="card">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold text-gray-900">Moje ogłoszenia</h2>
                <span class="text-sm text-gray-500">{{ $stats['total'] }} ogłoszeń</span>
            </div>

            @if($announcements->count() > 0)
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th class="text-left px-4 py-3 text-sm font-semibold text-gray-700">Tytuł</th>
                                <th class="text-left px-4 py-3 text-sm font-semibold text-gray-700">Kategoria</th>
                                <th class="text-left px-4 py-3 text-sm font-semibold text-gray-700">Status</th>
                                <th class="text-left px-4 py-3 text-sm font-semibold text-gray-700">Oferty</th>
                                <th class="text-left px-4 py-3 text-sm font-semibold text-gray-700">Data</th>
                                <th class="text-right px-4 py-3 text-sm font-semibold text-gray-700">Akcje</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            @foreach($announcements as $announcement)
                                <tr class="hover:bg-gray-50">
                                    <td class="px-4 py-4">
                                        <div class="font-medium text-gray-900">{{ $announcement->title }}</div>
                                    </td>
                                    <td class="px-4 py-4">
                                        <span class="text-xs font-medium px-2 py-1 rounded"
                                              style="background-color: {{ $announcement->category->color }}20; color: {{ $announcement->category->color }}">
                                            {{ $announcement->category->name }}
                                        </span>
                                    </td>
                                    <td class="px-4 py-4">
                                        @if($announcement->is_approved && $announcement->status === 'published')
                                            <span class="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">✅ Opublikowane</span>
                                        @elseif($announcement->status === 'rejected')
                                            <span class="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">❌ Odrzucone</span>
                                        @else
                                            <span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">⏳ Oczekuje</span>
                                        @endif
                                    </td>
                                    <td class="px-4 py-4 text-sm text-gray-600">
                                        {{ $announcement->proposals_count }}
                                    </td>
                                    <td class="px-4 py-4 text-sm text-gray-600">
                                        {{ $announcement->created_at->format('d.m.Y') }}
                                    </td>
                                    <td class="px-4 py-4 text-right">
                                        <div class="flex items-center justify-end gap-2">
                                            @if($announcement->is_approved)
                                                <a href="{{ route('announcements.show', $announcement) }}" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                                    👁️ Zobacz
                                                </a>
                                            @endif
                                            <button wire:click="delete({{ $announcement->id }})"
                                                    wire:confirm="Czy na pewno chcesz usunąć to ogłoszenie?"
                                                    class="text-red-600 hover:text-red-700 text-sm font-medium">
                                                🗑️ Usuń
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            @else
                <div class="text-center py-12">
                    <div class="text-6xl mb-4">📝</div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">Brak ogłoszeń</h3>
                    <p class="text-gray-600 mb-6">Dodaj swoje pierwsze ogłoszenie, aby znaleźć freelancera</p>
                    <a href="{{ route('announcements.create') }}" class="inline-flex items-center btn btn-primary">
                        ➕ Dodaj ogłoszenie
                    </a>
                </div>
            @endif
        </div>

    </div>
</div>

