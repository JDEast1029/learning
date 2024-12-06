class TaskScheduler {
    constructor() {
      this.tasks = new Map();
      this.dependencies = new Map();
      this.status = new Map();  // 存储任务状态
    }
  
    addTask(id, handler) {
      this.tasks.set(id, handler);        // handler 是任务的执行函数
      this.dependencies.set(id, []);      // 存储任务的依赖
      this.status.set(id, 'pending');     // 初始状态为 pending
    }
  
    addDependency(taskId, dependsOn) {
      this.dependencies.get(taskId).push(dependsOn);
    }
  
    // 获取可以执行的任务
    getReadyTasks() {
      return Array.from(this.tasks.keys()).filter(taskId => {
        // 任务必须是 pending 状态
        if (this.status.get(taskId) !== 'pending') {
          return false;
        }
        // 所有依赖任务都必须完成
        return this.dependencies.get(taskId)
          .every(depId => this.status.get(depId) === 'completed');
      });
    }
  
    // 执行所有任务
    async execute() {
      try {
        while (true) {
          // 1. 获取所有可以执行的任务
          const readyTasks = this.getReadyTasks();
          
          // 2. 如果没有可执行的任务，检查是否所有任务都完成了
          if (readyTasks.length === 0) {
            const allCompleted = Array.from(this.status.values())
              .every(status => status === 'completed');
            if (allCompleted) {
              console.log('所有任务执行完成！');
              break;
            }
            // 如果还有任务未完成但没有可执行任务，说明可能存在循环依赖
            if (!allCompleted) {
              throw new Error('可能存在循环依赖或无法完成的任务');
            }
          }
  
          // 3. 并行执行所有就绪的任务
          const promises = readyTasks.map(async taskId => {
            try {
              console.log(`开始执行任务: ${taskId}`);
              this.status.set(taskId, 'running');
              
              // 执行任务
              const handler = this.tasks.get(taskId);
              await handler();
              
              // 标记任务完成
              this.status.set(taskId, 'completed');
              console.log(`任务完成: ${taskId}`);
            } catch (error) {
              this.status.set(taskId, 'failed');
              throw new Error(`任务 ${taskId} 执行失败: ${error.message}`);
            }
          });
  
          // 等待当前批次的任务都完成
          await Promise.all(promises);
        }
      } catch (error) {
        console.error('任务执行出错:', error);
        throw error;
      }
    }
  }
  
  // 使用示例
  async function main() {
    const scheduler = new TaskScheduler();
  
    // 添加任务和它们的执行函数
    scheduler.addTask('compile', async () => {
      console.log('编译代码中...');
      await sleep(2000);  // 模拟耗时操作
    });
  
    scheduler.addTask('test', async () => {
      console.log('运行测试中...');
      await sleep(1500);
    });
  
    scheduler.addTask('build', async () => {
      console.log('构建项目中...');
      await sleep(1000);
    });
  
    scheduler.addTask('deploy', async () => {
      console.log('部署中...');
      await sleep(1000);
    });
  
    // 设置依赖关系
    scheduler.addDependency('test', 'compile');    // 测试依赖于编译
    scheduler.addDependency('build', 'test');      // 构建依赖于测试
    scheduler.addDependency('deploy', 'build');    // 部署依赖于构建
  
    // 开始执行
    await scheduler.execute();
  }
  
  // 辅助函数：延时
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // 运行
  main().catch(console.error);