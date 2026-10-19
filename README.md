# 🌋 Spiritland — Spirit Island Game Tracker

Aplikacja webowa do rejestrowania, przeglądania i współdzielenia rozgrywek w grze planszowej **Spirit Island**. Spiritland łączy historię partii, statystyki graczy, profile użytkowników oraz bazę wiedzy o duchach, aspektach, scenariuszach i przeciwnikach.

Projekt składa się z aplikacji frontendowej napisanej w Angularze, backendu opartego na ASP.NET Core Web API oraz relacyjnej bazy danych PostgreSQL.

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

---

## 📘 Opis projektu

**Spiritland** to aplikacja wspierająca graczy *Spirit Island* w organizowaniu i analizowaniu rozgrywek.

Użytkownicy mogą tworzyć historię swoich partii, zapisywać ich przebieg, wybierać wykorzystane duchy i aspekty oraz sprawdzać wcześniejsze wyniki. Aplikacja umożliwia również zapraszanie innych użytkowników do rozgrywek.

Oprócz funkcji związanych z historią gier Spiritland udostępnia katalog elementów gry planszowej, dzięki czemu można szybko sprawdzić informacje o duchach, ich aspektach, scenariuszach i przeciwnikach.

## 🎮 Funkcjonalności

### 1. 🔐 Konta użytkowników

- Rejestracja i logowanie.
- Uwierzytelnianie za pomocą tokenów JWT.
- Wyświetlanie profilu użytkownika.
- Edycja danych profilu.
- Wybór ulubionego ducha i aspektu.

### 2. 🎲 Zarządzanie rozgrywkami

- Tworzenie nowych partii.
- Przeglądanie listy rozgrywek.
- Wyświetlanie szczegółów zapisanej partii.
- Edycja i usuwanie rozgrywek.
- Zapisywanie informacji o przebiegu i rezultacie gry.

Każda rozgrywka może zawierać:

- datę rozegrania;
- listę graczy;
- ducha i aspekt przypisany do gracza;
- wybranego przeciwnika i poziom trudności;
- wykorzystany scenariusz;
- informację o stanie wyspy;
- wynik rozgrywki — wygraną lub przegraną;
- powód zakończenia partii;
- liczbę tur;
- komentarze i dodatkowe informacje;
- układ planszy.

### 3. ✉️ Zaproszenia do rozgrywek

- Wysyłanie zaproszeń do innych użytkowników.
- Przeglądanie oczekujących zaproszeń.
- Akceptowanie i odrzucanie zaproszeń.
- Dodawanie zaakceptowanych uczestników do rozgrywki.
- Wyświetlanie rozgrywek, w których użytkownik uczestniczy.

### 4. 🌀 Duchy i aspekty

- Katalog duchów dostępnych w grze.
- Wyszukiwanie duchów po nazwie.
- Szczegółowy widok ducha.
- Wyświetlanie poziomu złożoności i opisu ducha.
- Lista aspektów przypisanych do konkretnego ducha.
- Podgląd grafik duchów i kart aspektów.

### 5. 📜 Scenariusze

- Przeglądanie dostępnych scenariuszy.
- Wyszukiwanie scenariuszy po nazwie.
- Wyświetlanie szczegółowych opisów i poziomów trudności.
- Podgląd grafik scenariuszy.

### 6. 👹 Przeciwnicy

- Katalog przeciwników.
- Wyświetlanie grafik i nazw przeciwników.
- Możliwość powiększenia grafiki, aby łatwiej odczytać informacje znajdujące się na karcie, jeśli funkcja podglądu jest dostępna w aktualnej wersji aplikacji.

### 7. 📊 Statystyki

- Zestawienia dotyczące rozegranych partii.
- Statystyki wygranych i przegranych.
- Analiza wyników związanych z wykorzystywanymi duchami.

### 8. 🎨 Interfejs użytkownika

- Spójny wygląd oparty na fioletowej kolorystyce.
- Responsywne układy kart i formularzy.
- Osobny ekran główny dla użytkowników zalogowanych i niezalogowanych.
- Formularze tworzenia i edycji rozgrywek oraz profilu.
- Czytelne widoki katalogów i szczegółów elementów gry.

---

## 🖼️ Interfejs aplikacji

Poniższe zrzuty ekranu przedstawiają wybrane elementy aplikacji.

### 📊 Diagram bazy danych

![Diagram bazy danych](screenshots/Data_base.png)

### 🌀 Katalog duchów

![Lista duchów](screenshots/Spirits.png)

### 🔍 Szczegóły ducha i aspekty

![Szczegóły ducha](screenshots/S_D.png)

### 📜 Katalog scenariuszy

![Lista scenariuszy](screenshots/scenario.png)

### ⚔️ Katalog przeciwników

![Lista przeciwników](screenshots/adversaries.png)

> Zrzuty ekranu powinny znajdować się w katalogu `screenshots` w repozytorium.

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

Aplikacja wykorzystuje architekturę klient–serwer. Frontend komunikuje się z backendem za pomocą żądań HTTP, a backend obsługuje logikę aplikacji i dostęp do danych przez Entity Framework Core.

---

## 📁 Struktura projektu

Główne elementy rozwiązania:

```text
SpiritLand/
├── screenshots/
│   ├── Data_base.png
│   ├── Spirits.png
│   ├── S_D.png
│   ├── scenario.png
│   └── adversaries.png
├── src/
│   └── app/
│       ├── auth/
│       ├── game-invites/
│       ├── games/
│       │   ├── game-details/
│       │   ├── game-form/
│       │   └── game-list/
│       ├── home/
│       ├── scenarios/
│       ├── services/
│       └── ...
└── README.md
```

> Struktura jest poglądowa i przedstawia najważniejsze obszary aplikacji Angular. Backend ASP.NET Core stanowi osobną część rozwiązania.

---

## ⚙️ Wymagania

Przed uruchomieniem projektu przygotuj:

- Node.js i npm w wersjach zgodnych z używaną wersją Angulara.
- Angular CLI.
- .NET 8 SDK.
- PostgreSQL.
- Dostęp do plików źródłowych projektu.

## 🚀 Uruchomienie projektu

### 1. Pobranie repozytorium

```bash
git clone https://github.com/WikaUlazka/SpiritLand.git
cd SpiritLand
```

### 2. Uruchomienie backendu

Przejdź do katalogu zawierającego plik projektu `.csproj`:

```bash
cd <katalog-backendu>
dotnet restore
dotnet run
```

Przed uruchomieniem upewnij się, że PostgreSQL działa, a konfiguracja połączenia z bazą danych jest prawidłowa.

### 3. Uruchomienie frontendu

W osobnym terminalu przejdź do katalogu zawierającego `package.json`:

```bash
npm install
ng serve
```

Następnie otwórz w przeglądarce:

**http://localhost:4200**

> Ścieżki do katalogów backendu i frontendu należy dopasować do rzeczywistej struktury repozytorium. Wartości połączenia z bazą danych oraz klucze JWT powinny być konfigurowane lokalnie i nie powinny być umieszczane w publicznym repozytorium.

---

## 🗄️ Baza danych

Projekt korzysta z PostgreSQL jako relacyjnej bazy danych. Dostęp do danych realizowany jest za pomocą Entity Framework Core.

Baza przechowuje między innymi informacje o:

- użytkownikach;
- rozgrywkach;
- uczestnikach rozgrywek;
- zaproszeniach;
- duchach i aspektach;
- scenariuszach;
- przeciwnikach.

Diagram bazy danych znajduje się w pliku `screenshots/Data_base.png`.

---

## 🔮 Możliwości rozwoju

Projekt można dalej rozwijać o:

- synchronizację zmian w rozgrywce w czasie rzeczywistym;
- rozbudowane statystyki i wykresy;
- historię aktywności użytkowników;
- powiadomienia o nowych zaproszeniach;
- filtrowanie i sortowanie historii partii;
- rozszerzone wyszukiwanie graczy i rozgrywek.

---

## 👩‍💻 Autor

Projekt **Spiritland — Spirit Island Game Tracker**.

Repozytorium: [github.com/WikaUlazka/SpiritLand](https://github.com/WikaUlazka/SpiritLand)

---

*Projekt tworzony z myślą o graczach Spirit Island, którzy chcą wygodniej zapisywać swoje partie i analizować rozgrywki.*
