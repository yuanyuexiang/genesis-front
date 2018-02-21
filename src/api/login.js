import fetch from 'utils/fetch';

export function loginByPhone(phone, password) {
  const data = {
    PhoneNumber: phone,
    Password: password
  };

  return fetch({
    url: 'genesis/v1/session',
    method: 'POST',
    data
  });
}

export function logout() {
  return fetch({
    url: 'genesis/v1/session',
    method: 'DELETE'
  });
}
/*
export function getInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'GET',
    params: { token }
  });
}
*/
export function getInfo(uid) {
  return fetch({
    url: '/genesis/v1/administrator/' + uid,
    method: 'GET'
  });
}