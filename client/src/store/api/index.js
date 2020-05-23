import axios from 'axios';
import { Service } from 'axios-middleware';

const apiUrl = `${process.env['REACT_APP_API_SCHEME']}://` +
  `${process.env['REACT_APP_API_HOST']}:${process.env['REACT_APP_API_PORT']}`

const service = new Service(axios);

service.register({
  onRequest(config) {
    return config;
  },
  onSync(promise) {
    return promise;
  },
  onResponse(response) {
    return response;
  }
});

export const get = (entity, data, params) => {
  return axios.get(apiUrl + '/' + entity, data, params)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error
    })
}

export const post = (entity, data, params) => {
  return axios.post(apiUrl + '/' + entity, data, params)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error
    })
}

export const patch = (entity, data, params) => {
  return axios.patch(apiUrl + '/' + entity, data, params)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error
    })
}

export const remove = (entity, id) => {
  return axios.delete(apiUrl + '/' + entity + '/' + id)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error
    })
}

