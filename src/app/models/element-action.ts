import {DefaultResource} from './default-resource';

export interface ElementAction {
  position: number;
  selectionValue: string;
  selectionType: string;
  selectedElementId: string;
  message: string;
  result: DefaultResource;
  type: string;
  navigateUrl: string;
}
