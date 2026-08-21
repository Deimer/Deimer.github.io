import { type CollectionEntry } from 'astro:content';
import { slugify } from './common-utils';

export function sortItemsByDateDesc(itemA: CollectionEntry<'experience' | 'projects'>, itemB: CollectionEntry<'experience' | 'projects'>) {
    return new Date(itemB.data.publishDate).getTime() - new Date(itemA.data.publishDate).getTime();
}

export function getAllTags(experiences: CollectionEntry<'experience'>[]) {
    const tags: string[] = [...new Set(experiences.flatMap((experience) => experience.data.tags || []).filter(Boolean))];
    return tags
        .map((tag) => {
            return {
                name: tag,
                id: slugify(tag)
            };
        })
        .filter((obj, pos, arr) => {
            return arr.map((mapObj) => mapObj.id).indexOf(obj.id) === pos;
        });
}

export function getExperiencesByTag(experiences: CollectionEntry<'experience'>[], tagId: string) {
    const filteredExperiences: CollectionEntry<'experience'>[] = experiences.filter((experience) => (experience.data.tags || []).map((tag) => slugify(tag)).includes(tagId));
    return filteredExperiences;
}
