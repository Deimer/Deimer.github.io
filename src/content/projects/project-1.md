---
title: 'GAPSIStore: Modular Android E-Commerce Search App'
description: An Android product search application built with modern Clean Architecture, 6 Gradle modules, Jetpack Compose, MVI pattern, and Room offline caching, integrating Axesso's Walmart Data API via RapidAPI.
publishDate: 'Aug 11 2026'
seo:
  image:
    src: '../../assets/images/project-1.jpg'
    alt: GAPSIStore Android App Preview
---

![GAPSIStore Preview](../../assets/images/project-1.jpg)

**Project Overview:**  
**GAPSIStore** is a production-grade Android application engineered as a technical assessment for GAPSI. It allows users to query product catalogs in real-time, browse paginated e-commerce results, view structured item attributes (title, price, and high-resolution thumbnails), and maintain an offline search history with thumbnails. The project is fully compliant with modern Android execution standards for API 31+ (Android 12+), keeping all heavy parsing, network IO, and database transactions off the UI thread.

## Assessment Requirements & Solution Matrix

- **Real-Time Catalog Search:** Keyword search integrated with Axesso's Walmart API via RapidAPI, supporting true server-side pagination.
- **Rich Media Presentation:** Product display containing title, line price formatting, and thumbnail caching via Coil.
- **Persistent Search History:** Stores historical queries with thumbnail previews, remaining intact across app force-closes and device reboots.
- **Asynchronous Execution:** Reactive, non-blocking UI using Kotlin Coroutines, StateFlow, and Paging 3.

## Objectives & Core Capabilities

### Main Objective
Design and implement a scalable, high-performance, multi-module Android application that demonstrates mastery of modern Android development standards, Clean Architecture, reactive data streams, offline-first persistence, and robust API integration.

### Specific Technical & Functional Objectives

1. **Dynamic Catalog Search & Real-Time Pagination**
   - **Objective:** Enable users to query e-commerce product catalogs with seamless infinite scrolling and server-side pagination.
   - **Implementation:** Integrated Axesso’s Walmart Data Service via RapidAPI using Android’s **Paging 3** library to deliver smooth, memory-efficient list rendering without main-thread blocking.

2. **Offline-First Data Caching & Persistence**
   - **Objective:** Maintain search query histories and catalog snapshots locally to ensure data availability across app restarts and network interruptions.
   - **Implementation:** Configured a **Room Database** acting as the *Single Source of Truth*. Raw network DTOs are mapped and cached into local entities before being exposed to the UI layer.

3. **Zero-Overhead Search History Management**
   - **Objective:** Track previous query keywords while displaying representative thumbnail previews without triggering unnecessary, expensive network requests.
   - **Implementation:** Captured the first loaded product image directly from the active Paging pipeline and persisted it alongside the keyword in local storage. Managed deduplication using a `UNIQUE` index constraint on search terms (`OnConflictStrategy.REPLACE`).

4. **Robust Payload Processing & Custom Parsing**
   - **Objective:** Safely process complex, deeply nested JSON responses from third-party services without crashing or leaking unformatted raw data to presentation components.
   - **Implementation:** Built a custom Gson deserializer (`WalmartSearchResultDeserializer`) that traverses 5+ nested levels of JSON, strips out non-product entries (such as `AdPlaceholder`), and safely formats pricing attributes with fallback mechanisms.

5. **Multi-Module Clean Architecture & Modular Isolation**
   - **Objective:** Construct a highly maintainable, testable, and decoupled codebase divided into independent feature and core layers.
   - **Implementation:** Organized the application into 6 specialized Gradle modules (`:network`, `:database`, `:datasource`, `:domain`, `:design-system`, `:app`), ensuring strict dependency management and faster compilation times.

## Technical Stack

| Category | Technology & Libraries |
|---|---|
| **Language** | Kotlin 1.9+ |
| **UI Framework** | Jetpack Compose + Material 3 |
| **Navigation** | Navigation3 (Type-Safe Routes) |
| **Dependency Injection** | Hilt |
| **Networking** | Retrofit 2 + OkHttp 4 + Gson |
| **Persistence** | Room Database |
| **Pagination** | Paging 3 |
| **Image Loading** | Coil Compose |
| **Asynchronous & Reactive** | Kotlin Coroutines + Flow / StateFlow |
| **Testing** | JUnit 5, Mockito (`mockito-kotlin`), Coroutines Test, Robolectric, Paging Testing |
| **Targeting Specs** | Min SDK: 31 (Android 12) \| Compile SDK: 36 |

---

## Multi-Module Clean Architecture

The codebase strictly enforces **Clean Architecture** and separation of concerns across **6 distinct Gradle modules**, controlling dependency boundaries and reducing build compilation times.

app ──┬──> domain ──┬──> datasource ──┬──> network
      │             │                 └──> database
      └──> design-system

### Module Responsibilities

1. **`:network`**: Encapsulates OkHttp and Retrofit instances, HTTP logging interceptors, RapidAPI request headers, DTOs (`ProductDTO`, `WalmartSearchResponseDTO`), and custom JSON deserialization parsers.
2. **`:database`**: Manages the Room SQLite engine (`GAPSIStoreDatabase`), entities (`ProductEntity`, `SearchHistoryEntity`), DAOs (`ProductDao`, `SearchHistoryDao`), and internal database migrations.
3. **`:datasource`**: Declares and implements local (`ProductLocalDataSource`, `SearchHistoryLocalDataSource`) and remote (`ProductRemoteDataSource`) sources, isolating raw IO drivers from the domain layer.
4. **`:domain`**: Houses pure Kotlin business logic, domain models (`ProductModel`, `SearchHistoryModel`), mapping routines, `PagingSource` implementations, abstract repository contracts, and Use Cases (`SearchProductsUseCase`, `FetchSearchHistoryUseCase`, `SaveSearchUseCase`).
5. **`:design-system`**: Contains design tokens, color schemes, Material 3 typography, custom shapes, and reusable composables (`ProductCard`, `SearchField`, `EmptyStateWidget`, `ShimmerLoader`).
6. **`:app`**: The application assembly point. Manages Hilt application graphs, UI screens (`Splash`, `Home`), Navigation3 configurations, ViewModels, and UI state management using MVI helpers.

<pre style="white-space: pre; overflow-x: auto; font-family: monospace; font-size: 0.85rem; line-height: 1.4;">
com.deymervilla.gapsistore
├── network/                  # :network module
│   ├── api/                  # ApiService (Retrofit interfaces)
│   ├── constants/            # Endpoints, headers, JSON path keys
│   ├── di/                   # ApiModule (Hilt DI)
│   ├── dto/                  # ProductDTO, WalmartSearchResponseDTO
│   └── parser/               # WalmartSearchResultDeserializer
├── database/                 # :database module
│   ├── constants/            # Database, table, and column definitions
│   ├── dao/                  # ProductDao, SearchHistoryDao
│   ├── di/                   # RoomModule (Hilt DI)
│   └── entities/             # ProductEntity, SearchHistoryEntity
├── datasource/               # :datasource module
│   ├── local/                # ProductLocalDataSource, SearchHistoryLocalDataSource
│   ├── remote/               # ProductRemoteDataSource
│   └── di/                   # DataSourceModule (Hilt DI)
├── domain/                   # :domain module
│   ├── models/               # ProductModel, SearchHistoryModel
│   ├── mappers/              # DTO-Entity-Model mapping extensions
│   ├── paging/               # ProductPagingSource
│   ├── repositories/         # Repository contracts & implementations
│   ├── usecase/              # SaveSearchUseCase, SearchProductsUseCase, etc.
│   └── di/                   # RepositoryModule (Hilt DI)
├── design-system/            # :design-system module
│   ├── theme/                # Typography, Color, Theme schemes
│   └── components/           # ProductCard, SearchField, Shimmer UI
└── app/                      # :app module
    ├── features/             # Splash & Home UI feature flows
    ├── navigation/           # Navigation3 AppRoutes & AppNavigation
    ├── di/                   # DispatcherModule (Coroutine dispatchers)
    ├── utils/                # FlowExtensions & MVI state extensions
    ├── application/          # GAPSIStoreApplication
    └── main/                 # MainActivity
</pre>

---

## Data Flow & Single Source of Truth

The app mandates that raw network objects never leak into presentation components. All data undergoes mapping through intermediate data layers.

+------------------+         +------------------+         +------------------+
|   Axesso API     |  --->   |   ProductDTO     |  --->   |  Walmart Custom  |
|   (JSON Payload) |         |  (Network Layer) |         |   Deserializer   |
+------------------+         +------------------+         +------------------+
|
v
+------------------+         +------------------+         +------------------+
|  ProductModel    |  <---   |  ProductEntity   |  <---   |   Room Database  |
|   (UI / Domain)  |         | (Database Layer) |         | (Single Source)  |
+------------------+         +------------------+         +------------------+

---

## Key Technical & Architectural Decisions

### 1. Complex JSON Parsing (5+ Nested Levels)
Axesso's payload places search items deep within nested objects (`item.props.pageProps.initialData.searchResult.itemStacks[0].items[]`) and includes structural placeholders (such as `AdPlaceholder` banners). 
- A custom Gson deserializer (`WalmartSearchResultDeserializer`) manually navigates the JSON object tree, filters out non-product items matching `__typename == "Product"`, and extracts display prices from `priceInfo.linePriceDisplay` with a fallback to `price`.
- Because Gson's default behavior ignores custom adapters when bound to raw collections (`List<T>`), payload structures are explicitly wrapped inside a concrete container DTO (`WalmartSearchResponseDTO`).

### 2. Zero-Overhead Search History Thumbnails
Rather than sending secondary API queries to obtain a thumbnail image for every newly saved search keyword:
- The UI layer (`HomeScreenCompose`) monitors the `LazyPagingItems` collector.
- As soon as **Paging 3** resolves the first valid `ProductModel`, the UI emits an `onFirstResultLoaded` MVI event to the `ViewModel`.
- The `ViewModel` invokes `SaveSearchUseCase`, storing the query keyword alongside the thumbnail URL in Room.
- Deduplication is guaranteed at the database level via a `UNIQUE` index constraint on `keyword` (`OnConflictStrategy.REPLACE`), updating the query timestamp when a term is searched again.

### 3. Paging Architecture
`SearchProductsUseCase` provides a `Flow<PagingData<ProductModel>>` backed by a `Pager` with `pageSize = 40`. The underlying `ProductPagingSource` directly fetches pages from the API, converts response DTOs into `ProductEntity` instances, persists them into Room during `load()`, and emits converted `ProductModel` instances to the UI.

### 4. Controlled Error Boundaries
Operations inside the `:domain` layer encapsulate asynchronous results inside `Flow<Result<T>>`. This pattern allows the presentation layer to render appropriate MVI UI states (e.g., `Idle`, `Loading`, `Success`, `Error`) without catching raw exceptions in the UI thread.

### 5. API Credential Security
API keys are kept out of git history using the `secrets-gradle-plugin`. Production keys are supplied through `local.properties`:

```properties
RAPIDAPI_KEY=your_rapidapi_key_here
