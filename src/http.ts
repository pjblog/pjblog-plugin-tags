import { HTTPController } from '@typeservice/http';
import { pluginRouter, getConfigsByContainer } from './global';
import { Controller } from '@pjblog/core';
import { TagsServer } from './dbo';

@HTTPController()
export class HttpBlogPluginTest extends Controller {
  get configs() {
    return getConfigsByContainer();
  }

  @pluginRouter({
    pathname: '/tags',
    methods: 'GET'
  })
  public getArticlePreviewInfo() {
    const tags = new TagsServer(this.dataSource.manager);
    return tags.getTags();
  }
}