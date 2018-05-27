import fetch from 'utils/fetch';

export function saveDefultReply(data) {
    return fetch({
        url: '/genesis/v1/reply/defult',
        method: 'post',
        data
    });
}

export function getDefultReply(type) {
    return fetch({
        url: '/genesis/v1/reply/defult/'+type,
        method: 'get',
    });
}

export function updateDefultReply(id, data) {
    return fetch({
        url: '/genesis/v1/reply/defult/' + id,
        method: 'put',
        data
    });
}

export function deleteDefultReply(id) {
    return fetch({
        url: '/genesis/v1/reply/defult/' + id,
        method: 'delete',
    });
}


export function saveKeyReply(data) {
    return fetch({
        url: '/genesis/v1/reply/key',
        method: 'post',
        data
    });
}

export function getKeyReply(type) {
    return fetch({
        url: '/genesis/v1/reply/key/'+type,
        method: 'get',
    });
}

export function listKeyReply(offset, limit ,query) {
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
        url: '/genesis/v1/reply/key',
        method: 'get',
        params
    });
}

export function updateKeyReply(id, data) {
    return fetch({
        url: '/genesis/v1/reply/key/' + id,
        method: 'put',
        data
    });
}

export function deleteKeyReply(id) {
    return fetch({
        url: '/genesis/v1/reply/key/' + id,
        method: 'delete',
    });
}