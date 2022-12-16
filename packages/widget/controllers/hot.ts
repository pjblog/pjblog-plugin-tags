import { Controller } from '../utils';
import { Component, Water } from '@pjblog/http';
import { ITag, getTags } from '../service';
import type Tag from '..';

@Controller('GET', '/tags/hot')
export class HotTagController extends Component<Tag, ITag[]> {
  public response(): ITag[] {
    return [];
  }

  @Water()
  public getags() {
    return async (context: ITag[]) => {
      const res = await getTags(
        this.container.connection.manager, 
        this.container.storage.get('hotTagSize')
      );
      context.push(...res);
    }
  }
}