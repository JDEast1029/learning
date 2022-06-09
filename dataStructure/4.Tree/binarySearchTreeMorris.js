class TreeNode {
	constructor(key, value) {
		this.key = key;
		this.value = value;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	get isLeaf() {
		return this.parent && this.left === null && this.right === null;
	}

	get hasChildren() {
		return !this.isLeaf;
	}
}

class BinarySearchTree {
	constructor(key, value = key) {
		this.root = new TreeNode(key, value);
	}

	insert(key, value = key) {
		if (key === null) return;
		let cur = this.root;
		let node = new TreeNode(key, value);
		while (true) {
			if (key === cur.key) return false;
			if (key < cur.key) {
				if (cur.left === null) {
					cur.left = node;
					node.parent = cur;
					return true;
				} else {
					cur = cur.left;
				}
			} else if (key > cur.key) {
				if (cur.right === null) {
					cur.right = node;
					node.parent = cur;
					return true;
				} else {
					cur = cur.right;
				}
			}
		}
	}

	/**
	 * 1. 移除的是叶子节点，节点的parent ——> null
	 * 2. 移除的是带有子节点的节点，node.left ——> node.parent(如果是根节点，parent为null, node.left就作为根节点), 
	 * node.left.right vs node.right
	 * @param {*} key 
	 * @returns 
	 */
	remove(key) {
		const node = this.find(key);
		if (!node) return false;
		const isRoot = node.parent === null;

		// 移除的是叶子节点，节点的parent ——> null
		if (node.isLeaf) {
			node.parent === null;
			return;
		}

		/* 移除原则：左子节点替换父节点，右侧子树挂载到左节点的最右侧节点下 */
		const findMostRight = (node) => {
			let curNode = node;
			while (true) {
				if (curNode.right) {
					curNode = curNode.right;
				} else {
					return curNode;
				}
			}
		}

		if (isRoot) {
			if (!node.left) {
				this.root = node.right;
			} else {
				this.root = node.left;
			}
		} else {
			if (!node.left) {
				node.right.parent = node.parent;
				node.parent.left = node.right;
			} else {
				node.left.parent = node.parent;
				node.parent.left = node.left;
			}
		}
		if (node.right && node.left) {
			const mostRightNode = findMostRight(node.left);
			mostRightNode.right = node.right;
			node.right.parent = mostRightNode;
		}
	}

	has(key) {
		
	}

	// find里用了后序遍历，因为在remove的时候需要调用find方法，这样能确保优先拿到子节点，方便后序的删除操作
	find(key) {
		
	}

	findMostRight(node) {
		let curNode = node.left;
		while (true) {
			// morris遍历中会存在这种情况 curNode.right !== node
			if (curNode && curNode.right && curNode.right !== node) {
				curNode = curNode.right;
			} else {
				return curNode;
			}
		}
	}
	
	/* -----------Morris法遍历------------ */
	/**
	 * 记作当前节点为cur。
	 * 	1. 如果cur无左孩子，cur向右移动（cur=cur.right）
	 * 	2. 如果cur有左孩子，找到cur左子树上最右的节点，记为mostRight
	 * 		1. 如果mostRight的right指针指向空，让其指向cur，cur向左移动（cur=cur.left）
	 * 		2. 如果mostRight的right指针指向cur，让其指向空，cur向右移动（cur=cur.right）
	 */
	// 前序遍历
	*preOrderTraversal(node = this.root) {
		let cur = node;
		// 记录被访问过的节点
		const visited = new Map();
		const record = function *(cur) {
			if (!visited.get(cur)) {
				yield cur;
				visited.set(cur, true);
			}
		}
		
		while (cur) {
			yield* record(cur);
			if (cur.left) {
				const mostRightNode = this.findMostRight(cur);
				if (mostRightNode.right === null) {
					mostRightNode.right = cur;
					cur = cur.left;
					continue;
				} else if (mostRightNode.right === cur) {
					mostRightNode.right = null;
				}
			}
			cur = cur.right;
		}
		visited.clear();
	}

	// 中序遍历
	*inOrderTraversal(node = this.root) {
		let cur = node;
		// 记录被访问过的节点
		const visited = new Map();
		const record = function *(cur) {
			if (!visited.get(cur)) {
				yield cur;
				visited.set(cur, true);
			}
		}
		
		while (cur) {
			if (cur.left) {
				const mostRightNode = this.findMostRight(cur);
				if (mostRightNode.right === null) {
					mostRightNode.right = cur;
					cur = cur.left;
					continue;
				} else if (mostRightNode.right === cur) {
					mostRightNode.right = null;
				}
			}
			yield* record(cur);
			cur = cur.right;
		}
		visited.clear();
	}

	// 后序遍历， 图解参考README
	*postOrderTraversal(node = this.root) {
		let cur = node;
		const visited = new Map();

		while (cur) {
			if (cur.left) {
				const mostRightNode = this.findMostRight(cur);
				if (mostRightNode.right === null) {
					mostRightNode.right = cur;
					cur = cur.left;
					continue;
				} else if (mostRightNode.right === cur) {
					mostRightNode.right = null;
					// 当前节点的左节点倒序输出
					yield* this.postMorris(cur.left);
				}
			}
			cur = cur.right;
		}
		// 最后将最右侧的树倒序输出
		yield*  this.postMorris(node);
	}


	*postMorris(root) {
		const reverseNode = this.reverseList(root);
		let cur = reverseNode;
		while (cur) {
			yield cur;
			cur = cur.right;
		}
		this.reverseList(reverseNode)
	}

	reverseList(head) {
		let cur = head;
		let pre = null;
		while (cur) {
			let next = cur.right;
			cur.right = pre;
			pre = cur;
			cur = next;
		}
		return pre;
	}

	// 层序遍历
	*levelOrderTraversal(node = this.root) {
		let visit = [node];
		while (visit.length) {
			node = visit.shift();
			yield node;
			if (node.left) visit.push(node.left);
			if (node.right) visit.push(node.right);
		}
	}
}



// test
const deleteNode = (root = [], key) => {
	if (!(root instanceof Array)) return [];
	if (!key) return [];
	if (!root.length) return [];
	const first = root.shift();
	let tree = new BinarySearchTree(first);
	root.forEach(it => {
		tree.insert(it);
	});
	// tree.remove(key);

	let result = [];
	for (const i of tree.postOrderTraversal()) {
		result.push(i ? i.key : i);
	}
	return result;
};

console.log(deleteNode([5,3,6,4,null,7], 3));