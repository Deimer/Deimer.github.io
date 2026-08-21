import { type CollectionEntry } from 'astro:content';
import { slugify } from './common-utils';

function parseStartDate(dateVal: Date | string | undefined): Date {
    if (!dateVal) return new Date();
    if (dateVal instanceof Date) return dateVal;
    const startDatePart = dateVal.split('-')[0].trim();
    const parsed = new Date(startDatePart);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
}

export function sortItemsByDateDesc(
    itemA: CollectionEntry<'experiences' | 'projects'>,
    itemB: CollectionEntry<'experiences' | 'projects'>
) {
    const dateA = parseStartDate(itemA.data.publishDate);
    const dateB = parseStartDate(itemB.data.publishDate);
    return dateB.getTime() - dateA.getTime();
}

export function getAllTags(experiences: CollectionEntry<'experiences'>[]) {
    const tags: string[] = [...new Set(experiences.flatMap((exp) => exp.data.tags || []).filter(Boolean))];
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

export function getPostsByTag(experiences: CollectionEntry<'experiences'>[], tagId: string) {
    const filteredExperiences: CollectionEntry<'experiences'>[] = experiences.filter((exp) =>
        (exp.data.tags || []).map((tag) => slugify(tag)).includes(tagId)
    );
    return filteredExperiences;
}
