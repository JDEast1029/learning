class Node {
	constructor(element) {
		this.element = element;
		this.next = null;
	}
}

/**
 * 单向链表
 * head、tail、length
 * 插入，删除、查找、反转、遍历、
 */
class SingleLinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}
	
	// 向链表末尾追加节点
	append(...nodes) {
		this.insert(nodes[0], null);
		if (nodes.length > 1) {
			this.append.apply(this, nodes.slice(1))
		}
	}

	contains(node) {
		let curNode;
		let next = this.iterator();
		while ((curNode = next())) {
			if (node === curNode) return true;
		}
		return false
	}

	insert(node, refNode) {
		if (refNode !== null) {
			if (!this.contains(refNode)) {
				console.error('目标节点不在当前链表内');
				return;
			}
			const isInsertAfterTail = (refNode === this.tail);
			node.next = refNode.next;
			refNode.next = node;
			// 如果在尾节点后插入，需要更新tail指针
			if (isInsertAfterTail) {
				this.tail = node;
			}
		} else if (this.tail !== null) {
			this.tail.next = node;
			this.tail = node;
		} else {
			this.head = node;
			this.tail = node;
		}
		this.length += 1;
	}

	remove(node) {
		if (!this.contains(node)) return;
		const prevNode = this.findPrev(node);
		if (!prevNode) {
			this.head = node.next;
		} else {
			prevNode.next = node.next;
			if (this.tail === node) {
				this.tail = prevNode;
			}
		}
		this.length -= 1;
	}

	findPrev(node) {
		let curNode;
		let next = this.iterator();
		let prev = null;
		while ((curNode = next())) {
			if (curNode === node) return prev;
			prev = curNode;
		}
		return null;
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
		return this.head && this.tail && this.length;
	}

	reverse() {
		let curNode;
		let prev;
		let retHead = this.head;
		let retTail = this.tail;
		let next = this.iterator();
		while ((curNode = next())) {
			if (curNode === retHead) {
				this.tail = curNode;
				curNode.next = null;
			} else {
				if (curNode === retTail) this.head = curNode;
				curNode.next = prev
			}
			prev = curNode;
		}
	}

	clear() {
		this.head = null;
		this.tail = null;
		this.length = 0
	}

	// 供内部遍历
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

	// 供外部遍历时调用，能方便拿到node的element值
	[Symbol.iterator]() {
		let curNode = this.head;
		return {
			next() {
				if (curNode) {
					const value = curNode.element;
					curNode = curNode.next;
					return { done: false, value: value };
				}
				return { done: true, value: undefined }
			}
		}
	}
}

export { SingleLinkedList as default, Node }
