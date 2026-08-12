---
title: 'InterData: Android Multi-Module & Version Sync Engine'
description: A high-performance, multi-module Android application developed for Interrapidisimo, featuring dynamic API version controls, SQLite Room sync, and localized database schemas.
publishDate: 'Dec 28 2023'
seo:
  image:
    src: '../../assets/images/project-6.jpg'
    alt: InterData Android Application Preview
---

![InterData preview](../../assets/images/project-6.jpg)

**Project Overview:**  
**InterData** is a modular enterprise Android application engineered as a technical assessment for **Interrapidisimo**. The application acts as a security, framework parameters, and localized data synchronization manager. It validates user authentication, executes real-time semantic app version comparisons against remote API constraints, and synchronizes dynamic database schemas and localities into a local **Room SQLite** storage engine to guarantee high offline availability.

---

## Technical Stack & Library Matrix

| Strategic Area | Applied Technologies |
|---|---|
| **Language** | Kotlin 1.9+ |
| **UI Framework** | Jetpack Compose + Material Design 3 |
| **Architecture** | Multi-Module Clean Architecture + MVVM + Repository Pattern |
| **Dependency Injection** | Hilt |
| **Persistence** | Room Database (SQLite Entity & Schema Mapping) |
| **Networking** | Retrofit 2 + OkHttp (Custom Headers & Payload Interceptors) |
| **Asynchronous Stream** | Kotlin Coroutines + Flow / StateFlow |
| **Layout Optimization** | Compose Intrinsic Measurements (`IntrinsicSize.Max`) |

---

## Multi-Module Dependency Architecture

To ensure strict separation of concerns, rapid incremental compilation, and modular reuse, the project is physically separated into independent Gradle modules:

<pre style="white-space: pre; font-family: monospace; font-size: 0.85rem; line-height: 1.4; overflow-x: auto; background: #0d1117; color: #e6edf3; padding: 1rem; border: 1px solid #30363d; border-radius: 8px;">
app ──> presentation ──> usecase ──> repository ──┬──> datasource ──> network
                                                  └──> database
</pre>

### Module Dependencies Representation (`build.gradle.kts`)

Unlike monolithic applications, module isolation is strictly governed at the compilation layer:

```kotlin
// Inside :presentation module build.gradle.kts
dependencies {
    implementation(project(":usecase"))
}

// Inside :repository module build.gradle.kts
dependencies {
    implementation(project(":datasource"))
    implementation(project(":network"))
    implementation(project(":database"))
}

## GitFlow Strategy & Workflow Management

To ensure a structured, traceable, and conflict-free development process, the project strictly adopted the **GitFlow** methodology. This strategy allowed complete isolation between in-progress feature development and stable production releases, optimizing the lifecycle of every single feature and bugfix.

---

### Branching Strategy Architecture

<pre style="white-space: pre; font-family: monospace; font-size: 0.85rem; line-height: 1.4; overflow-x: auto; background: #0d1117; color: #e6edf3; padding: 1rem; border: 1px solid #30363d; border-radius: 8px;">
main (Production / Stable Releases)
  ▲
  │ (Pull Requests via CI/CD Pipelines)
  │
develop (Continuous Feature Integration)
  ▲
  ├─► feat/ITD-015-create-splash-screen
  ├─► feat/ITD-016-create-login-screen
  ├─► feat/ITD-020-create-unit-tests
  └─► fix/ITD-023-update-hilt-version
</pre>

---

### Key Workflow Benefits

1. **Standardized Naming & Issue Tracking Integration:**
   - Every feature or patch was developed on dedicated atomic branches labeled with their corresponding ticket ID (`feat/ITD-XXX` for features, `fix/ITD-XXX` for bugfixes).
   - Provided 1:1 traceability between source code, GitHub Pull Requests, and project management tasks.

2. **Modular & Layer Isolation:**
   - The multi-module project architecture was directly mirrored in the Git workflow. Each module and layer (`presentation`, `usecase`, `repository`, `database`, `network`) had isolated development branches (e.g., `feat/ITD-008-setup-database-module`, `feat/ITD-011-implement-usecase-layer`).
   - Prevented code collisions and drastically reduced merge conflicts during layer integration.

3. **Mandatory Code Reviews & Pull Requests:**
   - Direct commits to `main` or `develop` were restricted. Every code increment was integrated exclusively via individual **Pull Requests (#PRs)**, enforcing peer code reviews, automated unit testing, and **CI/CD** execution (`feat/ITD-021-implement-cd-and-ci`).

4. **Production Stability (`main` vs `develop`):**
   - The `main` branch remained pristine, representing production-ready releases at all times.
   - The `develop` branch acted as the central integration bus for incremental feature merging, ensuring incomplete work never degraded release stability.