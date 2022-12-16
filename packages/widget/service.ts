import type { EntityManager } from 'typeorm';
import { BlogTagRelativeEntity, BlogTagEntity } from '@pjblog/core';

export interface ITag {
  id: number,
  name: string,
  count: number,
}

export async function getTags(manager: EntityManager, size?: number) {
  const runner = manager.getRepository(BlogTagRelativeEntity).createQueryBuilder('r');

  runner
    .innerJoin(BlogTagEntity, 't', 'r.tid=t.id')
    .select('t.id', 'id')
    .addSelect('t.tag_name', 'name')
    .addSelect('COUNT(r.aid)', 'count')
    .groupBy('t.id')
    .orderBy('count', 'DESC');

  if (size) {
    runner.limit(size);
  }
    
  const res = await runner.getRawMany<ITag>();
  return res.map(r => {
    r.count = Number(r.count);
    return r;
  }).filter(r => r.count > 0);
}