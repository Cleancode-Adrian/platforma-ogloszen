# 🚀 Platforma Ogłoszeń - React + Laravel

Nowoczesna platforma do publikowania i przeglądania ogłoszeń o pracę dla freelancerów.

## 📋 Stack Technologiczny

### Backend:
- **Laravel 11** - REST API
- **MySQL** - Baza danych
- **Laravel Sanctum** - Autentykacja API
- **Laravel Filament** - Panel administracyjny

### Frontend:
- **React 18** - Biblioteka UI
- **TypeScript** - Typowanie
- **Vite** - Build tool
- **Tailwind CSS** - Stylowanie
- **SASS** - Preprocesor CSS z rem-based typography
- **React Router** - Routing
- **Zustand** - State management
- **Axios** - HTTP client
- **React Query** - Data fetching

## ✨ Funkcjonalności

### Dla użytkowników:
- ✅ Rejestracja konta (wymaga zatwierdzenia przez admina)
- ✅ Logowanie / Wylogowanie
- ✅ Dodawanie ogłoszeń (status: oczekujące)
- ✅ Przeglądanie zatwierdzonych ogłoszeń
- ✅ Wyszukiwanie i filtrowanie ogłoszeń
- ✅ Edycja własnego profilu
- ✅ Dashboard użytkownika

### Panel Admina (Laravel Filament):
- ✅ Zarządzanie użytkownikami (akceptacja/odrzucenie)
- ✅ Moderacja ogłoszeń (akceptacja/odrzucenie)
- ✅ Zarządzanie kategoriami
- ✅ Statystyki i raporty
- ✅ Bulk actions (operacje na wielu rekordach)

## 📁 Struktura Projektu

```
projekt-ogloszenia/
├── backend/                    # Laravel API
│   ├── app/
│   │   ├── Filament/          # Panel admina
│   │   ├── Http/Controllers/  # API Controllers
│   │   └── Models/            # Eloquent Models
│   ├── database/
│   │   ├── migrations/        # Migracje bazy danych
│   │   └── seeders/           # Dane testowe
│   └── routes/
│       └── api.php            # API routes
│
├── frontend/                   # React App
│   ├── src/
│   │   ├── components/        # Komponenty React
│   │   ├── pages/             # Strony
│   │   ├── layouts/           # Layouty
│   │   ├── services/          # API services
│   │   ├── store/             # Zustand store
│   │   ├── styles/            # SASS files
│   │   └── types/             # TypeScript types
│   └── package.json
│
└── README.md
```

## 🛠️ Instalacja

### Wymagania:
- **PHP** 8.2 lub nowszy
- **Composer**
- **Node.js** 18 lub nowszy
- **MySQL** 8.0 lub nowszy
- **XAMPP/Laragon** (zalecane dla Windows)

### 1. Klonowanie repozytorium

```bash
cd D:\nowy\ projekt
```

### 2. Backend Laravel - Instalacja

```bash
cd backend

# Zainstaluj zależności
composer install

# Skopiuj plik .env
copy .env.example .env

# Wygeneruj klucz aplikacji
php artisan key:generate

# Skonfiguruj bazę danych w .env:
# DB_DATABASE=ogloszenia_db
# DB_USERNAME=root
# DB_PASSWORD=

# Utwórz bazę danych w phpMyAdmin lub:
# mysql -u root -p
# CREATE DATABASE ogloszenia_db;

# Uruchom migracje
php artisan migrate

# Wypełnij bazę danymi testowymi
php artisan db:seed

# Zainstaluj Filament (panel admina)
php artisan filament:install --panels

# Uruchom serwer deweloperski
php artisan serve
```

Backend będzie dostępny na: `http://localhost:8000`

**Panel Admina:** `http://localhost:8000/admin`
- Login: `admin@example.com`
- Hasło: `password`

### 3. Frontend React - Instalacja

Otwórz nowy terminal:

```bash
cd frontend

# Zainstaluj zależności
npm install

# Skopiuj plik .env
copy .env.example .env

# Uruchom serwer deweloperski
npm run dev
```

Frontend będzie dostępny na: `http://localhost:5173`

## 👤 Dane testowe

Po uruchomieniu seedów będziesz mieć:

### Użytkownicy:
| Email | Hasło | Rola | Status |
|-------|-------|------|--------|
| admin@example.com | password | Admin | Zatwierdzony |
| anna@example.com | password | User | Zatwierdzony |
| marcin@example.com | password | User | Zatwierdzony |
| jan@example.com | password | User | Oczekujący |

### Kategorie:
- Strona firmowa
- E-commerce
- Aplikacja web
- WordPress
- Landing page
- Redesign
- UI/UX Design
- SEO

### Ogłoszenia:
5 przykładowych ogłoszeń w różnych statusach

## 🎨 System Typografii (REM-based)

Projekt używa systemu opartego na **rem** dla lepszej dostępności i skalowalności:

```scss
// Base
$base-font-size: 16px; // 1rem = 16px

// Font sizes
$font-size-xs: 0.75rem;    // 12px
$font-size-sm: 0.875rem;   // 14px
$font-size-base: 1rem;     // 16px
$font-size-lg: 1.125rem;   // 18px
$font-size-xl: 1.25rem;    // 20px
// ... etc

// Spacing
$spacing-4: 1rem;      // 16px
$spacing-8: 2rem;      // 32px
// ... etc
```

## 🔐 API Endpoints

### Public:
- `POST /api/auth/register` - Rejestracja
- `POST /api/auth/login` - Logowanie
- `GET /api/announcements` - Lista ogłoszeń
- `GET /api/announcements/{id}` - Szczegóły ogłoszenia
- `GET /api/categories` - Lista kategorii

### Protected (wymagają tokenu):
- `GET /api/auth/me` - Dane zalogowanego użytkownika
- `POST /api/auth/logout` - Wylogowanie
- `GET /api/my-announcements` - Moje ogłoszenia
- `POST /api/announcements` - Dodaj ogłoszenie
- `PUT /api/announcements/{id}` - Edytuj ogłoszenie
- `DELETE /api/announcements/{id}` - Usuń ogłoszenie

## 🎯 Kluczowe Komendy

### Backend (Laravel):
```bash
# Czyszczenie cache
php artisan cache:clear
php artisan config:clear

# Nowe migracje
php artisan make:migration nazwa_migracji

# Nowy model
php artisan make:model NazwaModelu -m

# Nowy controller
php artisan make:controller Api/NazwaController

# Rollback migracji
php artisan migrate:rollback

# Odśwież bazę danych
php artisan migrate:fresh --seed
```

### Frontend (React):
```bash
# Build produkcyjny
npm run build

# Preview build
npm run preview

# Linter
npm run lint
```

## 📱 Panel Admina - Filament

Dostęp: `http://localhost:8000/admin`

### Funkcje:
1. **Dashboard** - Statystyki ogólne
2. **Użytkownicy** - Zarządzanie użytkownikami
   - Akceptacja/odrzucenie kont
   - Edycja danych
   - Bulk actions
3. **Ogłoszenia** - Moderacja ogłoszeń
   - Akceptacja/odrzucenie
   - Edycja treści
   - Bulk operations
4. **Kategorie** - Zarządzanie kategoriami

## 🔒 Bezpieczeństwo

- ✅ **CSRF Protection** (Laravel)
- ✅ **SQL Injection Protection** (Eloquent ORM)
- ✅ **XSS Protection** (automatyczne escapowanie)
- ✅ **Password Hashing** (bcrypt)
- ✅ **API Rate Limiting**
- ✅ **Sanctum Token Authentication**
- ✅ **Approval System** (użytkownicy i ogłoszenia wymagają zatwierdzenia)

## 🚀 Deploy na Produkcję

### Backend (Laravel):
1. Skonfiguruj `.env` dla produkcji
2. Ustaw `APP_ENV=production`
3. Ustaw `APP_DEBUG=false`
4. Wygeneruj nowy `APP_KEY`
5. Skonfiguruj bazę danych
6. `composer install --optimize-autoloader --no-dev`
7. `php artisan migrate --force`
8. `php artisan config:cache`
9. `php artisan route:cache`

### Frontend (React):
1. Ustaw `VITE_API_URL` na produkcyjny URL
2. `npm run build`
3. Upload folderu `dist/` na serwer

## 📝 TODO - Dalszy rozwój

- [ ] System wiadomości między użytkownikami
- [ ] Płatności online (Stripe/PayPal)
- [ ] System opinii i ocen
- [ ] Powiadomienia email
- [ ] Upload plików do ogłoszeń
- [ ] Zaawansowane filtry
- [ ] Panel statystyk dla użytkowników
- [ ] Tryb ciemny (dark mode)

## 🤝 Wsparcie

W razie problemów:
1. Sprawdź logi Laravel: `storage/logs/laravel.log`
2. Sprawdź konsolę przeglądarki (F12)
3. Sprawdź połączenie z bazą danych
4. Upewnij się, że backend i frontend działają

## 📄 Licencja

MIT License - możesz swobodnie modyfikować i używać w projektach komercyjnych.

---

**Stworzone z ❤️ dla najlepszej platformy ogłoszeń!**

