// src/types/index.tsx

interface Hash<T> {
    [key: string]: T;
}

export interface Item {
    id: string;
    title: string;
}

export interface StoreState {
    byId: Array<string>;
    byHash: Hash<Item>;
    indents: Hash<number>;
    currentId: string;
}