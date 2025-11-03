<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel Admina - Platforma Ogłoszeń</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>body { font-family: 'Inter', sans-serif; }</style>
</head>
<body class="bg-gray-50">
    <div class="min-h-screen flex">
        <!-- Sidebar -->
        <aside class="w-64 bg-gray-900 text-white flex flex-col">
            <div class="p-6 border-b border-gray-800">
                <h1 class="text-xl font-bold">Panel Admina</h1>
                <p class="text-sm text-gray-400">{{ auth()->user()->name }}</p>
            </div>
            <nav class="flex-1 p-4">
                <a href="{{ route('admin.dashboard') }}" class="block px-4 py-3 rounded-lg mb-2 {{ request()->routeIs('admin.dashboard') ? 'bg-blue-600' : 'hover:bg-gray-800' }}">
                    📊 Dashboard
                </a>
                <a href="{{ route('admin.users') }}" class="block px-4 py-3 rounded-lg mb-2 {{ request()->routeIs('admin.users*') ? 'bg-blue-600' : 'hover:bg-gray-800' }}">
                    👥 Użytkownicy
                </a>
                <a href="{{ route('admin.announcements') }}" class="block px-4 py-3 rounded-lg mb-2 {{ request()->routeIs('admin.announcements*') ? 'bg-blue-600' : 'hover:bg-gray-800' }}">
                    📢 Ogłoszenia
                </a>
            </nav>
            <div class="p-4 border-t border-gray-800">
                <form method="POST" action="{{ route('admin.logout') }}">
                    @csrf
                    <button type="submit" class="w-full px-4 py-3 text-left rounded-lg hover:bg-gray-800">
                        🚪 Wyloguj
                    </button>
                </form>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1">
            <header class="bg-white border-b border-gray-200 px-8 py-6">
                <h2 class="text-2xl font-bold text-gray-900">@yield('title')</h2>
            </header>

            <div class="p-8">
                @if(session('success'))
                    <div class="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                        ✅ {{ session('success') }}
                    </div>
                @endif

                @if(session('error'))
                    <div class="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        ❌ {{ session('error') }}
                    </div>
                @endif

                @yield('content')
            </div>
        </main>
    </div>
</body>
</html>

