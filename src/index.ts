import { defineWidget } from '@pjblog/core';
import { HttpBlogPluginTest } from './http';
import { namespace, TConfigs } from './global';

export default defineWidget<TConfigs>({
  name: namespace,
  controllers: [HttpBlogPluginTest],
  configs: [
    {
      type: 'number',
      name: 'tags',
      label: '显示个数',
      defaultValue: 10,
      prefix: '根据文章使用tags的次数来确定热度',
      suffix: '控制这个变量能够控制返回的个数',
      number: {
        max: 100,
        min: 1,
        step: 1,
        unit: '个',
        style: {
          width: 200,
        }
      }
    }
  ],
})