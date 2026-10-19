# 🌋 Spiritland — Spirit Island Game Tracker

Aplikacja webowa do rejestrowania, przeglądania i współdzielenia rozgrywek w grze planszowej **Spirit Island**. Spiritland umożliwia prowadzenie historii partii, analizowanie wyników, zarządzanie profilem użytkownika oraz przeglądanie katalogu duchów, aspektów, scenariuszy i przeciwników.

Projekt składa się z aplikacji frontendowej napisanej w Angularze, backendu ASP.NET Core Web API oraz relacyjnej bazy danych PostgreSQL.

---

## 📑 Spis treści

- [Opis projektu](#-opis-projektu)
- [Funkcjonalności](#-funkcjonalności)
- [Interfejs aplikacji](#-interfejs-aplikacji)
- [Stos technologiczny](#-stos-technologiczny)
- [Struktura projektu](#-struktura-projektu)
- [Wymagania](#-wymagania)
- [Uruchomienie projektu](#-uruchomienie-projektu)
- [Baza danych](#-baza-danych)
- [Możliwości rozwoju](#-możliwości-rozwoju)
- [Autor](#-autor)

---

## 📘 Opis projektu

**Spiritland** to aplikacja webowa wspierająca graczy *Spirit Island* w organizowaniu, dokumentowaniu i analizowaniu rozgrywek.

Użytkownicy mogą zapisywać wyniki partii, przypisywać do nich uczestników, duchy i aspekty, a także przeglądać szczegóły wcześniejszych rozgrywek. Aplikacja umożliwia również zapraszanie innych użytkowników do wspólnej gry.

Dodatkowo Spiritland udostępnia katalog elementów gry planszowej, który pozwala zapoznać się z opisami i grafikami duchów, aspektów, scenariuszy oraz przeciwników.

---

## 🎮 Funkcjonalności

### 1. 🔐 Konta użytkowników

- Rejestracja i logowanie.
- Uwierzytelnianie użytkowników za pomocą tokenów JWT.
- Wyświetlanie profilu użytkownika.
- Edycja danych profilu.
- Wybór ulubionego ducha i aspektu.
- Rozdzielenie widoków i funkcji dla użytkowników zalogowanych i niezalogowanych.

### 2. 🎲 Zarządzanie rozgrywkami

- Tworzenie nowych rozgrywek.
- Wyświetlanie listy własnych i współdzielonych partii.
- Podgląd szczegółów rozgrywki.
- Edycja i usuwanie partii.
- Przypisywanie graczy do rozgrywki.
- Wybór ducha i aspektu dla każdego uczestnika.
- Zapisywanie notatek dotyczących uczestników.

Informacje zapisywane w rozgrywce obejmują:

- datę rozegrania;
- uczestników;
- duchy i aspekty graczy;
- przeciwnika i poziom trudności;
- wykorzystany scenariusz;
- stan wyspy — skażona lub nieskażona;
- wynik — wygrana lub przegrana;
- przyczynę zakończenia;
- liczbę tur;
- komentarze;
- układ planszy.

### 3. ✉️ Zaproszenia do rozgrywek

- Wysyłanie zaproszeń do innych użytkowników.
- Wyświetlanie oczekujących zaproszeń.
- Akceptowanie i odrzucanie zaproszeń.
- Dodawanie zaakceptowanych uczestników do rozgrywki.
- Wyświetlanie rozgrywek, w których użytkownik uczestniczy.

### 4. 🌀 Duchy i aspekty

- Katalog duchów z grafikami.
- Wyszukiwanie duchów po nazwie.
- Szczegółowy widok wybranego ducha.
- Wyświetlanie poziomu złożoności i opisu.
- Katalog aspektów przypisanych do ducha.
- Wyświetlanie grafik i nazw kart aspektów.

### 5. 📜 Scenariusze

- Katalog scenariuszy.
- Wyszukiwanie scenariuszy po nazwie.
- Szczegółowy widok scenariusza.
- Prezentacja poziomu trudności, opisu i grafiki.

### 6. 👹 Przeciwnicy

- Katalog przeciwników dostępnych w grze.
- Wyświetlanie nazw i grafik kart przeciwników.
- Możliwość powiększenia grafiki karty w celu odczytania jej zawartości, jeśli funkcja podglądu jest dostępna w aktualnej wersji aplikacji.

### 7. 📊 Statystyki

- Zestawienia wyników rozgrywek.
- Statystyki wygranych i przegranych.
- Statystyki dotyczące wykorzystywanych duchów.

### 8. 🎨 Interfejs użytkownika

- Spójna kolorystyka oparta na odcieniach fioletu.
- Responsywne układy kart i formularzy.
- Osobny ekran główny dla użytkowników zalogowanych i niezalogowanych.
- Czytelne formularze tworzenia i edycji rozgrywek.
- Widoki katalogów i szczegółów elementów gry.
- Nawigacja pomiędzy głównymi sekcjami aplikacji.

---

## 🖼️ Interfejs aplikacji

Poniższe zrzuty ekranu przedstawiają najważniejsze widoki aplikacji Spiritland. Obrazy należy umieścić w katalogu `screenshots` w głównym folderze repozytorium.

### 🏠 Strona główna

#### Strona główna — użytkownik niezalogowany

![Strona główna dla niezalogowanego użytkownika](screenshots/home-guest.png)

#### Strona główna — użytkownik zalogowany

![Strona główna dla zalogowanego użytkownika](screenshots/home-user.png)

### 🔐 Konta użytkowników

#### Logowanie

![Ekran logowania](screenshots/login.png)

#### Rejestracja

![Ekran rejestracji](screenshots/register.png)

#### Profil użytkownika

![Profil użytkownika](screenshots/profile.png)

#### Edycja profilu

![Edycja profilu użytkownika](screenshots/profile-edit.png)

### 🎲 Rozgrywki

#### Lista rozgrywek — „Moje gry”

![Lista rozgrywek użytkownika](screenshots/games-list.png)

#### Tworzenie nowej rozgrywki

![Formularz tworzenia rozgrywki](screenshots/game-create.png)

#### Edycja rozgrywki

![Formularz edycji rozgrywki](screenshots/game-edit.png)

#### Szczegóły rozgrywki

![Szczegóły rozgrywki](screenshots/game-details.png)

### ✉️ Zaproszenia do rozgrywek

#### Lista zaproszeń

![Lista zaproszeń do rozgrywek](screenshots/invites.png)

#### Zapraszanie graczy

![Formularz zapraszania graczy](screenshots/invite-players.png)

### 📊 Statystyki

#### Statystyki użytkownika

![Statystyki użytkownika](screenshots/stats.png)

### 🌀 Duchy i aspekty

#### Katalog duchów

![Lista duchów](screenshots/Spirits.png)

#### Szczegóły ducha

![Szczegóły ducha](screenshots/S_D.png)

#### Karty aspektów ducha

![Aspekty ducha](screenshots/spirit-aspects.png)

### 📜 Scenariusze

#### Katalog scenariuszy

![Lista scenariuszy](screenshots/scenario.png)

#### Szczegóły scenariusza

![Szczegóły scenariusza](screenshots/scenario-details.png)

### ⚔️ Przeciwnicy

#### Katalog przeciwników

![Lista przeciwników](screenshots/adversaries.png)

#### Powiększony podgląd karty przeciwnika

![Powiększona karta przeciwnika](screenshots/adversary-preview.png)

### 🗄️ Baza danych

#### Diagram bazy danych

![Diagram bazy danych](screenshots/Data_base.png)

---

## 🛠️ Stos technologiczny

### Frontend

- **Angular 17**
- TypeScript
- HTML5
- SCSS
- Angular Router
- Angular Forms
- Angular HttpClient

### Backend

- **ASP.NET Core 8 Web API**
- C#
- Entity Framework Core
- JWT Authentication

### Baza danych

- **PostgreSQL**
- pgAdmin — narzędzie do zarządzania bazą danych

### Architektura

Aplikacja wykorzystuje architekturę klient–serwer. Frontend komunikuje się z backendem za pomocą żądań HTTP. Backend realizuje logikę aplikacji i obsługuje dostęp do danych za pośrednictwem Entity Framework Core.

---
## ⚙️ Wymagania

Przed uruchomieniem projektu przygotuj:

- Node.js i npm w wersjach zgodnych z projektem Angular;
- Angular CLI;
- .NET 8 SDK;
- PostgreSQL;
- pgAdmin — opcjonalnie, do zarządzania bazą danych;
- Git.

---

## 🚀 Uruchomienie projektu

### 1. Pobranie repozytorium

```bash
git clone https://github.com/WikaUlazka/SpiritLand.git
cd SpiritLand
```

### 2. Konfiguracja bazy danych

Uruchom PostgreSQL i skonfiguruj połączenie z bazą w konfiguracji backendu.

Dane dostępowe, hasła oraz klucze JWT powinny być przechowywane lokalnie, a nie w publicznym repozytorium.

### 3. Uruchomienie backendu

Przejdź do katalogu zawierającego plik `.csproj`:

```bash
dotnet restore
dotnet run
```

Jeśli backend znajduje się w osobnym katalogu, przejdź do niego przed wykonaniem poleceń.

### 4. Uruchomienie frontendu

W drugim terminalu przejdź do katalogu zawierającego `package.json`:

```bash
npm install
npx ng serve
```

### 5. Otwarcie aplikacji

W przeglądarce otwórz:

[http://localhost:4200](http://localhost:4200)

> Adres backendu i konfiguracja połączenia z bazą muszą odpowiadać lokalnemu środowisku. Powyższe polecenia zakładają, że wymagane usługi są zainstalowane i skonfigurowane.

---

## 🗄️ Baza danych

Projekt wykorzystuje PostgreSQL jako relacyjną bazę danych, a komunikacja z bazą realizowana jest za pomocą Entity Framework Core.

Baza przechowuje informacje dotyczące między innymi:

- użytkowników i ich profili;
- rozgrywek;
- uczestników rozgrywek;
- zaproszeń do rozgrywek;
- duchów i aspektów;
- scenariuszy;
- przeciwników.

Diagram bazy danych znajduje się w pliku `screenshots/Data_base.png`.

---

## 🔮 Możliwości rozwoju

Potencjalne kierunki rozwoju projektu:

- synchronizacja zmian w rozgrywkach w czasie rzeczywistym;
- rozszerzone statystyki i wykresy;
- historia aktywności użytkowników;
- powiadomienia o nowych zaproszeniach;
- filtrowanie i sortowanie historii partii;
- rozszerzone wyszukiwanie graczy i rozgrywek;
- dalsze usprawnienia interfejsu i responsywności.

---

## 👩‍💻 Autor

**Spiritland — Spirit Island Game Tracker**

Repozytorium projektu: [github.com/WikaUlazka/SpiritLand](https://github.com/WikaUlazka/SpiritLand)

---

*Projekt tworzony z myślą o graczach Spirit Island, którzy chcą wygodniej zapisywać swoje partie, organizować wspólne rozgrywki i analizować wyniki.*
