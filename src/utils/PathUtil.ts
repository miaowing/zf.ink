import { join, resolve } from 'path';

const basePath = process.env.NODE_ENV === 'production' ? resolve(__dirname, '..') : resolve(__dirname, '../../src');

export function getBasePath(): string {
  return basePath;
}

export function getViewPath() {
  return join(basePath, 'views');
}

export function getPublicPath() {
  return join(basePath, 'public');
}

export function getPartialsPath() {
  return join(basePath, 'views/partials');
}

export function getConfigPath() {
  return join(basePath, 'configs');
}
