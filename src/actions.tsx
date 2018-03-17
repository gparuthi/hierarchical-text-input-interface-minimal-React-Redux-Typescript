import * as constants from './constants';
import { Item } from './types';

export interface EditItem {
    type: constants.EDIT_ITEM;
    payload: Item
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
    payload: Item;
}

export interface FocusNext {
    type: constants.FOCUS_NEXT;
}

export interface FocusPrev {
    type: constants.FOCUS_PREVIOUS;
}

export interface CopyItem {
    type: constants.COPY_ITEM;
    payload: Item;
}

export interface FocusItem {
    type: constants.FOCUS_ITEM;
    id: string;
}

export type ItemAction = EditItem | AddNextItem | IndentItem | DeIndentItem | RemoveItem | 
    MoveItem | CopyItem | FocusNext | FocusPrev | FocusItem;

export function editItem(item: Item): EditItem {
    return { type: constants.EDIT_ITEM, payload: item };
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

export function moveItem(item: Item): MoveItem {
    return { type: constants.MOVE_ITEM, payload: item };
}

export function copyItem(item: Item): CopyItem {
    return { type: constants.COPY_ITEM, payload: item };
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