import { ItemList, Props } from '../components/ItemList';
import * as actions from '../actions';
import { StoreState, Item } from '../types';
import { connect, Dispatch } from 'react-redux';

export function mapStateToProps(storeState: StoreState): Props {
    console.log(storeState)
    const items = storeState.itemList.map((item: Item) => {
        return {
            ...item,
            ['autoFocus']: ((item.id === storeState.currentId) ? true : false)
        }
    })
    return { items: items }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.ItemAction>) {
    return {
        onEdit: (id: string, value: string) => dispatch(actions.editItem(id, value)),
        onEnterKeypress: (item: Item) => dispatch(actions.addNextItem(item)),
        onTabKeypress: () => dispatch(actions.indentItem()),
        onShiftTabKeypress: () => dispatch(actions.deIndentItem()),
        onUpKeypress: () => dispatch(actions.focusPrevItem()),
        onDownKeypress: () => dispatch(actions.focusNextItem()),
        removeItem: () => dispatch(actions.removeItem()),
        onMove: (sourceIndex: number, destinationIndex: number, isCopied:boolean) => 
            dispatch(actions.moveItem(sourceIndex, destinationIndex, isCopied)),
        onClick: (id: string) => dispatch(actions.focusItem(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);