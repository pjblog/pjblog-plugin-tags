import { Controller } from '../utils';
import { Component, Water } from '@pjblog/http';
import { ITag, getTags } from '../service';
import type Tag from '..';

@Controller('GET', '/tags')
export class TagController extends Component<Tag, ITag[]> {
  public response(): ITag[] {
    return [];
  }

  @Water()
  public getags() {
    return async (context: ITag[]) => {
      const res = await getTags(this.container.connection.manager);
      context.push(...res);
    }
  }
}