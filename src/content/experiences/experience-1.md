---
title: Senior Android Developer at Arkano Software (Client - Yape)
excerpt: Engineering high-scale fintech solutions for Yape, Peru's premier mobile financial ecosystem. Architecting ultra-reliable, high-concurrency Android modules with Jetpack Compose, Clean Architecture, and advanced state management to support over 15 million active users.
publishDate: 'Mar 2026'
tags:
  - Jetpack Compose
  - MVI
  - Fintech
  - Modularization
  - Koin
  - Bitrise
  - Encrypted DataStore
  - Kotlin Coroutines
seo:
  title: Senior Android Developer - Arkano / Yape | Deymer Villa
  description: Detailed breakdown of Deymer Villa's engineering role at Arkano Software, building scalable, high-concurrency fintech solutions for Yape (BCP) in Peru.
  image:
    src: '../../assets/images/post-1.jpg'
    alt: Android Engineering at Arkano for Yape
---

![Android Engineering at Arkano for Yape](../../assets/images/post-1.jpg)

## About Arkano Software & Yape

**Arkano Software** is a leading Latin American technology consulting firm specialized in executing high-impact digital transformations and mobile product delivery. Through Arkano, I am embedded as a Senior Android Developer in **Yape**—Peru’s primary mobile payment platform backed by Banco de Crédito del Perú (BCP). 

Yape operates as a massive financial super-app powering daily transactions for more than 15 million users, enabling instant peer-to-peer money transfers, merchant QR payments, utility bill processing, micro-credit lines, and personalized financial services. Operating at this magnitude demands an uncompromising standard for application stability, ultra-low transactional latency, robust security protocols, and scalable frontend architecture.

---

## Technical Scope & Business Impact

My primary responsibility centered on engineering mission-critical transactional features, enhancing core platform reliability, and modernizing legacy application modules to ensure effortless UX across diverse mobile device ecosystems—from entry-level smartphones to modern flagships.

* **Declarative UI Engine with Jetpack Compose:** Designed and implemented highly dynamic, accessible, and responsive user interfaces utilizing **Jetpack Compose**. Replaced legacy XML view systems to eliminate layout inflation overhead, reduce UI-state bugs, and strictly enforce Yape’s unified design system.
* **Architectural Rigor (Clean Architecture & MVI/MVVM):** Enforced a strict multi-layered architecture separating presentation, domain, and data layers. Leveraged **MVI (Model-View-Intent)** and **MVVM** design patterns alongside **Kotlin Coroutines** and **Flow** to manage complex, asynchronous transactional states with complete thread safety and total predictability.
* **Large-Scale Multi-Module Architecture:** Maintained and structured feature modules across a highly decoupled codebase. Enforced feature isolation to prevent cross-module leaks, streamline CI compilation pipelines, optimize build caches, and enable frictionless parallel feature development across distributed engineering teams.
* **Advanced Dependency Injection:** Managed and migrated dependency graphs utilizing **Hilt** and **Koin**, ensuring clean dependency isolation, effortless instance scoping, and seamless testability across complex feature boundaries.
* **Secure Data Persistence & Local Storage:** Engineered resilient client-side caching strategies utilizing **Room Database** and **DataStore / Encrypted SharedPreferences**. Guaranteed strict compliance with financial security policies, protecting sensitive tokenized data while maintaining instant app load times and partial offline availability.
* **Network Infrastructure & Resilience:** Configured high-throughput networking layers using **Retrofit** and **OkHttp**. Built custom interceptors for encrypted request signing, automated dynamic token renewal, transparent header management, and detailed API request tracing.
* **Comprehensive Automated Testing:** Maintained high code quality and zero-regression deployment cycles by authoring unit and integration test suites using **JUnit**, **Mockito**, and **Espresso**. Standardized mocking patterns to test complex edge cases in financial transaction workflows.
* **Observability & Analytics Instrumentation:** Integrated **Firebase Analytics**, **Crashlytics**, and custom telemetry logging pipelines to monitor application health, track user conversion funnels, detect silent network failures, and triage real-time production issues proactively.
* **Automated Delivery Pipelines (CI/CD):** Integrated seamless automated build, test, and release workflows utilizing **Bitrise** and **GitHub Actions**, streamlining nightly builds, automated QA distributions, and staged Play Store rollouts.
