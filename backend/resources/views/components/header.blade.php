<header class="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">

            {{-- Logo --}}
            <div class="flex items-center">
                <div class="flex-shrink-0">
                    <a href="{{ route('home') }}" class="flex items-center">
                        <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <i class="fa-solid fa-code text-white text-sm"></i>
                        </div>
                        <span class="ml-2 text-xl font-bold text-gray-900">WebFreelance</span>
                    </a>
                </div>

                {{-- Desktop Navigation --}}
                <nav class="hidden md:ml-10 lg:flex md:space-x-8">
                    <a href="{{ route('announcements.index') }}" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                        Ogłoszenia
                    </a>
                    <a href="{{ route('home') }}#jak-to-dziala" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                        Jak to działa
                    </a>
                    <a href="{{ route('home') }}#dla-freelancerow" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                        Dla freelancerów
                    </a>
                </nav>
            </div>

            {{-- User Menu --}}
            <div class="flex items-center space-x-4">
                @auth
                    <a href="{{ route('dashboard') }}" class="text-gray-600 hover:text-gray-900 text-sm font-medium hidden sm:block">
                        Panel
                    </a>
                    {{-- TODO: Activate when routes are created --}}
                    <form method="POST" action="{{ route('logout') }}" class="hidden sm:block">
                        @csrf
                        <button type="submit" class="text-gray-600 hover:text-gray-900 text-sm font-medium">
                            Wyloguj
                        </button>
                    </form>
                @else
                    <a href="{{ route('login') }}" class="text-gray-600 hover:text-gray-900 text-sm font-medium hidden sm:block">
                        Zaloguj się
                    </a>
                    <a href="{{ route('register') }}" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                        Zarejestruj się
                    </a>
                @endauth

                {{-- Mobile Menu Button --}}
                <button @click="mobileMenuOpen = !mobileMenuOpen" class="lg:hidden text-gray-600 hover:text-gray-900">
                    <i class="fa-solid fa-bars text-lg"></i>
                </button>
            </div>
        </div>
    </div>
</header>

