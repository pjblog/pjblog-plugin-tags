import { Logger } from '@pjblog/logger';
import { Provider, Consumer, LifeError } from '@pjblog/manager';
import { TypeORM } from '@pjblog/typeorm';
import { Http } from '@pjblog/http';
import { Plugin, Article } from '@pjblog/core';
import { TagsController, HotTagsController } from './controllers';
import { IConfigs } from './utils';

export * from './controllers';
export * from './service';
export * from './utils';

@Provider
export default class TagsPlugin extends Plugin<IConfigs> {
  @Consumer(Logger) private readonly Logger: Logger;
  @Consumer(TypeORM) private readonly TypeORM: TypeORM;
  @Consumer(Http) private readonly Http: Http;
  @Consumer(Article) private readonly Article: Article;

  get logger() {
    return this.Logger.value;
  }

  get http() {
    return this.Http;
  }

  get connection() {
    return this.TypeORM.value;
  }

  get article() {
    return this.Article;
  }

  /**
   * 新安装插件时候的生命周期
   * 一般会将数据表描述卸乳
   */
  public async install(): Promise<void> {}

  /**
   * 卸载插件时候专有生命周期
   */
  public async uninstall(): Promise<void> {}

  public onerror(e: LifeError): void {
    this.logger.error(e.stack)
  }

  /**
   * 服务器启动时候逻辑处理
   * @returns 
   */
  public async initialize(): Promise<void | (() => Promise<void>)> {
    this.http.addController(TagsController);
    this.http.addController(HotTagsController);
    this.logger.info('pjblog-plugin-tags Initialized.');
    return async () => {
      this.http.delController(HotTagsController);
      this.http.delController(TagsController);
      this.logger.info('pjblog-plugin-tags Terminated.');
    }
  }
}