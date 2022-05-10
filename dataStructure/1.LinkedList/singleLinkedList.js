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
		let cur;
		let next = this.iterator();
		while ((cur = next())) {
			if (node === cur) return true;
		}
		return false
	}

	insert(node, refNode) {
		if (refNode !== null) {
			if (!this.contains(refNode)) {
				console.error('目标节点不在当前链表内');
				return;
			}
			node.next = refNode.next;
			refNode.next = node;
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
		let cur;
		let next = this.iterator();
		let prev = null;
		while ((cur = next())) {
			if (cur === node) return prev;
			prev = cur;
		}
		return null;
	}

	reverse() {
		let cur;
		let prev;
		let retHead = this.head;
		let retTail = this.tail;
		let next = this.iterator();
		while ((cur = next())) {
			if (cur === retHead) {
				this.tail = cur;
				cur.next = null;
			} else {
				if (cur === retTail) this.head = cur;
				cur.next = prev
			}
			prev = cur;
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
		let currentNode = this.head;
		return {
			next() {
				if (currentNode) {
					const value = currentNode.element;
					currentNode = currentNode.next;
					return { done: false, value: value };
				}
				return { done: true, value: undefined }
			}
		}
	}
}

export { SingleLinkedList as default, Node }
