import { Session } from './model';

export interface Item { id: string; title: string; indent: number; }

export interface StoreState {
    session: Session; 
    itemList: Array<Item>;
    currentId: string;
}