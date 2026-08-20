import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import siteConfig from '../data/site-config.ts';
import { sortItemsByDateDesc } from '../utils/data-utils.ts';

export async function GET(context) {
    const experiences = (await getCollection('experiences')).sort(sortItemsByDateDesc);
    return rss({
        title: siteConfig.title,
        description: siteConfig.description,
        site: context.site,
        items: experiences.map((item) => ({
            title: item.data.title,
            description: item.data.excerpt,
            link: `/experiences/${item.id}/`,
            pubDate: item.data.publishDate
        }))
    });
}
