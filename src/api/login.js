import fetch from 'utils/fetch';

export function loginByPhone(phone, password) {
  const data = {
    PhoneNumber: phone,
    Password: password
  };

  return fetch({
    url: 'genesis/v1/session',
    method: 'post',
    data
  });
}

export function logout() {
  return fetch({
    url: '/login/logout',
    method: 'post'
  });
}

export function getInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}