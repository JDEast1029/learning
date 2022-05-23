class Node {
	constructor(value) {
		this.data = value;
		this.next = null;
	}
}

class QueueOnSingleLinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
	}

	enqueue(value) {
		const node = new Node(value);
		if (this.head === null) {
			this.head = node;
			this.tail = node;
		} else {
			this.tail.next = node;
			this.tail = node;
		}
	}

	dequeue() {
		if (this.head === null) return -1;
		let retHead = this.head;
		this.head = this.head.next;

		return retHead.data;
	}

	peek() {
		return this.head;
	}

	clear() {
		this.head = null;
		this.tail = null;
	}
	
	isEmpty() {
		return this.head === null
	}

	[Symbol.iterator]() {
		let curNode = this.head;
		return {
			next() {
				if (curNode) {
					let value = curNode.data;
					curNode = curNode.next;
					return { done: false, value };
				}
				return { done: true };
			}
		}
	}
}