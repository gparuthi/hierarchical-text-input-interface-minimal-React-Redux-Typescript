// src/reducers/index.tsx

import * as actions from './actions';
import { StoreState } from './types';
import * as constants from './constants';

const generateKey = (pre:string) => {
  return `${pre}_${new Date().getTime()}`;
}


export function enthusiasm(state: StoreState, action: actions.ItemAction): StoreState {
  switch (action.type) {
    case constants.ADD_NEXT_ITEM:
      return { 
        byId: [...state.byId, action.payload.id],
        byHash: {
          ...state.byHash,
          [action.payload.id]: action.payload
        }
       }
    case constants.INDENT_ITEM:
      return { ...state }
    case constants.DEINDENT_ITEM:
      return { ...state }
    case constants.REMOVE_ITEM:
      return { ...state }
    case constants.MOVE_ITEM:
      return { ...state }
    case constants.COPY_ITEM:
      return { ...state }

    // case INCREMENT_ENTHUSIASM:
    //   return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
    // case DECREMENT_ENTHUSIASM:
    //   return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
    default:
    
  }
  return state;
}