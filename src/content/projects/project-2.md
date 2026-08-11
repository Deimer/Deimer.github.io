---
title: 'Country Explorer: Android Live Coding Challenge & MVI Architecture'
description: A practical technical assessment implementing a detailed country exploration screen using Jetpack Compose, MVI architecture, Navigation Compose, Google Maps SDK, and REST Countries API.
publishDate: 'Jun 15 2026'
isFeatured: true
seo:
  image:
    src: '../../assets/images/project-2.jpg'
    alt: Country Explorer Android App Preview
---

![Country Explorer](../../assets/images/project-2.jpg)

**Project Overview:**  
**Country Explorer** is an Android live coding challenge focused on extending a base codebase to build a robust, real-time Country Detail feature. The project consumes the public [REST Countries API](https://restcountries.com/) to fetch global country data, presenting complex attributes, interactive maps, and offline fallback states using modern Android execution standards and Jetpack Compose.

---

## Objectives & Evaluation Criteria

### Main Objective
Complete a 1-hour live coding technical assessment by connecting existing catalog screens to an MVI-driven **Country Detail Screen**, demonstrating clean code practices, reactive state management, and type-safe UI navigation.

### Assessment Weight Matrix

| Evaluation Criteria | Weight | Focus Areas |
|---|---|---|
| **MVI Architecture** | High | Unidirectional data flow (`State`, `Intent`, single `StateFlow` emitter) |
| **Code Quality & Legibility** | High | Clean separation, proper naming conventions, immutability |
| **Jetpack Compose Mastery** | High | Declarative UI structure, efficient re-composition, Material 3 components |
| **State Handling** | High | Seamless handling of `Loading`, `Error`, and `Success` UI states |
| **Separation of Concerns** | Medium | Isolating data layers from UI components and ViewModel logic |
| **Navigation & Data Passing** | Medium | Passing arguments across Navigation Compose routes while preserving list filters |
| **Edge Cases & Nullability** | Medium | Safe parsing of missing JSON attributes, empty lists, and null coordinates |

---

## Technical Stack & Available Tooling

- **Language:** Kotlin 1.9+
- **UI Framework:** Jetpack Compose + Material Design 3
- **Asynchronous Data:** Kotlin Coroutines + Flow / StateFlow
- **Networking:** Retrofit 2 + OkHttp + Gson
- **Navigation:** Navigation Compose
- **Maps Integration:** Google Maps Compose SDK
- **Image Loading:** Coil Compose
- **Data Source:** [REST Countries API v3.1](https://restcountries.com/)

---

## MVI (Model-View-Intent) Architecture

The Detail screen strictly enforces the **MVI pattern** via `CountryDetailContract.kt` to ensure predictable, single-direction data flow and clear UI state transformations.

<pre style="white-space: pre; font-family: monospace; font-size: 0.85rem; line-height: 1.4; overflow-x: auto; background: #0d1117; color: #e6edf3; padding: 1rem; border: 1px solid #30363d; border-radius: 8px;">
         +-------------------------------------------------+
         |                                                 |
         v                                                 |
  +--------------+         +--------------+         +--------------+
  |  UI View     |  -----> |    Intent    |  -----> |  ViewModel   |
  |  (Compose)   |         | (User Event) |         | (MVI Engine) |
  +--------------+         +--------------+         +--------------+
         ^                                                 |
         |                   +---------+                   |
         +------------------ |  State  | <-----------------+
                             +---------+
</pre>

### Contract Components

1. **State:** Immutable data class representing the whole screen UI (`isLoading`, `countryDetail`, `errorMessage`).
2. **Intent:** Sealed class capturing user interactions (e.g., `LoadCountryDetail`, `RetryFetch`, `OnBackClicked`).
3. **ViewModel:** Processes incoming `Intent` events, executes asynchronous network requests via Coroutines, and exposes a single `StateFlow<CountryDetailState>`.

---

## Technical Features Implemented

1. **Interactive Country Detail View:**
   - **Google Maps Integration:** Displays a MapView centered on the target country's latitudinal/longitudinal coordinates with a custom position marker.
   - **Rich Attribute Display:** Renders official/common names, flag preview, capital city, region/subregion, formatted population numbers, surface area ($\text{km}^2$), active currencies, official languages, and timezones.
   - **Bordering Countries:** Interactive list highlighting neighboring countries with direct navigation support.

2. **Type-Safe Navigation & State Retention:**
   - Connects the main catalog list to the detail view using **Navigation Compose**.
   - Retains active search queries and regional filter selections when navigating back to the list screen.

3. **Controlled Error Boundaries & Edge Cases:**
   - Displays dedicated `Loading` shimmer components during async network fetching.
   - Integrated `Error` UI states with retry triggers for weak connections or missing API payloads.
   - Safe nullability wrappers for countries with missing capitals, coordinates, or currencies.

---

## Project Structure & Flow

<pre style="white-space: pre; font-family: monospace; font-size: 0.8rem; line-height: 1.35; overflow-x: auto; background: #0d1117; color: #e6edf3; padding: 1rem; border: 1px solid #30363d; border-radius: 8px;">
com.deymervilla.countryexplorer
├── data/
│   ├── api/                  # RestCountriesApiService (Retrofit)
│   ├── dto/                  # CountryDTO, CurrencyDTO, LanguageDTO
│   └── repository/           # CountryRepositoryImpl
├── domain/
│   ├── model/                # CountryDomainModel
│   └── mapper/               # CountryMapper extensions
├── presentation/
│   ├── welcome/              # WelcomeScreen Compose
│   ├── list/                 # CountryListScreen & SearchFilters
│   └── detail/               # CountryDetailScreen (MVI)
│       ├── CountryDetailContract.kt   # State, Intent & SideEffects
│       ├── CountryDetailViewModel.kt  # MVI ViewModel
│       └── components/       # CountryMapView, FlagHeader, InfoChips
└── navigation/               # AppNavigation & Route Destinations
</pre>

---

## Key Achievements & Added Value (Extras)

- **Domain Model Separation:** Separated raw API DTOs from UI domain models to isolate data parsing logic.
- **Bug Fixes in Base Code:** Identified and resolved state persistence glitches present in the initial template codebase.
- **Dependency Injection Readiness:** Structured repository and ViewModel contracts to allow instant integration with Hilt or Koin.
- **Compose UI Polish:** Added smooth entrance transitions between list elements and the country detail view.