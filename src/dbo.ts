import { getConfigsByContainer } from './global';
import { databaseService, BlogTagEntity, BlogTagRelativeEntity } from '@pjblog/core';

export class TagsServer extends databaseService {
  get TagEntity() {
    return this.manager.getRepository(BlogTagEntity);
  }

  get TagRelativeEntity() {
    return this.manager.getRepository(BlogTagRelativeEntity);
  }

  get configs() {
    return getConfigsByContainer();
  }

  public async getTags(): Promise<{ id: number, name: string, count: number }[]> {
    const result = await this.TagRelativeEntity.createQueryBuilder('r')
      .innerJoin(BlogTagEntity, 't', 'r.tid=t.id')
      .select('t.id', 'id')
      .addSelect('t.tag_name', 'name')
      .addSelect('COUNT(r.aid)', 'count')
      .groupBy('t.id')
      .orderBy('count', 'DESC')
      .limit(this.configs.tags)
      .getRawMany();

    return result.map(res => {
      res.count = Number(res.count);
      return res;
    })
  }
}