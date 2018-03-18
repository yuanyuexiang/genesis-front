import fetch from 'utils/fetch';

export function saveMaterial(data) {
    return fetch({
        url: '/genesis/v1/material',
        method: 'post',
        data
    });
}

export function listMaterial(offset, count) {
    const params = {
        offset,
        count
    };
    return fetch({
        url: '/genesis/v1/material',
        method: 'get',
        params
    });
}

export function getMaterial(MediaID) {
    return fetch({
        url: '/genesis/v1/material/' + MediaID,
        method: 'get'
    });
}

export function updateMaterial(MediaID, data) {
    return fetch({
        url: '/genesis/v1/material/' + MediaID,
        method: 'put',
        data
    });
}

export function deleteMaterial(MaterialID) {
    return fetch({
        url: '/genesis/v1/material/' + MaterialID,
        method: 'delete'
    });
}

export function getMaterialCount() {
    return fetch({
        url: '/genesis/v1/material/count',
        method: 'get'
    });
}