# 🚀 WebFreelance

Platforma ogłoszeń łącząca klientów z freelancerami. Publikuj zlecenia, otrzymuj oferty, buduj swoją reputację.

---

## ⚡ Szybki start

### Instalacja

```bash
cd backend

# Zainstaluj dependencies (WYŁĄCZ AVAST!)
composer install
npm install
npm run build

# Konfiguracja
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan storage:link

# Uruchom
php artisan serve
```

Otwórz: **http://localhost:8000**

---

## 🎯 Główne funkcje

- ✅ Dodawanie i przeglądanie ogłoszeń
- ✅ System ofert freelancerów
- ✅ Prywatne wiadomości
- ✅ Oceny i opinie (gwiazdki)
- ✅ Portfolio realizacji
- ✅ Panel administratora
- ✅ Perfect SEO (Schema.org)

---

## 🔐 Logowanie

**Panel administratora:**
- URL: http://localhost:8000/admin/login
- Email: `admin@example.com`
- Hasło: `password`

⚠️ **ZMIEŃ hasło na produkcji!**

---

## 📖 Technologie

**Szczegółowy opis:** `TECH_STACK.md`

**Stack:**
- Laravel 12 + Livewire 3
- MySQL 8
- Tailwind CSS 3.4
- Alpine.js 3.13
- Vite 5

---

## 🌐 Deployment

**Rekomendacja:** OVH VPS SSD 1 (~25 PLN/m)

### Quick deploy:
1. Kup VPS
2. Zainstaluj Ubuntu 22.04 + LEMP
3. Clone repo
4. Configure .env
5. Setup Nginx + SSL
6. Done!

---

## 📊 Performance

- SEO Score: **95-100/100**
- Speed Index: **~1.5s**
- First Paint: **~0.5s**

---

## 🤝 Contributing

Pull requests are welcome!

---

## 📝 License

MIT

---

**WebFreelance** - Znajdź idealnego freelancera! 💼
