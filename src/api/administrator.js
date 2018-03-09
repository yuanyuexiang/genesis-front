import fetch from 'utils/fetch';

export function saveAdministrator(parameter) {

    return fetch({
        url: '/genesis/v1/administrator',
        method: 'POST',
        parameter
    });
}

export function getAdministrator(administratorID) {
    return fetch({
        url: '/genesis/v1/administrator/' + administratorID,
        method: 'GET'
    });
}

export function updateAdministrator(administratorID, parameter) {
    return fetch({
        url: '/genesis/v1/administrator' + administratorID,
        method: 'PUT',
        parameter
    });
}

export function updateAdministratorRole(administratorID, role) {
    const parameter = {
        Role: role
    }
    return fetch({
        url: '/genesis/v1/administrator' + administratorID + '/role',
        method: 'PUT',
        parameter
    });
}

export function updateAdministratorPassword(administratorID, password) {
    const parameter = {
        Role: password
    }
    return fetch({
        url: '/genesis/v1/administrator' + administratorID + '/password',
        method: 'PUT',
        parameter
    });
}

export function deleteAdministrator(administratorID) {
    return fetch({
        url: '/genesis/v1/administrator/' + administratorID,
        method: 'DELETE'
    });
}

export function listAdministrator(limit, offset) {
    const data = {
        limit,
        offset
    };
    return fetch({
        url: '/genesis/v1/administrator',
        method: 'GET',
        data
    });
}