---
title: 'iBank: Secure Mobile Banking App'
description: A comprehensive, multi-module Android banking application built as a technical assessment for Stori, featuring Clean Architecture, MVVM, Room persistence, Jetpack Compose, and bi-directional internationalization.
publishDate: 'Jan 10 2026'
isFeatured: true
seo:
  image:
    src: '../../assets/images/project-7.jpg'
    alt: iBank Android Mobile Application Preview
---

![iBank preview](../../assets/images/project-7.jpg)

**Project Overview:**  
**iBank** is a high-security, feature-rich Android mobile banking application engineered as a technical assessment for **Stori**. Built using modern Android execution standards, multi-module Clean Architecture, and MVVM, the platform supports complete user onboarding (including identity photo capture), secure authentication, real-time balance tracking, transaction histories, instant balance recharges, and peer-to-peer transfers to friends.

---

## Technical Stack & Engineering Highlights

| Category | Technology & Libraries |
|---|---|
| **Language** | Kotlin 1.9+ |
| **UI Framework** | Jetpack Compose (Material Design 3) |
| **Architecture** | Clean Architecture + MVVM Pattern |
| **Dependency Injection** | Hilt |
| **Persistence** | Room Database (*Single Source of Truth*) |
| **Networking** | Retrofit 2 + OkHttp Interceptors |
| **Asynchronous Stream** | Kotlin Coroutines + Flow / StateFlow |
| **Internationalization** | Multi-language Support (English & Spanish) |
| **CI/CD Integration** | Automated Build & Test Pipelines |
| **Backend Integration** | Firebase Services |

---

## Architecture & Modular Isolation

The application strictly adheres to **Clean Architecture** and **SOLID principles** (particularly the Single Responsibility Principle). Code components are organized across specialized modules to ensure high testability and scalability:

<pre style="white-space: pre; font-family: monospace; font-size: 0.85rem; line-height: 1.4; overflow-x: auto; background: #0d1117; color: #e6edf3; padding: 1rem; border: 1px solid #30363d; border-radius: 8px;">
presentation (Compose UI) ──> usecase ──> repository ──┬──> datasource ──> network
                                                       └──> database
</pre>

### Core Modules

1. **`app`**: Application entry point, Hilt dependency graph initialization, and global navigation hosts.
2. **`network`**: Retrofit configuration, HTTP logging interceptors, REST endpoints, and network payloads.
3. **`database`**: Room engine setup, DAOs, localized user entities, and secure transaction logs.
4. **`datasource`**: Concrete implementations isolating local SQLite access and remote server requests.
5. **`repository`**: Data repository implementations managing local caching and remote sync strategies.
6. **`usecase`**: Pure Kotlin business logic encapsulating banking rules (e.g., balance validation, transfer execution).
7. **`presentation`**: UI themes, design tokens, color palettes, localized strings (i18n), and Compose UI components.

---

## Key Functional Capabilities

1. **Streamlined Onboarding & KYC Capture:**
   - Account creation flow collecting personal identity data with integrated camera capture for photo verification.

2. **Session-Aware Authentication:**
   - Auto-routing splash screen directing active sessions straight to the home dashboard or enforcing secure login.

3. **Financial Movements & Account Balance:**
   - Real-time balance calculations, detailed ledger transaction history, and detailed receipt views.

4. **Instant Balance Recharges & P2P Transfers:**
   - Direct balance top-ups and peer-to-peer money transfers to friends with validation rules and instant confirmation screens.

5. **Type-Safe Compose Navigation & Decoupled State:**
   - Screens receive immutable data classes for navigation parameters, isolating individual composables from `NavHostController` instances.

6. **Full Internationalization (i18n):**
   - Seamless native translation support for both **English** and **Spanish**, automatically adapting to system settings.

---

## Project Structure Layout

<pre style="white-space: pre; font-family: monospace; font-size: 0.8rem; line-height: 1.35; overflow-x: auto; background: #0d1117; color: #e6edf3; padding: 1rem; border: 1px solid #30363d; border-radius: 8px;">
iBank/
├── app/          # Application setup, Hilt graph & Main Activity
├── network/      # Retrofit services, HTTP interceptors & DTOs
├── database/     # Room configuration, DAOs & Entities
├── datasource/   # Remote and Local Data Source implementations
├── repository/   # Repository contracts & data arbitrators
├── usecase/      # Isolated financial business logic
├── presentation/ # Jetpack Compose UI, Themes, i18n resources & navigation
└── build.gradle  # Root Gradle dependency configuration
</pre>

---

## Testing Strategy & Quality Assurance

The codebase includes test suites designed to safeguard critical business transactions:

```bash
# Execute local unit tests across UseCases, Repositories, and ViewModels
./gradlew test

# Execute instrumented UI and Room Database integration tests
./gradlew connectedAndroidTest