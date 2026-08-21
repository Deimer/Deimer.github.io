import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import siteConfig from '../data/site-config.ts';

function parseStartDate(dateStr) {
    if (!dateStr) return new Date();
    const startDatePart = dateStr.split('-')[0].trim();
    const parsed = new Date(startDatePart);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
}

export async function GET(context) {
    const experiences = await getCollection('experiences');

    experiences.sort((a, b) => {
        const dateA = parseStartDate(a.data.publishDate);
        const dateB = parseStartDate(b.data.publishDate);
        return dateB.getTime() - dateA.getTime();
    });

    return rss({
        title: siteConfig.title,
        description: siteConfig.description,
        site: context.site,
        items: experiences.map((item) => ({
            title: item.data.title,
            description: item.data.excerpt,
            link: `/experiences/${item.id}/`,
            pubDate: parseStartDate(item.data.publishDate)
        }))
    });
}
