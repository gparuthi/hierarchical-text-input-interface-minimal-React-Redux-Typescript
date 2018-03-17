// src/components/ItemList.tsx
import * as React from 'react';
import './ItemList.css'

interface Item { id: string; title: string; indent: number; autoFocus: boolean; }

export interface Props {
    items: Array<Item>; // title, indent, id
    onEnterKeypress?: () => void;
    onTabKeypress?: () => void;
    onShiftTabKeypress?: () => void;
    onUpKeypress?: () => void;
    onDownKeypress?: () => void;
    onEdit?: (id:string, value:string) => void;
}

export function ItemList({ items, onEdit, onEnterKeypress, onTabKeypress, 
    onShiftTabKeypress, onDownKeypress, onUpKeypress }: Props) {

    const onKeypress = (e: any) => {
        var key = e.key;
        switch (key) {
            case 'Enter':
                onEnterKeypress()
                break
            case 'Tab':
                e.preventDefault();
                if (e.shiftKey) {
                    onShiftTabKeypress()
                } else {
                    onTabKeypress()
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                onUpKeypress()
                break
            case 'ArrowDown':
                e.preventDefault();
                onDownKeypress()
                break
            default:
        }
    };

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        console.log(e.currentTarget)
        onEdit(e.currentTarget.id, e.currentTarget.value)
    }

    return (
        <div className="container">
            {items.map((item) => {
                return (<li className={getIndentClassName(item.indent)} key={item.id}>
                    <input 
                        ref={input => input && item.autoFocus && input.focus()}
                        className="itemText"
                        value={item.title}
                        type="title" 
                        id={'' + item.id}
                        onKeyDown={onKeypress}
                        onChange={onChange}
                    />
                </li>);

            })}
        </div>
    );
}

// helpers

function getIndentClassName(a: number) {
    switch (a) {
        case 1: return 'indent1';
        case 2: return 'indent2';
        case 3: return 'indent3';
        default: return 'indent0';
    }
}