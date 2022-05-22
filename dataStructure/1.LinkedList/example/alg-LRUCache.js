import DoublyLinkedList from '../doublyLinkedList';

class Node {
	constructor(key, value) {
		this.next = null;
		this.prev = null;
		this.key = key;
		this.value = value;
	}
}

class LRUDoublyLinkedList extends DoublyLinkedList {
	addFirst(node) {
		node.prev = null;
		node.next = this.head;
		this.head.prev = node;
		this.head = node;
		
		this.length += 1;
	}

	/**
	 * 移除最后一个节点
	 * @returns 最后的节点
	 */
	removeLast() {
		const retTail = this.tail;
		this.remove(retTail)

		return retTail;
	}

	[Symbol.iterator]() {
		let curNode = this.head;
		return {
			next: () => {
				let ret = curNode;
				if (curNode) {
					const value = ret.value;
					curNode = curNode.next;
					return { done: false, value }
				}
				return { done: false }
			}
		}
	}
}


/**
 * least recently used
 * 简单版
 * 为保证put & get 都是O(1)的时间复杂度，这个数据结构必要的条件：查找快，插入快，删除快，有顺序之分。
 * 哈希表查找快，但是数据无固定顺序；链表有顺序之分，插入删除快，但是查找慢， 且链表中双向链表的插入和删除的时间复杂度为O(1)
 * 形成一种新的数据结构：哈希链表。
 */
class LRUCache {
	/**
	 * @param {*} capacity 容量
	 */
	constructor(capacity) {
		this.capacity = capacity;
		this.map = new Map();
		this.linkedList = new LRUDoublyLinkedList();
	}

	put(key, value) {
		const node = new Node(key, value);
		if (this.map.has(key)) {
			this.linkedList.remove(this.map.get(key));
			
		} else if (this.linkedList.length >= this.capacity) {
			const lastNode = this.linkedList.removeLast();
			this.map.remove(lastNode.key);
		}
		this.linkedList.addFirst(node);
		this.map.set(key, node);
	}

	get(key) {
		if (!this.map.has(key)) {
			console.error(`未找到索引${key}对应的缓存数据`);
			return null;
		}
		const targetNode = this.map.get(key);
		this.put(key, targetNode.value);
		return targetNode;
	}
}