import { createPluginRouter } from '@pjblog/core';
import { container, WidgetContext } from '@pjblog/core';
const pkg = require('../package.json');
export const pluginRouter = createPluginRouter(pkg.name);
export const namespace = 'test';

export interface TConfigs {
  tags: number
}

export function getConfigsByContainer() {
  const context = container.get(namespace) as WidgetContext<TConfigs>;
  if (!context) return {} as TConfigs;
  return context.config_value;
}