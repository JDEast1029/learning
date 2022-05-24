class IState {
	changeState() {
		throw new Error('请继承IState，并重写改方法');
	}
}

class IdleState extends IState {
	constructor() {
		super();
		this.bottomStyle = `
			background-color: rgba(255, 255, 255, .2);
			height: 6rpx;
			border-radius: 3rpx;
		`;
		this.barStyle = '';
		this.dotStyle = `
			width: 10rpx;
			height: 10rpx;
			border-radius: 5rpx;
			background-color: rgba(255, 255, 255, .4);
		`;
	}

	changeState(context) {
		console.log('IdleState：无操作');
	}
}

class LoadingState extends IState {
	constructor() {
		super();
		this.bottomStyle = `
			background-color: rgba(255, 255, 255, .2);
			height: 6rpx;
			border-radius: 3rpx;
		`;
		this.barStyle = '';
		this.dotStyle = '';
	}

	changeState(context) {
		context.setState(new IdleState());
	}
}

class TouchState extends IState {
	constructor() {
		super();
		this.bottomStyle = `
			background-color: rgba(255, 255, 255, .2);
			height: 8rpx;
			border-radius: 4rpx;
		`;
		this.barStyle = `
			background-color: #fff;
		`;
		this.dotStyle = `
			width: 12rpx;
			height: 12rpx;
			border-radius: 6rpx;
			background-color: #fff;
		`;
	}

	changeState(context) {
		context.setState(new IdleState());
	}
}

class MoveState extends IState {
	constructor() {
		super();
		this.bottomStyle = `
			background-color: rgba(255, 255, 255, .2);
			height: 20rpx;
			border-radius: 6rpx;
		`;
		this.barStyle = `
			background-color: #fff;
		`;
		this.dotStyle = `
			width: 12rpx;
			height: 26rpx;
			border-radius: 6rpx;
			background-color: #fff;
		`;
	}

	changeState(context) {
		context.setState(new TouchState());
	}
}

// 小程序下开发自定义进度条，模仿抖音效果
class ProcessBarState {
	constructor(context, delay) {
		this.context = context;
		this.delay = delay || 3000;
		this.state = new LoadingState();
	}

	setState(state) {
		this.state = state;
		this.timer && clearTimeout(this.timer);
		this.context && this.context.setData({
			bottomStyle: state.bottomStyle,
			barStyle: state.barStyle,
			dotStyle: state.dotStyle,
		});
	}

	changeState() {
		this.state.changeState(this);
	}

	delayChangeState() {
		this.timer = setTimeout(() => {
			this.state.changeState(this);
		}, this.delay);
	}
}


export {
	ProcessBarState as default,
	IdleState,
	LoadingState,
	TouchState,
	MoveState
};