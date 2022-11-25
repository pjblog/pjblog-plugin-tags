import { createPluginRouter } from '@pjblog/core';
import { container, ModularContext } from '@pjblog/core';
const pkg = require('../package.json');
export const pluginRouter = createPluginRouter(pkg.name);

export interface TConfigs {
  tags: number
}

export function getConfigsByContainer() {
  const context = container.get(pkg.name) as ModularContext<TConfigs>
  if (!context) return {} as TConfigs;
  return context.configs_value;
}