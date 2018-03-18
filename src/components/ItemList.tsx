// src/components/ItemList.tsx
import * as React from 'react';
import './ItemList.css'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface Item { id: string; title: string; indent: number; autoFocus: boolean; }

const grid = 8;
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 1,
    background: isDragging ? 'lightgreen' : 'lightgray',
    ...draggableStyle,
});
export const generateKey = (pre:string) => {
  return `${pre}_${new Date().getTime()}`;
}

export interface Props {
    items: Array<Item>; // title, indent, id
    onEnterKeypress?: () => void;
    onTabKeypress?: () => void;
    onShiftTabKeypress?: () => void;
    onUpKeypress?: () => void;
    onDownKeypress?: () => void;
    onEdit?: (id:string, value:string) => void;
    onClick?: (id: string) => void
    onMove?: (sourceIndex: number, destinationIndex: number) => void
}

export function ItemList({ items, onEdit, onEnterKeypress, onTabKeypress, 
    onShiftTabKeypress, onDownKeypress, onUpKeypress, onClick, onMove }: Props) {
        
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
            onEdit(e.currentTarget.name, e.currentTarget.value)
        }
        
        const onItemClicked = (e: React.FormEvent<HTMLInputElement>) => {
            onClick(e.currentTarget.name)
        }
        
        const onDragEnd = (result: DropResult) => {
            
            // dropped outside the list
            if (!result.destination) {
                return;
            }

            onMove(result.source.index, result.destination.index)
        }
        
        return (
            <div className="container">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div ref={provided.innerRef}>
                        {items.map((item, index) => {
                            return (
                                <Draggable key={index} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div>
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                                onKeyDown={onKeypress}
                                            >
                                                <li 
                                                    className={getIndentClassName(item.indent)} 
                                                    key={index}
                                                >
                                                    <input
                                                        ref={input => input && item.autoFocus && input.focus()}
                                                        className="itemText"
                                                        value={item.title}
                                                        type="title"
                                                        name={'' + item.id}
                                                        onChange={onChange}
                                                        onClick={onItemClicked}
                                                    />
                                                </li>
                                            </div>
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Draggable>
                            );
                            
                        })}
                        {provided.placeholder}
                    </div>
                )}
                </Droppable>
            </DragDropContext>
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