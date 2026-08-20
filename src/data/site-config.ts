import avatar from '../assets/images/avatar.png';
import hero from '../assets/images/hero.jpeg';
import type { SiteConfig } from '../types';

const siteConfig: SiteConfig = {
    website: 'https://deimer.github.io',
    avatar: {
        src: avatar,
        alt: 'Deymer Villa Pedraza'
    },
    title: 'Deymer Villa',
    subtitle: 'Android & Mobile Software Engineer 👨‍💻',
    description: 'Personal portfolio and tech blog focused on Android development, Kotlin, mobile architecture, and cross-platform solutions.',
    image: {
        src: '/dante-preview.jpg',
        alt: 'Deymer Villa - Android Developer Portfolio'
    },
    headerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'Projects',
            href: '/projects'
        },
        {
            text: 'Experiences',
            href: '/experiences'
        },
        {
            text: 'Tags',
            href: '/tags'
        }
    ],
    footerNavLinks: [
        {
            text: 'About',
            href: '/about'
        },
        {
            text: 'Contact',
            href: '/contact'
        },
        {
            text: 'Terms',
            href: '/terms'
        },
        {
            text: 'Download theme',
            href: 'https://github.com/JustGoodUI/dante-astro-theme'
        }
    ],
    socialLinks: [
        {
            text: 'GitHub',
            href: 'https://github.com/deimer'
        },
        {
            text: 'LinkedIn',
            href: 'https://www.linkedin.com/in/deimer/'
        },
        {
            text: 'Instagram',
            href: 'https://www.instagram.com/deimer.llosehp/'
        }
    ],
    hero: {
        title: "Hi There! I'm Deymer Villa 👋",
        text: "I'm a **Systems Engineer** and **Android Developer** specializing in building robust, scalable, and high-performance native and cross-platform mobile applications.\n\nMy primary expertise focuses on **Kotlin, Jetpack Compose, Clean Architecture**, and modern software design patterns, complemented by experience in **Kotlin Multiplatform (KMP), Flutter, React Native**, and backend technologies like **Laravel, Python, and .NET**.\n\nFeel free to explore some of my code endeavors on [GitHub](https://github.com/deimer) or connect with me on [LinkedIn](https://www.linkedin.com/in/deimer/).",
        image: {
            src: hero,
            alt: 'Deymer Villa workspace'
        },
        actions: [
            {
                text: 'Get in Touch',
                href: '/contact'
            }
        ]
    },
    subscribe: {
        enabled: false,
        title: 'Subscribe to Deymer Newsletter',
        text: 'Articles and insights on Android development, Kotlin, and mobile architecture delivered straight to your inbox.',
        form: {
            action: '#'
        }
    },
    experiencesPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
