# 队列(Queue)
队列（Queue），是一种线性存储结构。它有以下几个特点：
1. 队列中数据是按照"先进先出（FIFO, First-In-First-Out）"方式进出队列的。
2. 队列只允许在"队首"进行删除操作，而在"队尾"进行插入操作。
   
队列通常包括的三种操作：`enqueue`、`dequeue`、`peek`
+ `enqueue`: 入队列
+ `dequeue`: 出队列
+ `peek `: 返回队列的初始元素，但不删除


## 应用场景
1. 需要弹多个Modal