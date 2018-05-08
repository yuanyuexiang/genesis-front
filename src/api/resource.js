import fetch from 'utils/fetch';

/**文章部分 */
export function saveArticle(data) {
    return fetch({
        url: '/genesis/v1/article',
        method: 'post',
        data
    });
}

export function listArticle(offset, limit) {
    const sortby="id"
    const order="desc"
    const params = {
        offset,
        limit,
        sortby,
        order
    };
    return fetch({
        url: '/genesis/v1/article',
        method: 'get',
        params
    });
}

export function getArticle(id) {
    return fetch({
        url: '/genesis/v1/article/' + id,
        method: 'get'
    });
}

export function updateArticle(id, data) {
    return fetch({
        url: '/genesis/v1/article/' + id,
        method: 'put',
        data
    });
}

export function deleteArticle(id) {
    return fetch({
        url: '/genesis/v1/article/' + id,
        method: 'delete'
    });
}

export function updateArticleReviewStatus(id) {
    return fetch({
        url: '/genesis/v1/article/' + id + 'reviewStatus',
        method: 'put'
    });
}

/**媒体部分 */
export function saveMedia(data) {
    return fetch({
        url: '/genesis/v1/media',
        method: 'post',
        data
    });
}

export function listMedia(offset, limit ,query) {
    const sortby="id"
    const order="desc"
    const params = {
        offset,
        limit,
        query,
        sortby,
        order
    };
    return fetch({
        url: '/genesis/v1/media',
        method: 'get',
        params
    });
}

export function getMedia(id) {
    return fetch({
        url: '/genesis/v1/media/' + id,
        method: 'get'
    });
}

export function updateMedia(id, data) {
    return fetch({
        url: '/genesis/v1/media/' + id,
        method: 'put',
        data
    });
}

export function deleteMedia(id) {
    return fetch({
        url: '/genesis/v1/media/' + id,
        method: 'delete'
    });
}

export function updateMediaReviewStatus(id) {
    return fetch({
        url: '/genesis/v1/media/' + id + 'reviewStatus',
        method: 'put'
    });
}