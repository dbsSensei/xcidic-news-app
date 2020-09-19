import * as c from './constants'

export const addHeadlines = (headlines:Object) => ({
    type: c.HEADLINES_AVAILABLE,
    headlines
});

export const addCategoryHeadlines = (category:Object, headlines:Object, page = 1) => ({
    type: c.CATEGORY_HEADLINES_AVAILABLE,
    category,
    headlines,
    page
});