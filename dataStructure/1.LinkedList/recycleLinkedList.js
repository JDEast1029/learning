class Node {
	constructor(element) {
		this.element = element;  // 节点存储的数据
		this.next = null;       // 指向下一个节点的指针
	}
}

/**
 * 循环单向链表
 * 特点：
 * 1. 最后一个节点指向第一个节点，形成一个环
 * 2. 使用 head 和 tail 双指针，提高操作效率
 * 3. 支持节点的插入、删除、查找、反转等操作
 */
class SingleLinkedList {
	constructor() {
		this.head = null;    // 头节点指针
		this.tail = null;    // 尾节点指针
		this.length = 0;     // 链表长度
	}
	
	/**
	 * 向链表末尾追加一个或多个节点
	 * @param {...Node} nodes - 要追加的节点列表
	 */
	append(...nodes) {
		// 先插入第一个节点
		this.insert(nodes[0], null);
		// 如果还有其他节点，递归调用append处理剩余节点
		if (nodes.length > 1) {
			this.append.apply(this, nodes.slice(1))
		}
	}

	/**
	 * 检查链表是否包含指定节点
	 * @param {Node} node - 要查找的节点
	 * @returns {boolean} 是否包含该节点
	 */
	contains(node) {
		if (!this.head) return false;
		let curNode = this.head;
		// 由于是循环链表，使用do-while确保至少执行一次
		do {
			if (node === curNode) return true;
			curNode = curNode.next;
		} while (curNode !== this.head);  // 当再次回到头节点时结束
		return false;
	}

	/**
	 * 在指定节点后插入新节点
	 * @param {Node} node - 要插入的新节点
	 * @param {Node|null} refNode - 参考节点，如果为null则插入到末尾
	 */
	insert(node, refNode) {
		if (refNode !== null) {
			// 插入到指定节点之后
			if (!this.contains(refNode)) {
				console.error('目标节点不在当前链表内');
				return;
			}
			
			// 判断是否是尾节点（在修改指针之前）
			const isInsertAfterTail = (refNode === this.tail);
			
			// 处理节点连接
			node.next = refNode.next;
			refNode.next = node;
			
			// 如果在尾节点后插入，需要更新tail指针
			if (isInsertAfterTail) {
				this.tail = node;
				node.next = this.head;  // 保持循环特性
			}
		} else if (this.tail !== null) {
			// 链表不为空，插入到末尾
			this.tail.next = node;
			this.tail = node;
			node.next = this.head;  // 保持循环特性
		} else {
			// 链表为空，插入第一个节点
			this.head = node;
			this.tail = node;
			node.next = node;  // 只有一个节点时指向自己
		}
		this.length += 1;
	}

	/**
	 * 从链表中移除指定节点
	 * @param {Node} node - 要移除的节点
	 */
	remove(node) {
		if (!this.contains(node)) return;
		const prevNode = this.findPrev(node);
		
		if (!prevNode) {
			// 要删除的是头节点
			if (this.length === 1) {
				// 链表只有一个节点
				this.head = null;
				this.tail = null;
			} else {
				// 链表有多个节点，更新head指针
				this.head = node.next;
				this.tail.next = this.head;  // 保持循环特性
			}
		} else {
			// 删除非头节点
			prevNode.next = node.next;
			// 如果删除的是尾节点，需要更新tail指针
			if (this.tail === node) {
				this.tail = prevNode;
				prevNode.next = this.head;  // 保持循环特性
			}
		}
		this.length -= 1;
	}

	/**
	 * 反转链表
	 * 时间复杂度：O(n)
	 * 空间复杂度：O(1)
	 */
	reverse() {
		if (this.length <= 1) return;
		
		let prev = this.tail;      // 前一个节点，初始为尾节点
		let current = this.head;    // 当前节点，初始为头节点
		let next;                   // 下一个节点的临时存储
		
		// 遍历链表，改变每个节点的next指针方向
		do {
			next = current.next;     // 保存下一个节点
			current.next = prev;     // 改变当前节点的next指向
			prev = current;          // 移动prev指针
			current = next;          // 移动current指针
		} while (current !== this.head);
		
		// 交换head和tail指针完成反转
		const temp = this.head;
		this.head = this.tail;
		this.tail = temp;
	}

	/**
	 * 获取链表的迭代器函数
	 * @param {Node} curNode - 起始节点，默认从头节点开始
	 * @returns {Function} 返回一个迭代器函数，每次调用返回下一个节点
	 */
	iterator(curNode = this.head) {
		let first = true;  // 标记是否是第一次迭代
		return () => {
			if (!curNode) return null;
			// 如果回到头节点且不是第一次迭代，说明遍历完成
			if (curNode === this.head && !first) return null;
			first = false;
			const ret = curNode;
			curNode = curNode.next;
			return ret;
		}
	}

	/**
	 * 实现可迭代接口，使链表可以用于for...of循环
	 * @returns {Iterator} 返回一个迭代器对象
	 */
	[Symbol.iterator]() {
		let curNode = this.head;
		let first = true;  // 标记是否是第一次迭代
		return {
			next() {
				if (!curNode) return { done: true, value: undefined };
				// 如果回到头节点且不是第一次迭代，说明遍历完成
				if (curNode === this.head && !first) return { done: true, value: undefined };
				first = false;
				const value = curNode.element;  // 返回节点的数据而不是节点本身
				curNode = curNode.next;
				return { done: false, value: value };
			}
		}
	}
}

export { SingleLinkedList as default, Node }