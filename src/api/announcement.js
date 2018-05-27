import fetch from 'utils/fetch';

export function createAnnouncement(data) {
    return fetch({
        url: '/genesis/v1/announcement',
        method: 'post',
        data
    });
}

export function getAnnouncement(id) {
    return fetch({
        url: '/genesis/v1/announcement/'+id,
        method: 'get',
    });
}

export function listAnnouncement(offset, limit ,query) {
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
        url: '/genesis/v1/announcement',
        method: 'get',
        params
    });
}

export function deleteAnnouncement(id) {
    return fetch({
        url: '/genesis/v1/announcement/' + id,
        method: 'delete',
    });
}