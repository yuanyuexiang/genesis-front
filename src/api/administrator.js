import fetch from 'utils/fetch';

export function saveAdministrator(data) {
    return fetch({
        url: '/genesis/v1/administrator',
        method: 'post',
        data
    });
}

export function getAdministrator(administratorID) {
    return fetch({
        url: '/genesis/v1/administrator/' + administratorID,
        method: 'get'
    });
}

export function updateAdministrator(administratorID, data) {
    return fetch({
        url: '/genesis/v1/administrator/' + administratorID,
        method: 'put',
        data
    });
}

export function updateAdministratorPhoneNumber(administratorID, phoneNumber) {
    const data = {
        PhoneNumber: phoneNumber
    }
    return fetch({
        url: '/genesis/v1/administrator/' + administratorID + '/phoneNumber',
        method: 'put',
        data
    });
}

export function updateAdministratorName(administratorID, name) {
    const data = {
        Name: name
    }
    return fetch({
        url: '/genesis/v1/administrator/' + administratorID + '/name',
        method: 'put',
        data
    });
}

export function updateAdministratorRole(administratorID, role) {
    const data = {
        Role: role
    }
    return fetch({
        url: '/genesis/v1/administrator/' + administratorID + '/role',
        method: 'put',
        data
    });
}

export function updateAdministratorPassword(administratorID, password) {
    const data = {
        Role: password
    }
    return fetch({
        url: '/genesis/v1/administrator/' + administratorID + '/password',
        method: 'put',
        data
    });
}

export function updateAdministratorStatus(administratorID, status) {
    const data = {
        Status: status
    }
    return fetch({
        url: '/genesis/v1/administrator/' + administratorID + '/status',
        method: 'put',
        data
    });
}

export function deleteAdministrator(administratorID) {
    return fetch({
        url: '/genesis/v1/administrator/' + administratorID,
        method: 'delete'
    });
}

export function listAdministrator(limit, offset) {
    const params = {
        limit,
        offset
    };
    return fetch({
        url: '/genesis/v1/administrator',
        method: 'get',
        params
    });
}