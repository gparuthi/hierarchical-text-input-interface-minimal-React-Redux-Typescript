import { Item } from './types';

export const generateKey = (pre: string) => {
    return `${pre}_${new Date().getTime()}`;
}

interface Hash<T> {
    [key: string]: T;
}

class ItemContent {
    title: string
    nid: string
    constructor(title = '') {
        this.nid = generateKey('item-content')
        this.title = title
    }
}

export class NestedItem {
    node: ItemContent
    children: Array<NestedItem>
    parent: NestedItem
    tid: string
    depth: number

    constructor(title = '', children?: Array<NestedItem>, parent?: NestedItem) {
        this.node = new ItemContent(title)
        this.tid = generateKey('item')
        this.children = children || [];
        if (parent) {
            this.parent = parent
        }
        this.depth = -1
    }

    get title() {
        return this.node.title
    }
    set title(title: string) {
        this.node.title = title
    }

    addNewChild(title = '', index = 0): NestedItem {
        var node = new NestedItem(title)
        return this.addNodeAtIndex(index, node)
    }

    // add existing node at an index
    addNodeAtIndex(index: number, node: NestedItem): NestedItem {
        node.parent = this
        this.children.splice(index, 0, node)
        return node
    }

    // remove node from children
    removeChild(child: NestedItem) {
        this.children = this.children.filter(el => { return el.tid !== child.tid });
    }

    // get previous sibling
    getPrevSibling(): NestedItem {
        if (this.parent) {
            let index = this.parent.children.findIndex(child => child.tid === this.tid)
            index -= 1
            return this.parent.children[index]
        } else {
            return this
        }
    }

    // get next sibling
    getNextSibling(): NestedItem {
        if (this.parent) {
            let index = this.parent.children.findIndex(child => child.tid === this.tid)
            index += 1
            return this.parent.children[index]
        }
        return this
    }

    // get index of a child node
    getChildIndex(node: NestedItem): number {
        return this.children.findIndex(child => child.tid === node.tid)
    }

    /**
    * recursive function to create a flat list of nodes 
    * each node is added with a property- depth
    * @param int depth         title of the node
    * @returns Array           list of nodes via a depth first traversal
    */
    getOrderedFlatNodeList(depth = -1): Array<NestedItem> {
        this.depth = depth
        let ret: Array<NestedItem> = []
        var i = 0
        for (i = 0; i < this.children.length; i++) {
            let childlist = this.children[i].getOrderedFlatNodeList(depth + 1)
            ret = [...ret, ...childlist]
        }
        return [this, ...ret]
    }
}

export class Session {
    rootNode: NestedItem
    nodeHashMap: Hash<NestedItem>

    constructor() {
        this.rootNode = new NestedItem('root')
        this.nodeHashMap = { [this.rootNode.tid]: this.rootNode }
        let node = this.rootNode.addNewChild('', 0)
        this.nodeHashMap[node.tid] = node
    }

    addNewItem(id = this.rootNode.children[0].tid): string {
        let currentNode = this.nodeHashMap[id]
        let node = null
        if (currentNode.children.length === 0) {
            // Add the new node as a sibling, i.e. as a child to the parent node at the next index of current node
            node = currentNode.parent.addNewChild('', currentNode.parent.getChildIndex(currentNode) + 1)
        } else {
            // Add a new child
            node = currentNode.addNewChild('', 0)
        }
        this.nodeHashMap[node.tid] = node
        return node.tid
    }

    editItem(id: string, title: string) {
        this.nodeHashMap[id].title = title
    }
    indentItem(id: string) {
        let currentNode = this.nodeHashMap[id]
        // remove from parent and add to previous
        if (currentNode.depth === 3) {
            return
        }
        var prevSibling = currentNode.getPrevSibling()
        if (prevSibling) {
            // remove this from parent
            currentNode.parent.removeChild(currentNode)
            // add this node to previous sibling
            prevSibling.addNodeAtIndex(prevSibling.children.length, currentNode)
            // increment the depth
            currentNode.depth += 1
        }
    }
    deindentItem(id: string) {
        let currentNode = this.nodeHashMap[id]
        // remove from parent and add to parent's parent
        if (currentNode.depth === 0) {
            return
        }
        // get new parent
        var newParent = currentNode.parent.parent
        // get the index at which this node should be added
        let newIndex = newParent.getChildIndex(currentNode.parent) + 1
        // remove from parent
        currentNode.parent.removeChild(currentNode)
        // add node to new index
        newParent.addNodeAtIndex(newIndex, currentNode)
        // modify the depth
        currentNode.depth -= 1
    }
    removeItem(id: string) {
        let currentNode = this.nodeHashMap[id]
        if (currentNode.title === '') {
            // delete current node from parent
            currentNode.parent.removeChild(currentNode)
            delete this.nodeHashMap[id]
        }
    }
    moveItem(sourceId: string, destinationId: string, isCopy = true) {
        let movedNode = this.nodeHashMap[sourceId]
        let destinationNode = this.nodeHashMap[destinationId]
        if (!isCopy) {
            // remove from parent
            movedNode.parent.removeChild(movedNode)
        }
        this.addNewItem()
        destinationNode.addNodeAtIndex(0, movedNode)
    }
    itemSelector(): Array<Item> {
        return this.rootNode.getOrderedFlatNodeList().slice(1).map(item => (
            { id: item.tid, indent: item.depth, title: item.node.title }
        ))
    }
}