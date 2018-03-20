// src/reducers.tsx

import * as actions from './actions';
import { StoreState } from './types';
import * as constants from './constants';

// const move = (arr:Array<any>, from:number, to:number, isCopy = true) => {
//   const clone = [...arr];
//   const moved = isCopy ? clone[from] : clone.splice(from, 1)[0]
//   clone.splice(to, 0, moved);
//   return clone;
// };

export function itemReducer(state: StoreState, action: actions.ItemAction): StoreState {
  switch (action.type) {
    case constants.EDIT_ITEM:{
      console.log(action)
      state.session.editItem(action.payload.id, action.payload.title)
      return { 
        ...state,
        itemList: state.session.itemSelector(), 
      }
    }
    case constants.ADD_NEXT_ITEM:{
      let itemid = state.session.addNewItem(state.currentId)
      return {
        ...state,
        itemList: state.session.itemSelector(),
        currentId: itemid
      }
    }
    case constants.INDENT_ITEM:{
      state.session.indentItem(state.currentId)
      return {
        ...state,
        itemList: state.session.itemSelector(),
      }
    }
    case constants.DEINDENT_ITEM: {
      state.session.deindentItem(state.currentId)
      return {
        ...state,
        itemList: state.session.itemSelector(),
      }
    }
    case constants.FOCUS_NEXT: {
      const currentNodeIndex = state.itemList.findIndex(item => (item.id === state.currentId))
      const nextNodeIndex = currentNodeIndex < state.itemList.length - 1 ? currentNodeIndex + 1 : 0
      const nextId = state.itemList[nextNodeIndex].id
      return {
        ...state,
        currentId: nextId
      }
    }
    case constants.FOCUS_PREVIOUS: {
      const currentNodeIndex = state.itemList.findIndex(item => (item.id === state.currentId))
      const nextNodeIndex = currentNodeIndex > 0 ? currentNodeIndex - 1 : state.itemList.length - 1
      const nextId = state.itemList[nextNodeIndex].id
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
    case constants.REMOVE_ITEM: {
      const currentNodeIndex = state.itemList.findIndex(item => (item.id === state.currentId))
      const nextNodeIndex = currentNodeIndex > 0 ? currentNodeIndex - 1 : state.itemList.length - 1
      const nextId = state.itemList[nextNodeIndex].id
      state.session.removeItem(state.currentId)
      return {
        ...state,
        itemList: state.session.itemSelector(),
        currentId: nextId
      }
    }
    case constants.MOVE_ITEM:{
        const sourceNodeId = state.itemList[action.payload.sourceIndex].id
        const destinationNodeId = state.itemList[action.payload.destinationIndex].id
        state.session.moveItem(sourceNodeId, destinationNodeId)
        return {
          ...state,
          itemList: state.session.itemSelector(),
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