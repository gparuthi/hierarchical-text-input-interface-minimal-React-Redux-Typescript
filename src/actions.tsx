import * as constants from './constants';
import { Item } from './types';

export interface EditItem {
    type: constants.EDIT_ITEM;
    payload: {
        id: string,
        title: string
    }
}

export interface AddNextItem {
    type: constants.ADD_NEXT_ITEM;
    payload: Item;
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
    payload: {
        sourceIndex: number,
        destinationIndex: number,
        isCopied: boolean
    };
}

export interface FocusNext {
    type: constants.FOCUS_NEXT;
}

export interface FocusPrev {
    type: constants.FOCUS_PREVIOUS;
}

export interface FocusItem {
    type: constants.FOCUS_ITEM;
    id: string;
}

export type ItemAction = EditItem | AddNextItem | IndentItem | DeIndentItem | RemoveItem | 
    MoveItem | FocusNext | FocusPrev | FocusItem;

export function editItem(id: string, title: string): EditItem {
    return { type: constants.EDIT_ITEM, payload: { id: id, title: title } };
}

export function addNextItem(item: Item): AddNextItem {
    return { type: constants.ADD_NEXT_ITEM, payload: item };
}

export function indentItem(): IndentItem {
    return { type: constants.INDENT_ITEM };
}

export function deIndentItem(): DeIndentItem {
    return { type: constants.DEINDENT_ITEM };
}

export function removeItem(): RemoveItem {
    return { type: constants.REMOVE_ITEM };
}

export function moveItem(sourceIndex: number, destinationIndex: number, isCopied: boolean): MoveItem {
    return { type: constants.MOVE_ITEM, 
        payload: {sourceIndex: sourceIndex, destinationIndex: destinationIndex, isCopied: isCopied} };
}

export function focusNextItem(): FocusNext {
    return { type: constants.FOCUS_NEXT };
}

export function focusPrevItem(): FocusPrev {
    return { type: constants.FOCUS_PREVIOUS };
}

export function focusItem(id: string): FocusItem {
    return { type: constants.FOCUS_ITEM, id };
}