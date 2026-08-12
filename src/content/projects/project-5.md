---
title: 'Multi-Module Activity Navigation: Circular Dependency Decoupling'
description: An architectural sample demonstrating cross-module navigation between decoupled Android feature modules using explicit Intent contracts, interface abstractions, and deep links.
publishDate: 'Oct 25 2023'
isFeatured: true
seo:
  image:
    src: '../../assets/images/project-5.jpg'
    alt: Multi-Module Navigation Architecture Preview
---

![Project preview](../../assets/images/project-5.jpg)

**Project Overview:**  
**Multi-Module Activity Navigation Sample** is an architectural proof-of-concept created by **David Vávra** (Google Developer Expert for Android). The repository addresses one of the most critical challenges in multi-module Android development: **navigating between feature modules without creating circular dependencies or breaking layer encapsulation.**

---

## Technical Stack & Architectural Core

| Category | Technology & Concepts |
|---|---|
| **Language** | Kotlin 1.9+ |
| **Platform** | Android SDK |
| **Architecture** | Multi-Module Clean Architecture |
| **Navigation Pattern** | Intent Contracts / Deep Linking / Navigation Interfaces |
| **Key Objective** | Zero compile-time coupling between sibling feature modules |

---

## The Circular Dependency Challenge

In a modularized Android codebase, independent feature modules (e.g., `:feature_first` and `:feature_second`) must not depend directly on each other (`:feature_first` $\to$ `:feature_second` and `:feature_second` $\to$ `:feature_first`). Direct references prevent build systems like Gradle from resolving compilation graphs, leading to circular dependency errors and monolithic coupling.

<pre style="white-space: pre; font-family: monospace; font-size: 0.85rem; line-height: 1.4; overflow-x: auto; background: #0d1117; color: #e6edf3; padding: 1rem; border: 1px solid #30363d; border-radius: 8px;">
                     [ INVALID CIRCULAR DEPENDENCY ]
                    
    +------------------+                    +------------------+
    |  :feature_first  | --------(X)------> | :feature_second  |
    +------------------+ <-------(X)------- +------------------+
</pre>

---

## Decoupled Navigation Pattern

To resolve this constraint, navigation routes are abstracted into a common `:navigation` contract module. Sibling feature modules only interact with contracts, while the top-level `:app` module binds implementation details at runtime.

<pre style="white-space: pre; font-family: monospace; font-size: 0.85rem; line-height: 1.4; overflow-x: auto; background: #0d1117; color: #e6edf3; padding: 1rem; border: 1px solid #30363d; border-radius: 8px;">
                         +------------------+
                         |       :app       |
                         |  (Binds Contracts|
                         |   & Navigation)  |
                         +------------------+
                           /              \
                          /                \
                         v                  v
              +------------------+    +------------------+
              |  :feature_first  |    | :feature_second  |
              +------------------+    +------------------+
                         \                  /
                          \                /
                           v              v
                         +------------------+
                         |   :navigation    |
                         | (Intent Contracts|
                         |  & Route Models) |
                         +------------------+
</pre>

---

## Technical Features & Implementation Strategies

1. **Navigation Contracts Module (`:navigation`):**
   - Declares pure Kotlin interfaces, explicit `Intent` builders, and destination routes without pulling in feature implementation dependencies.

2. **Decoupled Feature Modules (`:feature_first`, `:feature_second`):**
   - Each feature encapsulates its own `Activity` or UI controllers.
   - Triggers cross-module navigation by invoking contracts exposed by `:navigation`.

3. **Runtime Inversion of Control (`:app`):**
   - The main `:app` module depends on all feature modules and the navigation layer. It wires navigation implementations and resolves target `Activity` classes dynamically.

4. **Deep Link / Implicit Intent Abstraction:**
   - Navigates seamlessly via URI schemes or dynamic intent actions, ensuring feature modules remain completely ignorant of target class references.

---

## Project Structure Layout

<pre style="white-space: pre; font-family: monospace; font-size: 0.8rem; line-height: 1.35; overflow-x: auto; background: #0d1117; color: #e6edf3; padding: 1rem; border: 1px solid #30363d; border-radius: 8px;">
root/
├── app/                  # Main entry point; builds final dependency graph
├── navigation/           # Shared navigation contracts, route definitions & Intent interfaces
├── feature_first/        # Isolated Feature 1 (FirstActivity & presentation logic)
└── feature_second/       # Isolated Feature 2 (SecondActivity & presentation logic)
</pre>

---

## Key Benefits

- **Faster Build Times:** Incremental Gradle compilations are significantly accelerated since feature modules build in parallel.
- **Strict Encapsulation:** Features can be added, refactored, or isolated without breaking sibling components.
- **Reusability & Scalability:** Navigation contracts serve as a clean API surface for enterprise-grade Android applications.