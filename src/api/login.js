import fetch from 'utils/fetch';

export function loginByPhone(phone, password) {
  /*
  const data = {
    phone,
    password
  };
  */
  
  let data = {
    PhoneNumber:phone,
    Password:password
  };
  //data.Password = password;
  //data.PhoneNumber = phone;
  /*
  return fetch({
    url: '/login/loginByPhone',
    method: 'post',
    data
  });
  */
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