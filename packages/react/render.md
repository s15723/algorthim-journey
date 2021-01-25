beginWork 入口优化
- 判断组件更新是否可以优化
- 根据节点类型分发处理
- 根据 expirationTime 等信息判断是否可以跳过

reconcilerChildren
- 根据 props.children 生成 Fiber 子树
- 判断 fiber 对象是否可以复用
- 列表根据 key 优化