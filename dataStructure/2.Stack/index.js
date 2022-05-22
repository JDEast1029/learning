class Node {
	constructor(value) {
		this.data = value;
		this.next = null;
	}
}

// 基于当链表的栈
class StackOnSingleLinkedList {
	constructor() {
		this.top = null;
	}

	// 向栈中添加元素
	push(value) {
		const node = new Node(value);
		if (this.top = null) {
			this.top = node;
		} else {
			node.next = this.top;
			this.top = node;
		}
	}

	// 返回栈顶元素
	peek() {
		if (this.top === null) return -1;
		return this.top.data;
	}

	// 返回并删除栈顶元素的操作。
	pop() {
		if (this.top === null) return -1;

		const retTop = this.top;
		this.top = retTop.next;
		return retTop.data;
	}

	clear() {
		this.top = null;
	}

	[Symbol.iterator]() {
		let curNode = this.top;
		return {
			next: () => {
				if (curNode) {
					const value = curNode.data;
					curNode = curNode.next;
					return { done: false, value }
				}
				return { done: true }
			}
		}
	}
}