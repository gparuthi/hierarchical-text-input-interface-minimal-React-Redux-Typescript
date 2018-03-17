import { ItemList, Props } from '../components/ItemList';
import * as actions from '../actions';
import { StoreState, Item } from '../types';
import { connect, Dispatch } from 'react-redux';

export function mapStateToProps(storeState: StoreState): Props {
    const items = storeState.byId.map((id: string) => {
        return {
            ...storeState.byHash[id],
            ['indent']: storeState.indents[id],
            ['autoFocus']: ((id === storeState.currentId) ? true : false)
        }
    })
    return { items: items }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.ItemAction>) {
    return {
        onEdit: (id: string, value: string) => dispatch(actions.editItem({id: id, title: value})),
        onEnterKeypress: (item: Item) => dispatch(actions.addNextItem(item)),
        onTabKeypress: () => dispatch(actions.indentItem()),
        onShiftTabKeypress: () => dispatch(actions.deIndentItem()),
        onUpKeypress: () => dispatch(actions.focusPrevItem()),
        onDownKeypress: () => dispatch(actions.focusNextItem()),
        removeItem: () => dispatch(actions.removeItem()),
        moveItem: (item: Item) => dispatch(actions.moveItem(item)),
        copyItem: (item: Item) => dispatch(actions.copyItem(item)),
        onClick: (id: string) => dispatch(actions.focusItem(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);