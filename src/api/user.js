import fetch from 'utils/fetch';

export function getUserCount() {
    return fetch({
        url: '/genesis/v1/user/count',
        method: 'get',
    });
}

export function listUser(offset,limit,query) {
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
        url: '/genesis/v1/user',
        method: 'get',
        params
    });
}

export function deleteUser(id) {
    return fetch({
        url: '/genesis/v1/user/' + id,
        method: 'delete',
    });
}