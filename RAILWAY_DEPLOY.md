# 🚀 Deployment na Railway.app

## 📋 Krok 1: Przygotowanie

### 1. Zakomituj wszystkie zmiany do Git:
```bash
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

## 🌐 Krok 2: Deployment na Railway

### 1. Wejdź na https://railway.app
- Zaloguj się przez GitHub

### 2. Utwórz nowy projekt
- Kliknij "New Project"
- Wybierz "Deploy from GitHub repo"
- Wybierz ten projekt

### 3. Dodaj MySQL Database
- W projekcie kliknij "+ New"
- Wybierz "Database" → "Add MySQL"
- Railway automatycznie utworzy bazę

### 4. Skonfiguruj zmienne środowiskowe

W zakładce "Variables" dodaj:

**Wymagane zmienne:**
```env
APP_NAME=WebFreelance
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:WYGENERUJ_KLUCZ
APP_URL=https://twoja-nazwa.up.railway.app
APP_TIMEZONE=Europe/Warsaw

# Railway automatycznie doda zmienne MySQL:
# MYSQLHOST, MYSQLPORT, MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD

# Użyj ich w Laravel:
DB_CONNECTION=mysql
DB_HOST=${MYSQLHOST}
DB_PORT=${MYSQLPORT}
DB_DATABASE=${MYSQLDATABASE}
DB_USERNAME=${MYSQLUSER}
DB_PASSWORD=${MYSQLPASSWORD}

SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database

LOG_CHANNEL=stack
LOG_LEVEL=error

# Email (opcjonalnie - możesz użyć Gmail SMTP)
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=twoj-email@gmail.com
MAIL_PASSWORD=haslo-aplikacji-gmail
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=twoj-email@gmail.com
MAIL_FROM_NAME=WebFreelance

APP_FRONTEND_URL=${APP_URL}
```

### 5. Wygeneruj APP_KEY

W terminalu lokalnie:
```bash
cd backend
php artisan key:generate --show
```

Skopiuj wygenerowany klucz i dodaj jako `APP_KEY` w Railway.

### 6. Uruchom migracje

W Railway CLI lub przez Dashboard:
```bash
php artisan migrate --force --seed
```

Lub ustaw w Variables:
```env
RUN_MIGRATIONS=true
```

### 7. Zaktualizuj URL

Po deploymencie Railway da Ci URL typu:
`https://nazwa-projektu.up.railway.app`

Zaktualizuj zmienną `APP_URL` w Variables.

## ✅ Sprawdzenie

1. Otwórz: `https://twoja-nazwa.up.railway.app`
2. Sprawdź: `https://twoja-nazwa.up.railway.app/admin/login`

**Dane logowania:**
- Email: `admin@example.com`
- Hasło: `password`

## 🔧 Troubleshooting

### Problem: "500 Internal Server Error"
**Rozwiązanie:**
- Sprawdź logi w Railway Dashboard
- Upewnij się że `APP_KEY` jest ustawiony
- Sprawdź czy migracje zostały uruchomione

### Problem: "Connection refused" do bazy
**Rozwiązanie:**
- Sprawdź czy MySQL jest dodany do projektu
- Sprawdź czy zmienne DB_* są poprawne
- Railway automatycznie podpina MySQL przez zmienne `${MYSQL*}`

### Problem: Vite assets nie ładują się
**Rozwiązanie:**
- Uruchom lokalnie: `npm run build`
- Zakomituj folder `backend/public/build`
- Push do GitHub

## 🎯 Auto-deploy

Railway automatycznie zrobi re-deploy przy każdym push do GitHub! 🎉

## 💰 Limity darmowego planu

- **500h** wykonania/miesiąc
- **100 GB** transferu
- **1 GB** storage dla bazy danych
- Aplikacja "zasypia" po 15 min bezczynności

**Wystarczy dla małego projektu testowego!**

## 🚀 Co dalej?

Po wyczerpaniu darmowego planu:
- Railway: ~$5-20/mies (pay as you go)
- LUB przenieś na OVH VPS (~25 PLN/mies)

---

**Powodzenia! 🎉**

