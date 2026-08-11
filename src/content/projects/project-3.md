---
title: 'FakeStore App: Offline-First E-Commerce Architecture'
description: A modern Android e-commerce application built with Clean Architecture, MVI pattern, Jetpack Compose, Room persistence as Single Source of Truth, and Hilt DI.
publishDate: 'Nov 14 2023'
isFeatured: true
seo:
  image:
    src: '../../assets/images/project-3.jpg'
    alt: FakeStore Android App Preview
---

![FakeStore App](../../assets/images/project-3.jpg)

**Project Overview:**  
**FakeStore App** is a production-ready Android application consuming the [Fake Store API](https://fakestoreapi.com). Built as a technical assessment showcasing contemporary Android engineering standards, it delivers an offline-first e-commerce catalog experience, instant reactive updates, robust error boundaries, dynamic product search, and persistent favorites tracking.

---

## Video Showcase

![FakeStore App Interaction](https://github.com/user-attachments/assets/820198a2-2934-42c3-b841-3dc914f3001c)

---

## Technical Stack & Engineering Highlights

| Category | Technology & Libraries |
|---|---|
| **Language** | Kotlin 1.9+ |
| **UI Framework** | Jetpack Compose + Material Design 3 |
| **Architecture** | Clean Architecture + MVI (Model-View-Intent) |
| **Dependency Injection** | Hilt |
| **Persistence** | Room Database (*Single Source of Truth*) |
| **Networking** | Retrofit 2 + OkHttp (Centralized Interceptors) |
| **Image Loading** | Coil Compose (Efficient HTTP & disk caching) |
| **Asynchronous Stream** | Kotlin Coroutines + Flow / StateFlow |
| **Dependency Management** | Gradle Version Catalog (`libs.versions.toml`) |
| **Minimum Requirements** | Android SDK 34 \| JDK 17 |

---

## Architectural Decisions & Core Design Patterns

### 1. Model-View-Intent (MVI) Pattern
Every feature screen enforces a strict unidirectional data flow. UI state transitions are fully predictable, immutable, and easily testable:

<pre style="white-space: pre; font-family: monospace; font-size: 0.85rem; line-height: 1.4; overflow-x: auto; background: #0d1117; color: #e6edf3; padding: 1rem; border: 1px solid #30363d; border-radius: 8px;">
UI (Compose) ──> ViewModel (MVI) ──> UseCase ──> Repository ──> Local/Remote DS
     ^                                                             │
     └──────────────────────── Room Database <─────────────────────┘
                       (Single Source of Truth)
</pre>

### 2. Single Source of Truth (Offline-First)
The repository acts as an arbitrator: it surfaces local data instantly from **Room Database** when available and fetches updates from the remote Retrofit API asynchronously. Raw payload DTOs are cached as local entities before being converted into domain models.

### 3. Comprehensive State Management
All presentation components gracefully render distinct MVI states: `Loading`, `Content`, and `Error` with retry actions, guaranteeing seamless recovery during bad network coverage or missing backend data.

---

## Key Functional Capabilities

1. **Catalog Exploration & Real-Time Search:**
   - Rapid querying and real-time filtering of catalog products by title and category.

2. **Persistent Favorites & User Profile:**
   - Dynamic bookmarking of products persisted in local Room database.
   - User profile dashboard displaying real-time aggregated counters of saved items.

3. **Isolated Domain & Mapping Layers:**
   - Strict mapping protocols preventing network DTOs or database entities from leaking into presentation views (`DTO -> Entity -> Domain Model`).

---

## Data Flow & Layer Interaction

<pre style="white-space: pre; font-family: monospace; font-size: 0.8rem; line-height: 1.3; overflow-x: auto; background: #0d1117; color: #e6edf3; padding: 1rem; border: 1px solid #30363d; border-radius: 8px;">
+------------------+         +------------------+         +------------------+
|   Fake Store API |  --->   |    ProductDTO    |  --->   |  RemoteDataSource|
|   (REST Endpoint)|         | (Network Layer)  |         | (Retrofit Engine)|
+------------------+         +------------------+         +------------------+
                                                                   |
                                                                   v
+------------------+         +------------------+         +------------------+
|   ProductModel   |  <---   |  ProductEntity   |  <---   |   Room Database  |
|   (UI / Domain)  |         | (Database Layer) |         | (Local Source)   |
+------------------+         +------------------+         +------------------+
</pre>

---

## Project Structure Layout

<pre style="white-space: pre; font-family: monospace; font-size: 0.8rem; line-height: 1.35; overflow-x: auto; background: #0d1117; color: #e6edf3; padding: 1rem; border: 1px solid #30363d; border-radius: 8px;">
app/
├── data/
│   ├── database/        # Room: Database, DAOs, Entities
│   ├── datasource/      # Local and Remote DataSource implementations
│   └── network/         # Retrofit: ApiService, DTOs
├── domain/
│   ├── di/              # Hilt modules for domain dependencies
│   ├── mappers/         # Layer transformations (DTO -> Entity -> Model)
│   ├── models/          # Core business models
│   ├── repositories/    # Repository contracts and implementations
│   ├── usecases/        # Isolated business logic use cases
│   └── utils/           # Domain extensions & helper utilities
└── ui/
    ├── di/              # DispatcherModule, Coroutine Dispatcher Qualifiers
    ├── features/
    │   ├── alerts/      # Dialogs, snackbars & error boundary components
    │   ├── home/        # Main product list screen
    │   ├── product/     # Detailed product view
    │   ├── profile/     # User profile & favorites counter dashboard
    │   └── splash/      # Initial onboarding/splash screen
    ├── main/            # MainActivity entry point
    ├── navigation/      # AppNavigation & type-safe AppRoutes
    ├── presentation/
    │   ├── components/  # Reusable Compose widgets
    │   └── theme/       # Color palettes, typography & Material 3 schemes
    └── utils/           # UI helper functions & FlowExtensions
</pre>

---

## Automated Testing Strategy

The repository includes comprehensive test suites covering unit and instrumented integration tests:

```bash
# Execute local unit tests across Network, Local, Repository, and UseCases
./gradlew test

# Execute instrumented Room Database DAO tests on an Android Emulator
./gradlew connectedAndroidTest