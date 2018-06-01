import fetch from 'utils/fetch';

export function saveMaterialNews(data) {
    return fetch({
        url: '/genesis/v1/material/news',
        method: 'post',
        data
    });
}

export function listMaterialNews(limit, offset) {
    const params = {
        limit,
        offset
    };
    return fetch({
        url: '/genesis/v1/material/news',
        method: 'get',
        params
    });
}

export function getMaterialNews(id) {
    return fetch({
        url: '/genesis/v1/material/news/' + id,
        method: 'get'
    });
}

export function deleteMaterialNews(id) {
    return fetch({
        url: '/genesis/v1/material/news/' + id,
        method: 'delete'
    });
}

export function saveMaterialMedia(data) {
    return fetch({
        url: '/genesis/v1/material/media',
        method: 'post',
        data
    });
}

export function listMaterialMedia(limit, offset) {
    const params = {
        limit,
        offset
    };
    return fetch({
        url: '/genesis/v1/material/media',
        method: 'get',
        params
    });
}

export function getMaterialMedia(id) {
    return fetch({
        url: '/genesis/v1/material/media/' + id,
        method: 'get'
    });
}

export function deleteMaterialMedia(id) {
    return fetch({
        url: '/genesis/v1/material/media/' + id,
        method: 'delete'
    });
}