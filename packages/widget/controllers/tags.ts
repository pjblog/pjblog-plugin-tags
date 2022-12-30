import { Controller } from '../utils';
import { Component, Water, Request } from '@pjblog/http';
import { getNode } from '@pjblog/manager';
import { TypeORM } from '@pjblog/typeorm';
import { ITag, getTags } from '../service';
import type { EntityManager } from 'typeorm';

@Controller('GET', '/tags')
export class TagsController extends Component<ITag[]> {
  public readonly manager: EntityManager;
  constructor(req: Request) {
    super(req, []);
    this.manager = getNode(TypeORM).value.manager;
  }

  @Water()
  public async getags() {
    this.res = await getTags(this.manager);
  }
}