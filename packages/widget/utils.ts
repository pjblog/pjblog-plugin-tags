import { createHttpPluginRouter } from '@pjblog/core';
const PKG = require('../../package.json');
export const Controller = createHttpPluginRouter(PKG.name);
export interface IConfigs {
  hotTagSize: number
}