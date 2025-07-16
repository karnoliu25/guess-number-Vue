# 珠玑妙算 - 数字解谜游戏

## 项目简介

珠玑妙算是一款经典的数字解谜游戏，玩家需要猜出一个 4 位不重复的数字（每位数字范围 0-9）。每次猜测后，系统会给出两个关键提示：

- 正确数字的数量

- 正确位置的数量

## 项目特点

- 纯前端实现，基于 Vue3 + Pinia
- 响应式设计，适配各种设备
- 历史记录自动保存（localStorage）
- 智能数字键盘（防止重复输入）
- 简洁美观的 UI 界面

## 技术栈

- 前端框架: Vue 3 + Vite

- 状态管理: Pinia

- UI 组件库: 原生实现

- 样式工具: Tailwind CSS

- 路由管理: Vue Router

## 快速开始

```bash
## 安装依赖
 npm install
 ## 开发模式
 npm run dev
 ## 构建
 npm run build
```

## 项目结构

```text
src/
├── components/            # 公共组件
│   ├── ControlBtn.vue     # 控制按钮
│   ├── DisplayBox.vue     # 数字显示框
│   ├── GameControl.vue    # 游戏控制按钮
│   ├── GameRecord.vue     # 游戏记录面板
│   ├── HeaderBar.vue      # 顶部导航栏
│   ├── InformationView.vue # 信息弹窗
│   └── NumberPad.vue      # 数字键盘
├── stores/
│   └── game.js            # Pinia状态管理
├── views/
│   └── HomeView.vue       # 主页面
└── main.js                # 应用入口
```

## 联系方式

- 开发者: Karnoliu
- Email: Karnoliu@163.com

## 许可

MIT License © 2025 Karnoliu
