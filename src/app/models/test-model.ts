import {ElementAction} from './element-action';

export interface TestModel {
  id: string;
  name: string;
  createdDate: Date;
  testCommands: ElementAction[];
}
