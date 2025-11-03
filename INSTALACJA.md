# 📦 Instalacja - WebFreelance

Proste kroki do uruchomienia platformy lokalnie.

---

## ✅ Wymagania

- PHP 8.2+ (XAMPP)
- MySQL 5.7+
- Composer
- Node.js 18+
- Git

---

## 🚀 Instalacja (5 minut)

### Krok 1: Clone repository

```powershell
git clone https://github.com/twoj-user/webfreelance.git
cd webfreelance
```

### Krok 2: Przejdź do backend

```powershell
cd backend
```

### Krok 3: Zainstaluj dependencies

**⚠️ WAŻNE: Wyłącz Avast na 10 minut!**

```powershell
composer install
npm install
npm run build
```

### Krok 4: Konfiguracja

```powershell
# Skopiuj .env
cp .env.example .env

# Wygeneruj klucz
php artisan key:generate

# Skonfiguruj bazę danych w .env
# DB_DATABASE=laravel
# DB_USERNAME=root
# DB_PASSWORD=
```

### Krok 5: Migracje

```powershell
php artisan migrate
php artisan db:seed
php artisan storage:link
```

### Krok 6: Uruchom!

```powershell
php artisan serve
```

Otwórz: **http://localhost:8000** ✅

---

## 🔐 Logowanie testowe

**Admin:**
- Email: `admin@example.com`
- Hasło: `password`
- Panel: http://localhost:8000/admin/login

---

## 🛠️ Development mode

Jeśli chcesz edytować style (hot reload):

```powershell
# Terminal 1
php artisan serve

# Terminal 2
npm run dev
```

---

## 🐛 Problemy?

### "Class Livewire\Component not found"
```powershell
composer update
```

### Stylowanie nie działa
```powershell
npm run build
php artisan optimize:clear
```

### Błąd bazy danych
1. Uruchom XAMPP (MySQL)
2. Sprawdź czy dane w `.env` są poprawne
3. `php artisan migrate:fresh --seed`

---

## ✅ Gotowe!

Projekt działa na **http://localhost:8000**

**Dokumentacja:**
- `README.md` - Overview
- `TECH_STACK.md` - Technologie

