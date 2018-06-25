import Cryptr from 'cryptr';
import config from '../config/app.config';

const { secretKey } = config;
const cryptr = new Cryptr(secretKey);

const saveInLocalStorage = (key, value) => {
  const encryptedValue = typeof value === 'object' ? cryptr.encrypt(JSON.stringify(value)) : cryptr.encrypt(value);
  localStorage.setItem(key, encryptedValue);
  return true;
}

const getFromLocalStorage = (key) => {
  let value = localStorage.getItem(key);
  value = value === null ? undefined : cryptr.decrypt(value);
  if(value !== undefined && value.indexOf('{') > -1) value = JSON.parse(value);
  return value;
}

const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
}

export { getFromLocalStorage, removeLocalStorage, saveInLocalStorage };