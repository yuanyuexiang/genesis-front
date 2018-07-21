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

export function updateDefultReply(type, data) {
    return fetch({
        url: '/genesis/v1/reply/defult/' + type,
        method: 'put',
        data
    });
}

export function deleteDefultReply(type) {
    return fetch({
        url: '/genesis/v1/reply/defult/' + type,
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

export function getKeyReply(key) {
    return fetch({
        url: '/genesis/v1/reply/key/'+key,
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

export function updateKeyReply(key, data) {
    return fetch({
        url: '/genesis/v1/reply/key/' + key,
        method: 'put',
        data
    });
}

export function deleteKeyReply(key) {
    return fetch({
        url: '/genesis/v1/reply/key/' + key,
        method: 'delete',
    });
}