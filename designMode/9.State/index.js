class IState {
	doHandle() {
		throw new Error('请继承IState，并重写改方法')
	}

	changeState(context) {
		throw new Error('请继承IState，并重写改方法')
	}
}


// 静止下的进度条
class IdleState extends IState {
	constructor() {
		super();
		this.height = 1;
	}

	doHandle() {}

	changeState(context) {
	}
}

// 点击/触摸 下的状态
class TouchState extends IState {
	constructor() {
		super();
		this.height = 10;
	}

	doHandle() {
	}

	changeState(context) {
		context.setState(new IdleState())
	}
}

// 拖拽时的进度条
class DragState extends IState {
	constructor() {
		super();
		this.height = 30;
	}

	doHandle() {
	}

	changeState(context) {
		context.setState(new TouchState())
	}
}

class ProcessBarState {
	constructor() {
		this.state = new IdleState();
	}

	setState(state) {
		this.state = state;
		console.log(`process bar样式高度改为${this.state.height}px`);
	}

	doHandle() {
		this.state.doHandle();
		this.state.changeState(this);
	}
}

const processBarState = new ProcessBarState();

// 点击屏幕
processBarState.setState(new TouchState());
setTimeout(() => {
	processBarState.doHandle();
}, 2000);


// 拖拽进度条
processBarState.setState(new DragState());
setTimeout(() => {
	processBarState.doHandle();
	setTimeout(() => {
		processBarState.doHandle();
	}, 2000);
}, 2000);