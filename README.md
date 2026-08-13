# Projekciarz.pl — katalog roboczy

> **Uwaga: to nie jest repozytorium, które trafia na produkcję.**

W tym katalogu istnieją **dwa niezależne repozytoria git**:

| Katalog | Remote | Rola |
|---|---|---|
| `.` (ten) | `platforma-ogloszen` | stary snapshot z listopada 2025, nieaktualny |
| `backend/` | `nowy-projekt` | **kod produkcyjny projekciarz.pl** |

Aplikacja żyje w [backend/](backend/) i tam należy pracować. Na serwerze
repozytorium `nowy-projekt` jest sklonowane bezpośrednio do
`/var/www/projekciarz.pl` — bez podkatalogu `backend`.

Jeśli robisz `git pull` w tym katalogu, **nie pobierasz kodu produkcyjnego**.

---

## Start

- Dokumentacja projektu: [backend/README.md](backend/README.md)
- Wdrożenie i bezpieczeństwo: [backend/BEZPIECZENSTWO.md](backend/BEZPIECZENSTWO.md)

---

## Porządki do zrobienia

Dwa repozytoria w jednym drzewie katalogów to źródło pomyłek — łatwo
zacommitować zmianę nie tam, gdzie trzeba. Docelowo warto:

1. Zweryfikować, czy `platforma-ogloszen` zawiera cokolwiek, czego nie ma
   w `nowy-projekt` (na oko: nie).
2. Zarchiwizować `platforma-ogloszen` na GitHubie.
3. Zostawić w katalogu wyłącznie zawartość `backend/`.
