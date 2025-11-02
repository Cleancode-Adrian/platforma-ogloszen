# ⚡ Quick Start Guide

## Szybki start w 5 minut!

### 1️⃣ Otwórz 2 terminale

**Terminal 1 - Backend:**
```bash
cd backend
composer install
copy .env.example .env
php artisan key:generate
# Skonfiguruj bazę w .env (DB_DATABASE, DB_USERNAME, DB_PASSWORD)
php artisan migrate --seed
php artisan serve
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

### 2️⃣ Otwórz w przeglądarce

✅ **Frontend:** http://localhost:5173
✅ **Panel Admina:** http://localhost:8000/admin
  - Email: admin@example.com
  - Hasło: password

### 3️⃣ Gotowe!

Możesz teraz:
- ✅ Zalogować się jako admin do panelu
- ✅ Zatwierdzać/odrzucać użytkowników
- ✅ Moderować ogłoszenia
- ✅ Testować rejestrację nowych użytkowników
- ✅ Przeglądać kod i uczyć się Reacta!

---

## 📚 Co dalej?

1. Przeczytaj `README.md` dla pełnej dokumentacji
2. Zobacz `INSTALACJA.md` dla szczegółowych instrukcji
3. Eksploruj panel admina w Filament
4. Modyfikuj komponenty React w `frontend/src/`
5. Dodawaj nowe funkcje do API w `backend/app/`

---

## 🔥 Gotowe funkcje

### Backend (Laravel 11):
- ✅ REST API z Sanctum authentication
- ✅ Panel admina Laravel Filament
- ✅ System zatwierdzania użytkowników
- ✅ System moderacji ogłoszeń
- ✅ Migracje i seeders z danymi testowymi
- ✅ Kategorie, tagi, załączniki

### Frontend (React + TypeScript):
- ✅ Routing z React Router
- ✅ State management (Zustand)
- ✅ SASS z rem-based typography
- ✅ Tailwind CSS
- ✅ Axios API client
- ✅ Protected routes
- ✅ Login/Register forms

---

**Powodzenia! 🚀**

