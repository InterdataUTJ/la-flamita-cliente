import { AuthContextState } from '../types';
const LOCAL_STORAGE_KEY = 'la-flamita-cliente_perfil_data';

function load() {
  const storageString = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storageString ? JSON.parse(storageString) : {};
}

function save(data: AuthContextState) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  return data;
}

function remove() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

export default { load, save, remove };