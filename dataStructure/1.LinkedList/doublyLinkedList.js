class Node {
	constructor(element) {
		this.element = element;
		this.prev = null;
		this.next = null;
	}
}

class DoublyLinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = null;
	}

	contains(node) {
		let curNode;
		let next = this.iterator();
		while ((curNode = next())) {
			if (curNode === node) {
				return true;
			}
		}
		return false;
	}

	append(...nodes) {
		this.insert(nodes[0], null);
		if (nodes.length > 1) {
			this.append.apply(this, nodes.splice(1));
		}
	}

	insert(node, refNode) {
		if (refNode !== null) {
			if (!this.contains(refNode)) {
				console.error('目标节点不在当前链表内');
				return;
			}
			node.next = refNode.next;
			refNode.next = node;
			node.prev = refNode;
		} else if (this.tail !== null) {
			this.tail.next = node;
			node.prev = this.tail;
			this.tail = node;
		} else {
			node.prev = null;
			this.head = node;
			this.tail = node;
		}
		this.length += 1;
	}

	remove(node) {
		if (!this.contains(node)) return;
		if (node.prev !== null) node.prev.next = node.next;
		if (node.next !== null) node.next.prev = node.prev;
		if (node === this.head) this.head = node.next;
		if (node === this.tail) this.tail = node.prev;
		this.length -= 1;
	}

	reverse() {
		let curNode;
		let retHead = this.head;
		let retTail = this.tail;
		let next = this.iterator();
		while ((curNode = next())) {
			if (curNode === retHead) {
				curNode.prev = curNode.next;
				curNode.next = null;
				this.tail = curNode;
			} else if (curNode === retTail) {
				curNode.next = curNode.prev;
				curNode.prev = null;
				this.head = curNode;
			} else {
				let retNext = curNode.next;
				curNode.next = curNode.prev;
				curNode.prev = retNext
			}
		}
	}

	// 返回指定元素所在链表的索引，元素不存在则返回-1，若存在多个相同元素，则返回第一次出现的索引下标。
	indexOf(node) {
		let index = -1;
		let curNode;
		let next = this.iterator();
		while ((curNode = next())) {
			index += 1;
			if (curNode === node) return index;
		}
		return index;
	}

	isEmpty() {
		return this.head && this.tail && this.length
	}

	clear() {
		this.head = null;
		this.tail = null;
		this.length = null;
	}

	iterator(curNode = this.head) {
		return () => {
			let ret = curNode;
			if (curNode) {
				curNode = curNode.next;
				return ret;
			}
			return ret;
		}
	}

	[Symbol.iterator]() {
		let curNode = this.head;
		return {
			next: () => {
				if (curNode) {
					const value = curNode.element;
					curNode = curNode.next;
					return { done: false, value: value };
				}
				return { done: true, value: undefined };
			}
		}
	}
}

export { DoublyLinkedList as default, Node }