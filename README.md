# 🌋 Spirit Island Score Tracker

Aplikacja webowa do zapisywania, przeglądania i współdzielenia wyników z gry planszowej **Spirit Island**.  
Projekt składa się z frontendowej aplikacji **Angular**, backendu **ASP.NET Core Web API** oraz bazy danych **PostgreSQL**.

---

## 📑 Spis treści

1. [Opis projektu](#opis-projektu)
2. [Funkcje](#funkcje)
3. [Stos technologiczny](#stos-technologiczny)
4. [Screeny aplikacji](#screeny-aplikacji)

---

## 📘 Opis projektu

**Spirit Island Score Tracker** to aplikacja wspierająca graczy Spirit Island w rejestrowaniu i przeglądaniu ich rozgrywek.  
Umożliwia:

- zapisywanie szczegółów każdej partii,
- przegląd historii gier,
- współdzielenie partii oraz zapraszanie innych użytkowników,
- zarządzanie duchami, aspektami, scenariuszami i przeciwnikami.

Aplikacja może działać jako narzędzie indywidualne lub społecznościowe, z możliwością dalszej rozbudowy.

---

## 🎮 Funkcje

### **1️⃣ Konta użytkowników**

- Rejestracja i logowanie (JWT / Identity)
- Profil użytkownika: nazwa, ulubiony duch i aspekt, data rejestracji
- Edycja profilu i zmiana hasła

### **2️⃣ Interakcje użytkowników**

- Wyszukiwanie użytkowników po nazwie
- Podgląd profilu oraz ostatnich rozgrywek

### **3️⃣ Duchy i aspekty**

- Lista duchów z opisami i poziomem złożoności
- Lista aspektów przypisanych do każdego ducha
- Możliwość ustawienia ulubionego ducha

### **4️⃣ Przeciwnicy**

- Lista przeciwników z poziomami trudności i opisami

### **5️⃣ Scenariusze i tryby gry**

- Lista scenariuszy (np. Blitz, The Great River)

### **6️⃣ Tworzenie i współdzielenie partii**

- Tworzenie nowej partii i zapraszanie graczy
- Wspólna edycja wpisów o rozgrywce
- Zaproszenia do udziału w partii

### **7️⃣ Szczegóły rozgrywki**

Każda partia zawiera:

- datę rozegrania
- listę graczy
- ducha i aspekt każdego gracza
- przeciwnika i poziom trudności
- scenariusz (jeśli użyty)
- stan wyspy (zarażona / normalna)
- wynik (wygrana / przegrana)
- powód zakończenia (Fear Victory, Blight Loss itp.)
- liczbę tur, komentarze oraz układ planszy

---

## 🛠️ Stos technologiczny

### **Frontend**

- Angular 17
- TypeScript
- SCSS
- Angular Router
- JWT Authentication
- Reactive Forms

### **Backend**

- ASP.NET Core 8 (Web API)
- Entity Framework Core
- JWT Authentication
- Clean Controller Structure

### **Baza danych**

- PostgreSQL
- pgAdmin

---

## 🖼️ Screeny aplikacji

### 📊 Diagram bazy danych

![Database diagram](screenshots/Data_base.png)

### 🌀 Pogląd duchów

![Duchy](screenshots/Spirits.png)

### 🔍 Szczegóły ducha

![Duch](screenshots/S_D.png)

### 📜 Pogląd scenariuszy

![Scenariusze](screenshots/scenario.png)

### ⚔ Pogląd przeciwników

![Przeciwnicy](screenshots/adversaries.png)

---
