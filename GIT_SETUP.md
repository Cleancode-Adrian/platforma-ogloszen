# 🔧 Wrzucenie projektu na Git - Instrukcja

## 📦 Przygotowanie do Git

### 1️⃣ Zainstaluj Git (jeśli nie masz):

Pobierz: **https://git-scm.com/download/win**

Zainstaluj z domyślnymi ustawieniami.

---

## 🚀 Inicjalizacja Git w projekcie

### 2️⃣ Otwórz PowerShell w głównym folderze:

```powershell
cd "D:\nowy projekt"

# Inicjalizuj Git
git init

# Skonfiguruj Git (pierwsza konfiguracja)
git config user.name "Twoje Imię"
git config user.email "twoj@email.com"

# Dodaj wszystkie pliki
git add .

# Pierwszy commit
git commit -m "Inicjalizacja projektu - React + Laravel + Filament"
```

---

## 🌐 Wrzuć na GitHub (darmowe)

### 3️⃣ Utwórz repozytorium na GitHub:

1. Wejdź na: **https://github.com**
2. Zaloguj się (lub zarejestruj darmowe konto)
3. Kliknij **"New repository"** (zielony przycisk)
4. Nazwa: `platforma-ogloszen`
5. Opis: "Platforma ogłoszeń - React + Laravel + Filament"
6. **Private** (zaznacz jeśli ma być prywatne)
7. **NIE** zaznaczaj "Initialize with README"
8. Kliknij **"Create repository"**

### 4️⃣ Połącz lokalny projekt z GitHub:

GitHub pokaże Ci komendy - skopiuj je, ale ja podam gotowe:

```powershell
cd "D:\nowy projekt"

# Dodaj remote
git remote add origin https://github.com/TWOJA_NAZWA/platforma-ogloszen.git

# Wypchnij kod
git branch -M main
git push -u origin main
```

---

## 👥 Współpraca z zespołem

### Dodaj współpracowników:

1. W repozytorium GitHub kliknij **Settings**
2. **Collaborators** → **Add people**
3. Wpisz ich username GitHub
4. Wyślij zaproszenie

### Oni pobiorą projekt tak:

```bash
# Sklonuj projekt
git clone https://github.com/TWOJA_NAZWA/platforma-ogloszen.git
cd platforma-ogloszen

# Backend
cd backend
composer install --ignore-platform-reqs
copy .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve

# Frontend (nowy terminal)
cd ../frontend
npm install
copy .env.example .env
npm run dev
```

---

## 🔄 Aktualizacje w zespole

### Gdy Ty wprowadzasz zmiany:

```powershell
git add .
git commit -m "Opis zmian"
git push
```

### Gdy ktoś inny wprowadził zmiany:

```powershell
git pull
```

---

## 📋 Przydatne komendy Git:

```bash
# Status (co się zmieniło)
git status

# Zobacz historię
git log --oneline

# Cofnij zmiany w pliku
git checkout -- nazwa_pliku

# Utwórz nową gałąź (feature)
git checkout -b nowa-funkcja

# Przełącz się na main
git checkout main

# Połącz gałęzie
git merge nowa-funkcja
```

---

## 🔐 Co NIE jest w Git (są w .gitignore):

- ❌ `.env` (hasła, klucze)
- ❌ `vendor/` i `node_modules/` (za duże, instaluje się przez composer/npm)
- ❌ Logi i cache
- ❌ Baza danych (każdy ma swoją lokalnie)

**To jest DOBRE** - każdy deweloper:
1. Sklonuje repo
2. Uruchomi `composer install` i `npm install`
3. Skonfiguruje swoją bazę w `.env`
4. Uruchomi `php artisan migrate --seed`

---

## 📝 README dla współpracowników

Już masz gotowe pliki:
- ✅ **README.md** - pełna dokumentacja
- ✅ **INSTALACJA.md** - krok po kroku
- ✅ **QUICK_START.md** - szybki start
- ✅ **.gitignore** - co ignorować

---

**Najpierw uruchom backend czystym startem:**

```powershell
cd "D:\nowy projekt\backend"
composer install --no-scripts --ignore-platform-reqs
php artisan config:clear
php artisan serve
```

**Napisz czy tym razem backend się uruchomił!** 🚀

Jak zadziała, to od razu wrzucimy na Gita! 💪
