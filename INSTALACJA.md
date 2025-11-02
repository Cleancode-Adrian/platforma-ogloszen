# 📦 Szczegółowa Instrukcja Instalacji

## Krok po kroku - Windows (XAMPP)

### 1. Przygotowanie środowiska

#### Zainstaluj wymagane oprogramowanie:

1. **XAMPP** (Apache + MySQL + PHP)
   - Pobierz: https://www.apachefriends.org/
   - Zainstaluj z PHP 8.2+
   - Uruchom Apache i MySQL w XAMPP Control Panel

2. **Composer** (menadżer pakietów PHP)
   - Pobierz: https://getcomposer.org/download/
   - Zainstaluj globalnie

3. **Node.js** (JavaScript runtime)
   - Pobierz: https://nodejs.org/ (wersja LTS)
   - Zainstaluj z npm

4. **Git** (opcjonalne, do kontroli wersji)
   - Pobierz: https://git-scm.com/

### 2. Konfiguracja Bazy Danych

1. Otwórz **phpMyAdmin**: `http://localhost/phpmyadmin`

2. Kliknij "New" (Nowa)

3. Utwórz bazę danych:
   - Nazwa: `ogloszenia_db`
   - Kodowanie: `utf8mb4_unicode_ci`
   - Kliknij "Create"

### 3. Backend - Laravel

#### 3.1. Przejdź do folderu backend

```bash
cd D:\nowy projekt\backend
```

#### 3.2. Zainstaluj zależności PHP

```bash
composer install
```

To może potrwać kilka minut przy pierwszym uruchomieniu.

#### 3.3. Konfiguracja środowiska

1. Skopiuj plik `.env.example`:
```bash
copy .env.example .env
```

2. Otwórz plik `.env` w notatniku i edytuj:

```env
APP_NAME="Platforma Ogłoszeń"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ogloszenia_db
DB_USERNAME=root
DB_PASSWORD=
```

⚠️ Jeśli Twój MySQL ma hasło, wpisz je w `DB_PASSWORD`

#### 3.4. Wygeneruj klucz aplikacji

```bash
php artisan key:generate
```

#### 3.5. Uruchom migracje bazy danych

```bash
php artisan migrate
```

Powinieneś zobaczyć listę utworzonych tabel.

#### 3.6. Wypełnij bazę danymi testowymi

```bash
php artisan db:seed
```

To utworzy:
- Użytkownika admin
- Kilku użytkowników testowych
- Kategorie
- Przykładowe ogłoszenia
- Tagi

#### 3.7. Zainstaluj Laravel Filament (Panel Admina)

Filament powinien być już zainstalowany via Composer, ale upewnijmy się:

```bash
php artisan filament:upgrade
```

#### 3.8. Uruchom serwer Laravel

```bash
php artisan serve
```

✅ Backend działa na: `http://localhost:8000`
✅ Panel Admina: `http://localhost:8000/admin`

**Dane logowania do panelu:**
- Email: `admin@example.com`
- Hasło: `password`

---

### 4. Frontend - React

#### 4.1. Otwórz NOWY terminal/CMD

Pozostaw poprzedni terminal z serwerem Laravel włączonym!

#### 4.2. Przejdź do folderu frontend

```bash
cd D:\nowy projekt\frontend
```

#### 4.3. Zainstaluj zależności Node.js

```bash
npm install
```

To może potrwać kilka minut.

#### 4.4. Konfiguracja środowiska

1. Skopiuj plik `.env.example`:
```bash
copy .env.example .env
```

2. Otwórz `.env` i sprawdź:
```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME="Platforma Ogłoszeń"
```

#### 4.5. Uruchom serwer deweloperski

```bash
npm run dev
```

✅ Frontend działa na: `http://localhost:5173`

---

## 🎉 Gotowe!

Masz teraz uruchomione:

| Serwis | URL | Opis |
|--------|-----|------|
| Frontend | http://localhost:5173 | Strona React |
| Backend API | http://localhost:8000/api | API Laravel |
| Panel Admina | http://localhost:8000/admin | Filament Admin |
| phpMyAdmin | http://localhost/phpmyadmin | Zarządzanie bazą |

---

## 🧪 Testowanie

### Test 1: Strona główna
1. Otwórz: `http://localhost:5173`
2. Powinieneś zobaczyć stronę główną z ogłoszeniami

### Test 2: Panel Admina
1. Otwórz: `http://localhost:8000/admin`
2. Zaloguj się:
   - Email: `admin@example.com`
   - Hasło: `password`
3. Zobaczysz panel z zarządzaniem użytkownikami i ogłoszeniami

### Test 3: Rejestracja użytkownika
1. Na stronie głównej kliknij "Zarejestruj się"
2. Wypełnij formularz
3. Po rejestracji zobaczysz komunikat o oczekiwaniu na zatwierdzenie
4. Przejdź do panelu admina i zatwierdź nowe konto w sekcji "Użytkownicy"

### Test 4: Dodawanie ogłoszenia
1. Zaloguj się jako użytkownik testowy:
   - Email: `anna@example.com`
   - Hasło: `password`
2. Kliknij "Dodaj ogłoszenie"
3. Wypełnij formularz
4. Ogłoszenie pojawi się jako "Oczekujące" w panelu admina
5. Zatwierdź je w panelu admina
6. Ogłoszenie będzie widoczne na stronie

---

## ⚠️ Częste Problemy

### Problem: "Connection refused" przy API

**Rozwiązanie:**
1. Sprawdź czy serwer Laravel działa (`php artisan serve`)
2. Sprawdź `VITE_API_URL` w `.env` frontendu
3. Otwórz `http://localhost:8000/api/announcements` w przeglądarce - powinien zwrócić JSON

### Problem: "Access denied" do bazy danych

**Rozwiązanie:**
1. Sprawdź czy MySQL działa w XAMPP
2. Sprawdź dane w `.env`:
   ```
   DB_USERNAME=root
   DB_PASSWORD=  (puste lub Twoje hasło)
   ```
3. Sprawdź czy baza `ogloszenia_db` istnieje w phpMyAdmin

### Problem: "Class not found" w Laravel

**Rozwiązanie:**
```bash
composer dump-autoload
php artisan config:clear
php artisan cache:clear
```

### Problem: Strona React się nie ładuje

**Rozwiązanie:**
1. Sprawdź czy `npm run dev` działa
2. Sprawdź czy port 5173 jest wolny
3. Otwórz konsolę przeglądarki (F12) i sprawdź błędy
4. Spróbuj:
   ```bash
   npm cache clean --force
   npm install
   npm run dev
   ```

### Problem: Panel Admina nie działa

**Rozwiązanie:**
```bash
cd backend
php artisan filament:upgrade
php artisan optimize:clear
```

---

## 🔄 Resetowanie projektu

Jeśli chcesz zacząć od nowa:

### Backend:
```bash
cd backend
php artisan migrate:fresh --seed
```

To usunie wszystkie dane i utworzy je na nowo!

### Frontend:
```bash
cd frontend
rm -rf node_modules
npm install
```

---

## 📞 Kolejne kroki

Po instalacji możesz:

1. ✅ Eksplorować panel admina
2. ✅ Testować dodawanie ogłoszeń
3. ✅ Modyfikować style w `frontend/src/styles/`
4. ✅ Dodawać nowe funkcje
5. ✅ Dostosować kolory i branding

---

**Powodzenia! 🚀**

Jeśli napotkasz problemy, sprawdź logi:
- Laravel: `backend/storage/logs/laravel.log`
- Przeglądarka: F12 → Console

