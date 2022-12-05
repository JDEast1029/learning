// 最大堆
class MaxHeap {
	constructor() {
		this.heap = [];
	}

	get length() {
		return this.heap.length;
	}

	getParentIndex(index) {
		return Math.floor((index - 1) / 2);
	}

	getLeftChildIndex(index) {
		let left = index * 2 + 1;
		return left > this.length - 1 ? -1 : left;
	}

	getRightChildIndex(index) {
		let right = index * 2 + 2;
		return right > this.length - 1 ? -1 : right;
	}

	swap(target, index) {
		[this.heap[target], this.heap[index]] = [this.heap[index], this.heap[target]];
	}

	shiftup(index) {
		while (index > 0) {
			let parentIndex = this.getParentIndex(index);
			if (this.heap[parentIndex] >= this.heap[index]) return;
			this.swap(parentIndex, index);
			index = parentIndex;
		}
	}

	shiftdown(index) {
		while (index >= 0) {
			const leftIndex = this.getLeftChildIndex(index);
			const rightIndex = this.getRightChildIndex(index);

			if (leftIndex === -1 && rightIndex === -1) return;
			// 找到左右节点值最大的进行替换，这样能保证最大堆
			if (
				leftIndex !== -1 &&
				this.heap[leftIndex] > this.heap[rightIndex] &&
				this.heap[leftIndex] > this.heap[index]
			) {
				this.swap(leftIndex, index);
				index = leftIndex;
			} else if (
				rightIndex !== -1 &&
				this.heap[leftIndex] < this.heap[rightIndex] &&
				this.heap[rightIndex] > this.heap[index]
			) {
				this.swap(rightIndex, index);
				index = rightIndex;
			} else return;
		}
	}

	insert(value) {
		this.heap.push(value);
		this.shiftup(this.length - 1);
	}

	remove(value) {
		const index = this.heap.findIndex((it) => it === value);
		if (index === -1) return -1;
		this.swap(index, this.length - 1); // 尾部元素跟要删除的元素互换， 这样能保证是完全二叉树
		this.heap.pop(); // 删除尾部元素
		this.shiftdown(index); // 在向下排序，保证子堆是最大堆
	}

	peek() {
		return this.heap[0];
	}

	size() {
		return this.length;
	}
}

let heap = new MaxHeap();
heap.insert(1);
heap.insert(2);
heap.insert(3);
heap.insert(4);
heap.insert(5);
heap.insert(6);
heap.insert(7);
heap.remove(6);