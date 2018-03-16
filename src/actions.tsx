import * as constants from './constants';

export interface AddNextItem {
    type: constants.ADD_NEXT_ITEM;
}

export interface IndentItem {
    type: constants.INDENT_ITEM;
}

export interface DeIndentItem {
    type: constants.DEINDENT_ITEM;
}

export interface RemoveItem {
    type: constants.REMOVE_ITEM;
}

export interface MoveItem {
    type: constants.MOVE_ITEM;
}

export interface CopyItem {
    type: constants.COPY_ITEM;
}

export type ItemAction = AddNextItem | IndentItem | DeIndentItem | RemoveItem | MoveItem | CopyItem;


export function addNextItem(): AddNextItem {
    return {type: constants.ADD_NEXT_ITEM};
}

export function indentItem(): IndentItem {
    return {type: constants.INDENT_ITEM};
}

export function deIndentItem(): DeIndentItem {
    return {type: constants.DEINDENT_ITEM};
}

export function removeItem(): RemoveItem {
    return {type: constants.REMOVE_ITEM};
}

export function moveItem(): MoveItem {
    return {type: constants.MOVE_ITEM};
}

export function copyItem(): CopyItem {
    return {type: constants.COPY_ITEM};
}