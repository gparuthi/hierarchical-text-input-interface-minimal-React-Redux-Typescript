// src/types/index.tsx


export interface Item {
    id: number,
    title: string
}

export interface StoreState {
    byId: [0,1,2];
    byHash: {
        '0': { id: 0, title: "0" }
        '1': { id: 1, title: "1" },
        '2': { id: 2, title: "2" }
    };
}