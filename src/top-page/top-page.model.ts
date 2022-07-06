import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class HhData {
  @prop()
  count: number;

  @prop()
  juniorSalary: number;

  @prop()
  middleSalary: number;

  @prop()
  seniorSalary: number;
}

export class Advantage {
  @prop()
  title: string;

  @prop()
  description: string;
}

export enum TopLevelCategories {
  Courses,
  Services,
  Books,
  Products,
}
export interface TopPage extends Base {}
export class TopPageModel extends TimeStamps {
  @prop({ enum: TopLevelCategories })
  firstCategory: TopLevelCategories;

  @prop()
  secondCategory: string;

  @prop({ unique: true })
  alias: string;

  @prop()
  title: string;

  @prop()
  category: string;

  @prop({ type: () => HhData })
  hh?: HhData;

  @prop({ type: () => [Advantage]})
  advantages: Advantage[];

  @prop()
  seoText: string;

  @prop()
  tagTitle: string;

  @prop({ type: [String] })
  tags: string[];
}