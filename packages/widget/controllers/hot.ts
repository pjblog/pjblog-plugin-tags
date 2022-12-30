import Tag from '..';
import { Controller } from '../utils';
import { Component, Water, Request } from '@pjblog/http';
import { getNode } from '@pjblog/manager';
import { TypeORM } from '@pjblog/typeorm';
import { ITag, getTags } from '../service';
import type { EntityManager } from 'typeorm';

@Controller('GET', '/tags/hot')
export class HotTagsController extends Component<ITag[]> {
  public readonly manager: EntityManager;
  public readonly container: Tag;

  constructor(req: Request) {
    super(req, []);
    this.manager = getNode(TypeORM).value.manager;
    this.container = getNode(Tag);
  }

  @Water(1)
  public async getags() {
    this.res = await getTags(
      this.manager, 
      this.container.storage.get('hotTagSize')
    );
  }
}