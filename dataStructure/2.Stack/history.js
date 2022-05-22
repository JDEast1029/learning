import Stack from './index'

/**
 * 基于栈的历史记录
 * 像富文本的前进后退
 */
class History {
	constructor() {
		this.undoStack = new Stack(); // 正常的操作记录
		this.redoStack = new Stack(); // 
	}

	push(value) {
		this.undoStack.push(value);
		this.redoStack.clear();
	}

	// 回滚
	undo() {
		let value = this.undoStack.pop();
		if (value === -1) {
			console.warn('History 无法回滚');
			return;
		}
		this.redoStack.push(value);
	}

	// 重做
	redo() {
		let value = this.redoStack.pop();
		if (value === -1) {
			console.warn('History 无法前进');
			return;
		}
		this.undoStack.push(value);
	}


	clear() {
		this.undoStack.clear();
		this.redoStack.clear();
	}
}