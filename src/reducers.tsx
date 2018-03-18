// src/reducers/index.tsx

import * as actions from './actions';
import { StoreState } from './types';
import * as constants from './constants';

export const generateKey = (pre:string) => {
  return `${pre}_${new Date().getTime()}`;
}

const move = (arr:Array<any>, from:number, to:number, isCopy = true) => {
  const clone = [...arr];
  const moved = isCopy ? clone[from] : clone.splice(from, 1)[0]
  clone.splice(to, 0, moved);
  return clone;
};

export function itemReducer(state: StoreState, action: actions.ItemAction): StoreState {
  switch (action.type) {
    case constants.EDIT_ITEM:{
      return { 
        ...state,
        byHash: {
          ...state.byHash, 
          [action.payload.id]: { id: action.payload.id, title: action.payload.title}
        } 
      }
    }
    case constants.ADD_NEXT_ITEM:{
      const item = { id: generateKey('itemc'), title:''}
      const currentNodeIndex = state.byId.findIndex(id => (id===state.currentId))
      const indent = state.indents[state.currentId]
      return {
        byId: [
          ...state.byId.slice(0, currentNodeIndex + 1),
          item.id,
          ...state.byId.slice(currentNodeIndex + 1),
        ],
        byHash: {
          ...state.byHash,
          [item.id]: { id: item.id, title: item.title }
        },
        indents: {
          ...state.indents,
          [item.id]: indent
        },
        currentId: item.id
      }
    }
    case constants.INDENT_ITEM:{
      const itemId = state.currentId
      const indent = Math.min(state.indents[itemId] + 1, 3)
      return { 
        ...state, 
        indents: {
          ...state.indents,
          [itemId]: indent
        }
      }
    }
    case constants.DEINDENT_ITEM: {
      const itemId = state.currentId
      const indent = Math.max(state.indents[itemId] - 1, 0)
      return {
        ...state,
        indents: {
          ...state.indents,
          [itemId]: indent
        }
      }
    }
    case constants.FOCUS_NEXT: {
      const currentNodeIndex = state.byId.findIndex(id => (id === state.currentId))
      const nextNodeIndex = currentNodeIndex < state.byId.length - 1 ? currentNodeIndex + 1 : 0
      const nextId = state.byId[nextNodeIndex]
      return {
        ...state,
        currentId: nextId
      }
    }
    case constants.FOCUS_PREVIOUS: {
      const currentNodeIndex = state.byId.findIndex(id => (id === state.currentId))
      const nextNodeIndex = currentNodeIndex > 0 ? currentNodeIndex - 1 : state.byId.length - 1
      const nextId = state.byId[nextNodeIndex]
      return {
        ...state,
        currentId: nextId
      }
    }
    case constants.FOCUS_ITEM: {
      return {
        ...state,
        currentId: action.id
      }
    }
    case constants.REMOVE_ITEM:
    return { ...state }
    case constants.MOVE_ITEM:{
      return { 
        ...state,
        byId: move(state.byId, action.payload.sourceIndex, action.payload.destinationIndex+1)
      }
    }
    
    // case INCREMENT_ENTHUSIASM:
    //   return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
    // case DECREMENT_ENTHUSIASM:
    //   return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
    default:
    
  }
  return state;
}