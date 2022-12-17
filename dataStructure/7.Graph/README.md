# 图(Graph)
## 基本概念
### 定义
`Graph`是由一些`顶点(Vertex)`和这些顶点的连线`边(Edge)`组成的.

### 图的种类
1. 无向图
2. 有向图

## 图的存储结构
### 邻接矩阵

### 邻接表

## 搜索方式
### 广度优先搜索(BFS)

### 深度优先搜索(DFS)


## 算法

### 拓扑排序
拓扑排序(Topological Order)是指，将一个有向无环图(Directed Acyclic Graph简称DAG)进行排序进而得到一个有序的线性序列。

拓扑排序算法的基本步骤：
1. 构造一个队列Q(queue) 和 拓扑排序的结果队列T(topological)；
2. 把所有没有依赖顶点的节点放入Q；
3. 当Q还有顶点的时候，执行下面步骤：
3.1 从Q中取出一个顶点n(将n从Q中删掉)，并放入T(将n加入到结果集中)；
3.2 对n每一个邻接点m(n是起点，m是终点)；
3.2.1 去掉边<n,m>;
3.2.2 如果m没有依赖顶点，则把m放入Q;
注：顶点A没有依赖顶点，是指不存在以A为终点的边。


### Kruskal算法

### Prim算法