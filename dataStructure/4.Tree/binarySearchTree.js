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
		for (const node of this.preOrderTraversal()) {
			if (node.key === key) return true;
		}
		return false;
	}

	// find里用了后序遍历，因为在remove的时候需要调用find方法，这样能确保优先拿到子节点，方便后序的删除操作
	find(key) {
		for (const node of this.postOrderTraversal()) {
			if (node.key === key) return node;
		}
		return undefined;
	}

	/* -----------递归法遍历------------ */
	// 前序遍历
	*preOrderTraversal(node = this.root) {
		yield node;
		if (node.left) yield* this.preOrderTraversal(node.left)
		if (node.right) yield* this.preOrderTraversal(node.right);
	}

	// 中序遍历
	*inOrderTraversal(node = this.root) {
		if (node.left) yield* this.inOrderTraversal(node.left);
		yield node;
		if (node.right) yield* this.inOrderTraversal(node.right);
	}

	// 后序遍历
	*postOrderTraversal(node = this.root) {
		if (node.left) yield* this.postOrderTraversal(node.left);
		if (node.right) yield* this.postOrderTraversal(node.right);
		yield node;
	}

	/* -----------Morris法遍历------------ */
}



// test
var deleteNode = function(root = [], key) {
	if (!(root instanceof Array)) return [];
	if (!key) return [];
	if (!root.length) return [];
	const first = root.shift();
	let tree = new BinarySearchTree(first);
	root.forEach(it => {
		tree.insert(it);
	});
	tree.remove(key);

	let result = [];
	for (const i of tree.preOrderTraversal()) {
		result.push(i ? i.key : i);
	}
	return result;
};

deleteNode([5,3,6,2,4,null,7], 3)