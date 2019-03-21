import { AsyncStorage } from 'react-native';

const host = 'https://instalura-api.herokuapp.com';

export const get = async (path, errorFunction) => {
  const token = await AsyncStorage.getItem('token');
  const headers = new Headers({
    'X-AUTH-TOKEN': token
  });
  const requestParams = {
    headers
  };
  const response = await fetch(`${host}${path}`, requestParams);

  if (!response.ok) {
    errorFunction();
  }

  const json = await response.json();
  return json;
}

export const post = async (path, body, errorFunction) => {
  const token = await AsyncStorage.getItem('token');

  const response = await fetch(`${host}${path}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-type': 'application/json',
      'X-AUTH-TOKEN': token
    })
  });

  if (!response.ok) {
    errorFunction();
  }

  const json = await response.json();
  return json;
}
